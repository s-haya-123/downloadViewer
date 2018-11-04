import { Injectable } from '@angular/core';
import { element } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  getTweets():Object[]{
    let items = document.getElementById("stream-items-id").children;
    this.clearDoc();
    let tweet = this.getTweet(items[0]);
    return [tweet];
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

  clearDoc():undefined{
    let element = document.getElementById("doc");
    while (element.firstChild) element.removeChild(element.firstChild);
    element.parentElement.removeChild(element)
    return;
  }
}
