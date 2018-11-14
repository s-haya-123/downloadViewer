import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageComponent } from './image/image.component';
// import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { ImageService } from './image.service';
import { TestComponent } from './test/test.component';
import { ChromeExtentionService } from './chrome-extention.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    ImageComponent,
    DetailComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [ImageService,ChromeExtentionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
