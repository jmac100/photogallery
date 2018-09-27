import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng2-lazyload-image';

import { PhotoService } from './services/photo.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/authguard.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CoverComponent } from './cover/cover.component';
import { ViewerComponent } from './viewer/viewer.component';
import { AdminComponent } from './admin/admin.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CoverComponent,
    ViewerComponent,
    AdminComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LazyLoadImageModule,
    RouterModule.forRoot([
      { path: 'album/:id', component: ViewerComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
      { path: 'callback', component: CallbackComponent },
      { path: '', component: CoverComponent }
    ])
  ],
  providers: [
    PhotoService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
