import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService {

  constructor(private http:Http) { }

  getGalleries() {
    return this.executeUrl(this.buildUrl('api/galleries'));
  }

  getGallery(id: string) {
    return this.executeUrl(this.buildUrl('api/galleries/' + id));
  }

  saveGallery(gallery: any) {
    let url = this.buildUrl('api/galleries/');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify(gallery), options)
      .map(res => res.json());
  }

  updateGallery(gallery: any) {
    let url = this.buildUrl('api/galleries/' + gallery.id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(url, JSON.stringify(gallery), options)
      .map(res => res);
  }

  deleteGallery(id: any) {
    let url = this.buildUrl('api/galleries/' + id);
    return this.http.delete(url)
      .map(res => res);
  }

  updatePhoto(photo: any) {
    let url = this.buildUrl('api/photos/' + photo.id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(url, JSON.stringify(photo), options)
      .map(res => res);
  }

  savePhoto(photo: any) {
    let url = this.buildUrl('api/photos/');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify(photo), options)
      .map(res => res.json());
  }

  deletePhoto(id: string) {
    let url = this.buildUrl('api/photos/' + id);
    return this.http.delete(url)
      .map(res => res);
  }

  getPhotos(id: string) {
    return this.executeUrl(this.buildUrl('api/galleryphoto/' + id));
  }

  private executeUrl(url: string) {
    return this.http.get(url)
      .map(res => res.json());
  }

  private buildUrl(urlPart: string): string {
    return 'http://jwmac.info/PhotoService/' + urlPart;
  }
}