import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Student } from '../helper/student';

import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {

	students;
	error: boolean = false;
	filterForm;

	dept = "Computer Science";
	level = "HND 2";

  	constructor(private service: UserService, private builder: FormBuilder, private toastService: ToastService) { 
  		this.filterForm = builder.group({
  			dept: '',
  			level: ''
  		});
  	}

  	ngOnInit() {

  		const data = { dept: this.dept, level: this.level };

  		this.load(data);
  	}

  	private loadStudents() {

  		this.service.students().subscribe(res => {

  			if (res['error']) {
          this.error = true;
  				return;
  			}

        this.error = false;
  			this.students = res['data'];
  		})
  	}

  	public load(data) {

  		this.service.load(data.dept, data.level).subscribe(res => {

  			if (res['error']) {

  				this.toastService.toast(res['errorMessage']);
  				return;
  			}

  			this.students = res['data'];

        if (this.students != null) {
            this.data();
        }
  		})
  	}


    public data() {
      $(document).ready(function() {
        $("#example").DataTable();
      })
    }
}
