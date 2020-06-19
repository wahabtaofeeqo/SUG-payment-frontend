import { Injectable } from '@angular/core';

import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

	subject = new Subject<any>();
	keepAfterRouteChange: boolean;

	constructor(private router: Router) { 
		// this.router.events.subscribe(event => {
  //           if (event instanceof NavigationStart) {
  //               if (this.keepAfterRouteChange) {
  //                   // only keep for a single route change
  //                   this.keepAfterRouteChange = false;
  //               } else {
  //                   // clear alert message
  //                   this.clear();
  //               }
  //           }
  //       });
	}

	getToast(): Observable<any> {
        return this.subject.asObservable();
    }

    toast(message) {
    	this.subject.next({body: message});
    }

    clear() {
    	this.subject.next();
    }
}
