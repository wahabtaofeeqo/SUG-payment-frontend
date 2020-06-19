import { Component, OnInit } from '@angular/core';

declare var $: any;

import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass']
})


export class ToastComponent implements OnInit {

    sub: Subscription;
    message: any;

    constructor(private toastService: ToastService) { 

      this.sub = toastService.getToast().subscribe(message => {
            this.message = message;
            
            if (message != null) {
                this.toast()
            }
      })
    }

  	ngOnInit() {}

    toast() {
      $(document).ready(function() {
           $(".toast").toast('show');
      })
    }

}