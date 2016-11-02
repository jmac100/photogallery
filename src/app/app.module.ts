import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { PhotoService } from './services/photo.service';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CoverComponent } from './cover/cover.component';
import { ViewerComponent } from './viewer/viewer.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CoverComponent,
    ViewerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'album/:id', component: ViewerComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthguardService] },
      { path: '', component: CoverComponent }
    ])
  ],
  providers: [
    PhotoService,
    AuthService,
    AUTH_PROVIDERS,
    AuthguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
