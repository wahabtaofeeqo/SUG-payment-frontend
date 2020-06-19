import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})

export class LoaderComponent implements OnInit {

	sub: Subscription;
	loading: boolean;

  	constructor(public loader: LoaderService) {
  		this.loader.getLoading().subscribe(res => {
  			this.loading = res['load'];
  		})
  	}

  	ngOnInit() {}
}
