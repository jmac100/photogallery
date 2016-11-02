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

  updateGallery(gallery: any) {
    let url = this.buildUrl('api/galleries/' + gallery.id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(url, JSON.stringify(gallery), options)
      .subscribe();
  }

  updatePhoto(photo: any) {
    let url = this.buildUrl('api/photos/' + photo.id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(url, JSON.stringify(photo), options)
      .subscribe();
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