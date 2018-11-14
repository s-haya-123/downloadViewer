import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChromeExtentionService {
  private _observer;
  showChange:Observable<boolean>;

  constructor() { 
    this.setEventListner();
  }
  setEventListner():undefined {
    this.showChange = new Observable((observer)=>{
      this._observer = observer;
    });
    let __this = this;
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.pageStart){
          //observerをつくる
          __this._observer.next(true);
        }
          // sendResponse({farewell: "goodbye"});
    });
    return;
  }


}
