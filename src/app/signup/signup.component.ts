import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient } from '@angular/common/http';
import { HelpsService } from '../helps.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userdetails: any = {

  }
  signupForm: any
  users: any = []
  constructor(private toastr: ToastrService, private ngxService: NgxUiLoaderService, private http: HttpClient,
     private helpservices: HelpsService, private formbuilder : FormBuilder) {
this.signupForm= this.formbuilder.group({
  a:['',[ Validators.required, Validators.email]],
  b:['',[ Validators.required]],
  c:['',[ Validators.required]]
})

  }
  responseError: any
  signup() {
     if(this.signupForm.valid){
       alert
     }
     else{
       return
     }
    this.toastr.success('Successfully Signedup')
    console.log("values entered by user are:", this.userdetails)
    var temp = { ...this.userdetails }
    this.users.push(temp)

    var url = "https://apifromashu.herokuapp.com/api/register"
    this.helpservices.signup(url, this.userdetails).subscribe({
      next: (response: any) => {
        console.log("Response from register api", response)
        if (response.message == "User Already Exists") {
          this.responseError = "User already exists!"
        }

      },
      error: (error) => {
        console.log("error from register api", error)
      }
    })
    // this.http.post(url, this.userdetails).subscribe
    // ({
    //   next: (response: any) => {
    //     console.log("Response from register api", response)
    //     this.userdetails.name = response.name
    //     this.userdetails.email = response.email
    //     this.userdetails.password = response.password
    //   },
    //   error: (error) => {
    //     console.log("error from register api", error)
    //   }
    // })

  }
  deleteUser(index: any) {
    alert(index)
  }
  ngOnInit() {
    // this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    // }, 5000);

    // // OR
    // this.ngxService.startBackground("do-background-things");
    // // Do something here...
    // this.ngxService.stopBackground("do-background-things");

    // this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    // }, 5000);
  }

}
