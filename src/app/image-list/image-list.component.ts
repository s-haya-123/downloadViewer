import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image-list/image-list.class';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit,OnChanges {
  isShow:boolean;
  tweets:object[];

  constructor(private imgService:ImageService) { }
  ngOnChanges(){
    this.ngOnInit();
  }
  ngOnInit() {
    this.tweets = this.imgService.getTweets();
  }

  
}
