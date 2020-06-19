import { Component, OnInit } from '@angular/core';

// Modules
import { FormBuilder } from '@angular/forms';

// Services
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';


import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})

export class AdminLoginComponent implements OnInit {

	adminLogin;
  admin;

  	constructor(private builder: FormBuilder, private userService: UserService, private router: Router, private toast: ToastService) { 

  		this.adminLogin = builder.group({
  			username: '',
  			password: ''
  		})
  	}

  	ngOnInit() {}

  	public login(data): void {
      
  		this.userService.adminLogin(data).subscribe(res => {

  			if (res['error']) {

  				this.toast.toast(res['errorMessage']);
  				return;
  			}

  			this.startSession(data);
        
  		})
  	}

    private startSession(data) {

      if (data != null) {
        
        sessionStorage.setItem('adminName', data.username); 
        this.router.navigate(['/admin-dashboard']);
      }
      else {
        this.toast.toast("Unable To Start Session");
      }
  }

}
