import { Component, OnInit } from '@angular/core';


// Services
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';

import { Student } from '../helper/student';

import { FormBuilder } from '@angular/forms';

import { ToastService } from '../services/toast.service';

import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

	loginForm;
	error = false;
	student;

	constructor(private service: UserService, 
				private formBuilder: FormBuilder,
				private toastService: ToastService, 
				private router: Router,
				private loader: LoaderService) {

		this.loginForm = formBuilder.group({
			username: '',
			password: ''
		});
	}

  	ngOnInit() {
  		this.service.isLoggedIn('/home');
  	}

	public login(data) {

		this.loader.loading(true);
		$('.btn').text("Please wait...");

		this.service.login(data).subscribe(res => {

			this.loader.loading(false);
			$('.btn').text("Login");
			
			this.error = res['error'];

			if (!this.error) {
				
				this.student = res['student'];

				this.startSession();
			}
			else {

				this.toastService.toast(res['errorMessage']);
			}
		})
	}

	private startSession() {

		if (this.student) {
			
			sessionStorage.setItem('matric', this.student.matric);
			sessionStorage.setItem('name', this.student.name);
			sessionStorage.setItem('username', this.student.username);
			sessionStorage.setItem('department', this.student.department);
			sessionStorage.setItem('phone', this.student.phone);
			
			this.router.navigate(['/home']);
		}
		else {
			this.toastService.toast("Unable To Start Session");
		}
	}
}