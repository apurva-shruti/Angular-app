import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private helpservice: HelpsService, private router : Router) {

  }
responseError:any
  userdetails: any = {}
  login() 
  {
    var url = "https://apifromashu.herokuapp.com/api/login"
    this.helpservice.login(url, this.userdetails).subscribe
    ({
      next: (response: any) => 
      {
        console.log("resonse from login", response)
        if(response.token){
          localStorage["token"]= response.token
          localStorage["loggedinUser"] = response.email
          var url = "https://apifromashu.herokuapp.com/api/cakecart"
          var headers = new HttpHeaders()
          headers = headers.append("authtoken",localStorage["token"])
          var body = {}
          var options ={
              headers:headers
          }
          this.helpservice.getCartItems(url,body,options).subscribe({
              next:(response:any)=>{
                  console.log("response from cart items api in nAVBAR", response)
                  this.helpservice.cartitems = response.data
              }
          })
          this.router.navigate(["/"])
        }
        else{this.responseError = " Invalid Credentials"}
      },
      error: (error) =>
       {
        console.log("error from login", error)
      }
    })
  }
  ngOnInit(): void {
  }

}
