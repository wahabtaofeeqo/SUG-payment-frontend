import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.sass']
})

export class MakePaymentComponent implements OnInit {

	payForm;

 	constructor(private builder: FormBuilder, private service: UserService, private loader: LoaderService, private toast: ToastService) {

 		this.payForm = builder.group({
 			matric: '',
 			email: '',
 			session: '',
 			amount: '',
 			department: ''
 		});
 	}

  	  ngOnInit() {}

  	public initialize(data) {

       if (navigator.onLine) {
            
            this.loader.loading(true);

            this.service.initialize(data).subscribe(res => {

            this.loader.loading(false);

            if (res['error']) {
                   this.toast.toast(res['error'])
                }
                else {

                  const url = res['url'];
                  sessionStorage.setItem("paymentSession", data.session);
                  sessionStorage.setItem("studentId", data.matric);
                  sessionStorage.setItem("paymentAmount", data.amount);
                  window.open(url);
              }

          })
        }
        else {

          this.toast.toast("You Are Offline.");
        }
  	}
}
