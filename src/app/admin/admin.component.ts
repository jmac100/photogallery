import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  galleryId: string;
  albums: any[];
  album: any;
  photos: any[];
  loading: boolean = false;
  savingAlbum: boolean = false;
  savingPicture: boolean = false;
  selected_album: string = 'Select an Album';
  defaultImage: string = 'https://www.placecage.com/1000/1000';
  offset = 100;

  constructor
  (
    private _photoService: PhotoService
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this._photoService.getGalleries()
      .subscribe(albums => {
        this.albums = albums;
      });
  }

  getAlbum(id: string) {
    this.galleryId = id;
    this.loading = true;
    this._photoService.getGallery(id)
      .subscribe(album => {
        this.album = album;
        this.selected_album = album.name;
        this.getPhotos(id);
        this.loading = false;
      });
  }

  getPhotos(id: string) {
    this._photoService.getPhotos(id)
      .subscribe(photos => {
        this.photos = photos;
      });
  }

  saveAlbum() {
    this.savingAlbum = true;
    if (this.album.id == 0){
      this._photoService.saveGallery(this.album)
        .subscribe(res => {
          this.albums.push(res);
          this.album.id = res.id;
          this.galleryId = this.album.id;
          this.selected_album = this.album.name;
          this.savingAlbum = false;
        });
    } else {
      this._photoService.updateGallery(this.album)
        .subscribe(res => {
          this.savingAlbum = false;
        });
    }
  }

  deleteAlbum() {
    this.galleryId = '';
    this.savingAlbum = true;

    let index = this.albums.findIndex(x => x.id === this.album.id);
    this.albums.splice(index, 1);

    this._photoService.deleteGallery(this.album.id)
      .subscribe(res => {
        this.selected_album = 'Select an Album';
        this.album = null;
        this.savingAlbum = false;
      });
  }

  savePhoto(photo: any) {
    this.savingPicture = true;
    
    if (photo.id == 0) {
      this._photoService.savePhoto(photo)
        .subscribe(res => {
          photo.id = res.id;
          this.savingPicture = false;
        });
    } else {
      this._photoService.updatePhoto(photo)
        .subscribe(photo => {
          this.savingPicture = false;
        });
    }
  }

  deletePhoto(id: any) {
    this.savingPicture = true;
    let index = this.photos.findIndex(x => x.id === id);
    this.photos.splice(index, 1);
    this._photoService.deletePhoto(id)
      .subscribe(res => {
        this.savingPicture = false;
      })
  }

  addNewPhoto() {
    var newPhoto = {
      description: '',
      imagePath: '',
      id: 0,
      galleryId: this.galleryId
    };
    this.photos.push(newPhoto);
  }

  addNewAlbum() {
    this.galleryId = '';
    this.selected_album = 'Adding new Album...';
    this.photos = [];

    var newGallery = {
      description: '',
      id: 0,
      isForProfile: false,
      name: ''
    };

    this.album = newGallery;
  }
}
