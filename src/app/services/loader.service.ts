import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoaderService {

	subject = new Subject<any>();

  	constructor() { }

  	loading(bool) {
  		this.subject.next({load: bool})
  	}

  	getLoading(): Observable<any> {
  		return this.subject.asObservable();
  	}


}
