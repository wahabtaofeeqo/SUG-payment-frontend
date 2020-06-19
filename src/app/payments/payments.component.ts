import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Payment } from '../helper/payment';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';

declare var $: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass']
})

export class PaymentsComponent implements OnInit {

	payments: Payment[];
	error: boolean = false;
  lastValue: string;

	session = "2020/2019";

  	constructor(private service: UserService, private router: Router, private loader: LoaderService) { }

  	ngOnInit() {
  		if (sessionStorage.getItem('adminName') == null) {
           this.router.navigate(['/admin']);
      }
      else {
        this.loadPayments();
      }
  	}

  	public reload(event) {

      const val = event.target.value;

      if (val == this.lastValue) 
        return;

      this.payment(val);
  	}

  	private loadPayments() {

  		this.service.loadPayments().subscribe(res => {

  			if (res['error']) {

  				alert("Could not load the data");
  				return;
  			}

  			this.payments = res['data'];
  			
        if (this.payments != null) {
            this.data();
        }
  		})
  	}

    public data() {
      $(document).ready(function() {
        $("#example").DataTable();
      })
    }

    private payment(value) {

      this.loader.loading(true);
      this.service.payments(value).subscribe(res => {

        this.loader.loading(false);
          if (res['error']) {
              
              alert(res['errorMessage']);
              return;
          }

          this.payments = res['data'];
      })
    }

}
