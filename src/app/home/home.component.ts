import { Component, OnInit } from '@angular/core';

declare var $: any;


// Modules
import { FormBuilder } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Services
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';

// Classes
import { Payment } from '../helper/payment';

// Operators
import { map, catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

	confirmForm;
	details: Payment;
	error: boolean;
	status;
	confirmed;
	url: any;
	matric: string;
	session: string;
	disable;

	constructor(private builder: FormBuilder, private userService: UserService,
	 	private router: Router,
	 	private toastService: ToastService,
	 	private loader: LoaderService) { 

		this.confirmForm = builder.group({
			name: '',
			matric: '',
			department: '',
			session: '',
			phone: ''
		});
	}

	ngOnInit() {
		if (this.isOnline()) {
			this.checkPayment();
		}
		else {
			this.router.navigate(['/login']);
		}
	}

	public confirm(data): void {
	
		this.userService.confirm(data).subscribe(res => {

			if (res['error']) {
				this.toastService.toast(res['errorMessage']);
				this.confirmed = false;
			}
			else {

				this.confirmed = true;
				this.toastService.toast(res['message']);


				// Removing "/"
				this.matric = this.slishOut(data.matric);
				this.session = this.slishOut(data.session);
			}
		});
	}

	isOnline(): boolean {

		console.log(sessionStorage.getItem("matric"));
		if (sessionStorage.getItem('username') != null) 
			return true;
		else
			return false;
	}

	private checkPayment() {

		this.loader.loading(true);
		const data = {matric: this.slishOut(sessionStorage.getItem('matric'))};

		this.userService.checkPayment(data).subscribe(res => {

			this.loader.loading(false);
			if (res['error']) {
				this.toastService.toast(res['errorMessage']);
			}
			else {
				this.status = res['status'];
			}
		})
	}

	private printReciept(event) {

		this.disable = true;

		if (this.matric == null && this.session == null) {
			
			alert("Cant Generate The RECEIPT");
		}
		else {

			this.url = "http://localhost:80/api/sug/receipt/"+this.matric+"/"+this.session;
			window.open(this.url);
		}
	}

	private slishOut(data): string {

		let arr = data.split("/");
		let val = arr.join(" ");

		return val;
	}
}
