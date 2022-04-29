import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HelpsService } from '../helps.service';

@Component({
  selector: 'app-cakedetail',
  templateUrl: './cakedetail.component.html',
  styleUrls: ['./cakedetail.component.css']
})
export class CakedetailComponent implements OnInit {
cakeid:any
cake:any={}
isadding:any=false
  constructor(private spinner : NgxUiLoaderService, private route : ActivatedRoute, private help : HelpsService,private router :Router) { 
    this.cakeid =  this.route.snapshot.params["cakeid"]
    this.spinner.start()
    var url = "https://apifromashu.herokuapp.com/api/cake/" + this.cakeid
    this.help.getCakedetails(url).subscribe({
      next:(response:any)=>{
        this.spinner.stop()
        console.log("Response from cakedetails api", response)
        this.cake= response.data
      },
      error:(error)=>{
        this.spinner.stop()
        console.log("Error from cakedetails api", error)
      }
    })
  }
 addToCart(){
   if(localStorage["token"]){
     this.isadding= true
    let myheaders= new HttpHeaders()
    myheaders = myheaders.append("authtoken",localStorage["token"])
    var url = "https:///apifromashu.herokuapp.com/api/addcaketocart"
    var options = {
      headers : myheaders
    }
    var body ={
      cakeid:this.cake.cakeid,
      name:this.cake.name,
      price:this.cake.price,
      weight:this.cake.weight,
      image:this.cake.image,
    }
    this.help.addCakeToCart(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("response for cart ", response)
        if(response.data){
          this.router.navigate(["/cart"])
        }
      },
      error:(error)=>{
        console.log("Error from cart api", error)
      }
    })
   }
   else{
this.router.navigate(['/login'])
   }

 }
  ngOnInit(): void {
  }

}
