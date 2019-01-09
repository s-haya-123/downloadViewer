import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image-list/image-list.class';
import { Response } from '@angular/http/src/static_response';
import { ChromeExtentionService } from '../chrome-extention.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit,OnChanges {
  isShow:boolean;
  tweets:object[];
  showList:boolean = false;

  constructor(private imgService:ImageService,private extension:ChromeExtentionService) { }
  ngOnChanges(){
    this.ngOnInit();
  }
  ngOnInit() {
    this.extension.showChange.subscribe(show=>{
      this.showList = show;
    });
    this.tweets = this.imgService.getTweets();
    this.imgService.tweetsChange.subscribe(tweets=>{
      this.tweets=this.tweets.concat(tweets);
    })
  }

  
}
