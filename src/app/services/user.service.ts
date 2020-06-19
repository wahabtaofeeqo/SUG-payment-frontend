import { Injectable } from '@angular/core';


// Modules
import { HttpClient, HttpHandler, HttpParams, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

// Classes
import { Payment } from '../helper/payment';
import { Student } from '../helper/student';


@Injectable({
  providedIn: 'root'
})

export class UserService {

	baseURL = "http://localhost/api/sug";
	confirmURL = this.baseURL + "/confirm";
	payment: Payment;

	constructor(private client: HttpClient, private httpHandler: HttpHandler, private router: Router) { }

	public sayHi() {
		return this.client.get(this.baseURL).subscribe(res => console.log(res), error => console.log(error));
	}

	public login(data): Observable<any> {

		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/login`, {data: data}, httpOptions)
		.pipe(catchError(this.handler));
	}
	

	public confirm(data): Observable<any> {

		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(this.confirmURL, {formData: data}, httpOptions).pipe(catchError(this.handler));
	}

	private handler(error: HttpErrorResponse) {
		console.log(error);

		console.log(error.message);
		return throwError("Error!");
	}

	public adminLogin(data): Observable<any> {

		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/admin-login`, {data: data}, httpOptions)
		.pipe(catchError(this.handler));
	}


	public students(): Observable<Student[]> {
		return this.client.get<Student[]>(`${this.baseURL}/students`).pipe(catchError(this.handler));
	}

	public load(dept, level): Observable<Student[]> {
		return this.client.get<Student[]>(`${this.baseURL}/students/${dept}/${level}`).pipe(catchError(this.handler));
	}

	public loadPayments(): Observable<Payment[]> {
		return this.client.get<Payment[]>(`${this.baseURL}/payments`).pipe(catchError(this.handler));
	}

	public payments(data): Observable<any> {
		
		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/payments`, {data: data}, httpOptions)
		.pipe(catchError(this.handler));
	}

	public isLoggedIn(page) {
		if (sessionStorage.getItem('username') && sessionStorage.getItem('matric')) {
			this.router.navigate([page]);
		}
		else {
			this.router.navigate(['/login']);
		}
	}

	public reciept(): any {

		// const options = { responseType: ResponseContentType  };
	 //    return this.client.get(`${this.baseURL}/reciept`, options).map(
	 //    (res) => {
	 //        return new Blob([res.blob()], { type: 'application/pdf' });
	 //    });
	}

	public checkPayment(data): Observable<any> {
		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/check-pay`, {data: data}, httpOptions).pipe(catchError(this.handler));
	}


	public initialize(data): Observable<any> {
		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/make-payment`, {data: data}, httpOptions).pipe(catchError(this.handler));
	}


	public addStudent(data): Observable<any> {
		
		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/add-student`, {data: data}, httpOptions)
		.pipe(catchError(this.handler));
	}

		public addPayment(data): Observable<any> {
		
		const httpOptions = {
			  headers: new HttpHeaders({
			    'Content-Type':  'application/x-www-form-urlencoded'
			  })
			};

		return this.client.post<any>(`${this.baseURL}/add-payment`, {data: data}, httpOptions)
		.pipe(catchError(this.handler));
	}
}