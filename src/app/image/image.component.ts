import { Component, Input} from '@angular/core';
import { Http, Request, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { ResponseContentType } from '@angular/http/src/enums';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { map } from 'rxjs/operators';
import { ImageService } from '../image.service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent  {
  _tweet:object;
  url:SafeUrl="";
  tags:{name:string}[]=[{name:""}];
  id:string;
  title:string="";
  caption:string="";
  isMulti:boolean;
  isHaveMedia:boolean;
  rt:string;
  like:string;
  screenName:string;
  constructor(private http:Http,private sanitizer: DomSanitizer,private service:ImageService,){//private auth:AuthService,private router:Router){
  }
  @Input()
  set tweet(tweet: object){
    this._tweet = tweet;
    this.id = this._tweet["id"];
    this.url = this._tweet['src'];
    this.rt = this._tweet['rt'];
    this.like = this._tweet['like'];
    this.caption = this._tweet['text'].replace(/https:.*/,"");
    this.screenName = this._tweet['screenName'];
  }
  getTag(tweet):undefined{

    return;
  }
  onTouch():undefined{
    return;
  }
  getScrollPosition():number {
    let y = document.documentElement.scrollTop || document.body.scrollTop;
    return y;
    }
}
