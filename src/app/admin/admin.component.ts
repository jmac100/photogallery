import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  albums: any[];
  album: any;
  photos: any[];
  loading: boolean = false;
  savingAlbum: boolean = false;
  savingPicture: boolean = false;
  selected_album: string = 'Select an Album'

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

  updateAlbum() {
    this.savingAlbum = true;
    this._photoService.updateGallery(this.album);   
    this.savingAlbum = false;
  }

  updatePhoto(photo: any) {
    this.savingPicture = true;
    this._photoService.updatePhoto(photo);
    this.savingPicture = false;
  }
}
