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
    observer.observe(stream,{childList: true});
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
    return tweets;
  }

  divideTweet(tweet):object[]{
    if( tweet.src.length === 0){
      return [tweet];
    } else {
      return tweet.src.map(url=>{
        let copyTweet = JSON.parse(JSON.stringify(tweet));
        copyTweet.src = url;
        return copyTweet;
      });
    }
  }

  getTweet(item:Element):Object{
    let info = item.children[0];
    let name = item.getAttribute("data-name");
    let screenName = info.getAttribute("data-screen-name");
    let id = info.getAttribute("data-tweet-id");
    let actionCount = item.getElementsByClassName("ProfileTweet-actionCountForPresentation");
    let rt = (<HTMLElement>actionCount[1]).innerText;
    let like = (<HTMLElement>actionCount[3]).innerText;
    let text=(<HTMLBodyElement>item.getElementsByClassName("TweetTextSize")[0]).innerText;
    let contain_rapper = item.getElementsByClassName("AdaptiveMedia-container")[0];
    let src = contain_rapper === undefined?[""]:this.searchImgs(contain_rapper.children[0]);
    return {src:src,text:text,rt:rt,like:like,screenName:screenName,id:id};
  }

  searchImgs(contain:Element):string[]{
    let imgs = [];
    Array.from( contain.children ).forEach(half => {
      Array.from( half.children ).forEach(photo =>{
        let tmpImg = this.searchImgsRecuicive(<HTMLImageElement>photo);
        if(tmpImg !== undefined){
          imgs.push(tmpImg);
        }
      });
    });
    return imgs;
  }

  searchImgsRecuicive(img:HTMLImageElement):string{
    if(img === undefined){
      return;
    }
    else if(img.src === undefined){
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
