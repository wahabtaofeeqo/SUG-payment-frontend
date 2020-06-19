import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Modules
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Services
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoaderComponent } from './loader/loader.component';
import { ToastComponent } from './toast/toast.component';
import { RecieptComponent } from './reciept/reciept.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminLoginComponent,
    DashboardComponent,
    StudentsComponent,
    PaymentsComponent,
    LoaderComponent,
    ToastComponent,
    RecieptComponent,
    NavbarComponent,
    MakePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }