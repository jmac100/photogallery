import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements AfterViewInit {
  gallery: any;
  images;
  loading: boolean = true;
  el: HTMLElement;
  defaultImage: string = 'https://www.placecage.com/1000/1000';
  offset = 100;

  constructor
  (
    el: ElementRef,
    private _route: ActivatedRoute,
    private _photoService: PhotoService
  ) { this.el = el.nativeElement; }

  ngAfterViewInit() {        
    window.setTimeout(() => {
        this.getAlbum();      
    });
  }

  getAlbum() {
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
          this._photoService.getGallery(id)
              .subscribe(gallery => {
                  this.gallery = gallery;
              });
          this._photoService.getPhotos(id)
              .subscribe(photos => {
                  this.images = photos;
                });                
            this.loading = false;
        });        
  }
}