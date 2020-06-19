import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';

declare var $: any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

	addForm;

  	constructor(private builder: FormBuilder, private service: UserService, private loader: LoaderService, private toast: ToastService) {

  		this.addForm = builder.group({
 			matric: '',
 			session: '',
 			amount: '',
 			department: ''
 		});
  	}

  	ngOnInit() {}


  	public addStudent(data) {

  		this.loader.loading(true);

        this.service.addStudent(data).subscribe(res => {

            this.loader.loading(false);

            if (res['error']) {
                   this.toast.toast(res["errorMessage"]);
            }
            else {
            	this.toast.toast(res['message']);
            }

            //location.reload();

        })
  	}
}
