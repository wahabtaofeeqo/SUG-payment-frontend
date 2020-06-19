import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { AdminLoginComponent } from '../app/admin-login/admin-login.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { StudentsComponent } from '../app/students/students.component';
import { PaymentsComponent } from '../app/payments/payments.component';
import { RecieptComponent }from '../app/reciept/reciept.component';
import { MakePaymentComponent } from '../app/make-payment/make-payment.component';


const routes: Routes = [

	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'home', component: HomeComponent},
	{path: 'admin', component: AdminLoginComponent},
	{path: 'admin-dashboard', component: DashboardComponent},
	{path: 'admin-payments', component: PaymentsComponent},
	{path: 'reciept', component: RecieptComponent},
	{path: 'make-payment', component: MakePaymentComponent},
	{path: 'student', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


	
}
