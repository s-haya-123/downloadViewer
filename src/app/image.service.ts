import { Injectable } from '@angular/core';
import { element } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private _observer;
  tweetsChange:Observable<object[]>;

  constructor() { 
    this.setObserver();
  }

  setObserver():undefined{
    this.tweetsChange = new Observable((observer)=>{
      this._observer = observer;
    });
    var observer = new MutationObserver( (MutationRecords, mutationObserver)=> {
      if(MutationRecords[0].addedNodes.length > 0){
        let items = MutationRecords[0].addedNodes;
        let tweets = [];
        Array.from(items).forEach(item=>{
          let tweet = this.getTweet(<Element>item);
          tweets = tweets.concat(this.divideTweet(tweet));
        });
        this._observer.next(tweets);
      }
      this.clearElement();
    });
    let stream = document.getElementById("stream-items-id");
    observer.observe(stream,{childList: true})
    return;
  }

  getTweets():Object[]{
    let items = document.getElementById("stream-items-id").children;
    let tweets = [];
    Array.from(items).forEach(item=>{
      let tweet = this.getTweet(item);
      tweets = tweets.concat(this.divideTweet(tweet));
    });
    this.clearElement();
    this.clearElementClass();
    // this.clearDoc();
    return tweets;
  }

  divideTweet(tweet):object[]{
    if(tweet.src.length === 0){
      return [tweet];
    } else {
      return tweet.src.map(url=>{
        return {src:url,text:tweet.text};
      });
    }
  }

  getTweet(item:Element):Object{
    let contain=item.getElementsByClassName("AdaptiveMedia-container")[0].children[0];
    let text=(<HTMLBodyElement>item.getElementsByClassName("TweetTextSize")[0]).innerText
    let src = this.searchImgs(contain);
    return {src:src,text:text};
  }

  searchImgs(contain:Element):string[]{
    let imgs = [];
    Array.from( contain.children ).forEach(half => {
      Array.from( half.children ).forEach(photo =>{
        let tmpImg = this.searchImgsRecuicive(<HTMLImageElement>photo);
        imgs.push(tmpImg);
      });
    });
    return imgs;
  }

  searchImgsRecuicive(img:HTMLImageElement):string{
    if(img.src === undefined){
      return this.searchImgsRecuicive(<HTMLImageElement>img.children[0]);
    } else {
      return img.src
    }
  }
  clearElement():undefined{
    let element = document.getElementById("stream-items-id");
    while (element.firstChild) element.removeChild(element.firstChild);
    return;
  }
  clearElementClass():undefined{
    document.getElementsByClassName("stream-footer")[0].remove();
    let element = document.getElementsByClassName("Grid-cell")[3];
    while (element.firstChild) element.removeChild(element.firstChild);
    document.getElementsByClassName("Grid-cell")[7].remove();
    return;
  }
  clearDoc():undefined{
    let element = document.getElementById("doc");
    while (element.firstChild) element.removeChild(element.firstChild);
    element.parentElement.removeChild(element)
    return;
  }
}
