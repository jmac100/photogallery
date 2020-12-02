import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

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

    return this.http.post(url, {gallery}, options)
      .map(res => res.json());
  }

  updateGallery(gallery: any) {
    let url = this.buildUrl('api/galleries/' + gallery.id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(url, { gallery }, options)
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

    return this.http.put(url, {photo}, options)
      .map(res => res);
  }

  savePhoto(photo: any) {
    let url = this.buildUrl('api/photos/');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, {photo}, options)
      .map(res => res.json());
  }

  deletePhoto(id: string) {
    let url = this.buildUrl('api/photos/' + id);
    return this.http.delete(url)
      .map(res => res);
  }

  getPhotos(id: string) {
    return this.executeUrl(this.buildUrl(`api/galleries/${id}/photos`));
  }

  private executeUrl(url: string) {
    return this.http.get(url)
      .map(res => res.json());
  }

  private buildUrl(urlPart: string): string {
    return `${environment.apiUrl}${urlPart}`
  }
}