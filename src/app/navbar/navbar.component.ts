import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import {faCakeCandles ,faSearch, faCartShopping , faSignOut} from "@fortawesome/free-solid-svg-icons"
import { HelpsService } from "../helps.service";
import { HttpHeaders } from "@angular/common/http";
@Component({
    selector : "app-navbar",
    templateUrl: "./navbar.component.html"
})

export class NavbarComponents{
projecttitle : any = "Kitchen Story"
searchtext:any
length:any
isloggedin :any
faSearch:any=faSearch
faCartShopping: any = faCartShopping
faSignout : any = faSignOut
faCakeCandles :any =faCakeCandles
logout(){
    localStorage.clear();
    window.location.href = "/"
}
constructor(private ngxService: NgxUiLoaderService, private router :Router, private help: HelpsService){
    this.isloggedin = localStorage["token"]?true:false
    if(this.isloggedin){
        var url = "https://apifromashu.herokuapp.com/api/cakecart"
        var headers = new HttpHeaders()
        headers = headers.append("authtoken",localStorage["token"])
        var body = {}
        var options ={
            headers:headers
        }
        this.help.getCartItems(url,body,options).subscribe({
            next:(response:any)=>{
                console.log("response from cart items api in nAVBAR", response)
                this.help.cartitems = response.data
                this.length = response.data?.length
            }
        })
    }

}
isAdmin:any=false
adminUsers:any=["apurvashruti235@gmail.com"]
ngDoCheck(){
    this.length = this.help.cartitems?.length
    if(localStorage["token"]){
        this.isloggedin = true
        // this.length = this.help.cartitems?.length
        if(this.adminUsers.includes(localStorage["loggedinUser"]))
        this.isAdmin=true
    }
    else{
        this.isloggedin = false
        this.isAdmin = false
    }
}


search()
{
     if(this.searchtext){
    this.router.navigate(["/search"], {queryParams:{q:this.searchtext}})
}}
ngOnInit(){ 
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
// Stop the foreground loading after 5s
setTimeout(() => {
  this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
}, 5000);

// OR
this.ngxService.startBackground("do-background-things");
// Do something here...
this.ngxService.stopBackground("do-background-things");

this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
// Stop the foreground loading after 5s
setTimeout(() => {
  this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
}, 5000);
}
}