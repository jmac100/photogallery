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
  id;
  loading: boolean = true;
  elementRef: ElementRef;

  constructor
  (
    elementRef: ElementRef,
    private _route: ActivatedRoute,
    private _photoService: PhotoService
  ) { this.elementRef = elementRef; }


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
                this.images = [];
                photos.forEach(element => {
                  var img = {
                    src: element.imagePath,
                    alt: element.description,
                    title: element.description,
                    caption: element.description
                  };
                  this.images.push(img);
                });
                
            this.loading = false;

            $(this.elementRef.nativeElement).find('#gallery').remove();
            $(this.elementRef.nativeElement).append("<div id='gallery' class='bottom-spacer fade-me-in'></div>");

            $(this.elementRef.nativeElement).find('#gallery').imagesGrid({
              images: this.images
            });

            $(this.elementRef.nativeElement).find('img').siLoader(function(){
              $(this).fadeIn('slow');
            });
        });
    });
  }
}