import { Component, OnInit } from '@angular/core';


// Services
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.sass']
})


export class RecieptComponent implements OnInit {

	matric;
	session;
	url;
	amount;

  	constructor(private service: UserService) {
  		this.matric = this.slishOut(sessionStorage.getItem("studentId"));
  		this.session = this.slishOut(sessionStorage.getItem("paymentSession"));
  		this.amount = sessionStorage.getItem("paymentAmount"); 
  	}

  	ngOnInit() {
  		this.printReciept();
  	}


  	private printReciept() {

		if (this.matric == null && this.session == null) {
			
			alert("Cant Generate The RECEIPT");
		}
		else {

			const data = {matric: this.matric, session: this.session, amount: this.amount};

			this.service.addPayment(data).subscribe(res => {

				console.log(res);
				
				if (!res['error']) {
					
					this.url = "http://localhost:80/api/sug/receipt/"+this.matric+"/"+this.session;
					window.open(this.url);
				}
				else {
					alert(res['errorMessage']);
				}
			})
		}
	}


	private slishOut(data): string {

		let arr = data.split("/");
		let val = arr.join(" ");

		return val;
	}
}
