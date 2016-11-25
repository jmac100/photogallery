import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  profiles: any[];
  galleries: any[];
  loading: boolean = true;

  constructor
  (
    private _photoService: PhotoService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus(){
    this.profiles = [];
    this.galleries = [];
    
    this._photoService.getGalleries()
      .subscribe(galleries => {
        galleries.forEach(element => {
          if (element.isForProfile && element.isEnabled) {
            this.profiles.push(element);
          } else if (element.isEnabled) {
            this.galleries.push(element);
          }
        });
        this.loading = false;
      });
  }
}
