import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems: any = []
  totalprice: any = 0
  faTrash: any = faTrash
  constructor(private help: HelpsService, private loader:NgxUiLoaderService, private router :Router) {
    var url = "https://apifromashu.herokuapp.com/api/cakecart"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken", localStorage["token"])
    var options = {
      headers: myheaders
    }
    var body = {}
    this.help.getCartItems(url, body, options).subscribe({
      next: (response: any) => {
        console.log("response for cart items ", response)
        this.cartitems = response.data
        this.cartitems.forEach((each: any) => {
          this.totalprice = this.totalprice + each.price * each.quantity
        })
      },
      error: (error) => {
        console.log("Error from cart api items", error)
      }
    })
  }

  removeItemFromCart(index: any) {
    var body = {
      cakeid: this.cartitems[index]["cakeid"]
    }
    var url = "https://apifromashu.herokuapp.com/api/removecakefromcart"
    var myheader = new HttpHeaders()
    myheader = myheader.append("authtoken", localStorage["token"])
    var options = {
      headers: myheader
    }
    this.loader.start()

    this.help.removeItemFromCart(url, body, options).subscribe({
      next: (response: any) => {
        this.loader.stop()

        console.log("response from remove cart api", response)
        if (response.message == "Removed whole cake  item from cart", response) {
          this.totalprice = this.totalprice - this.cartitems[index].quantity * this.cartitems[index].price
          this.cartitems.splice(index, 1)

        }
      },
      error: (error: any) => {
        this.loader.stop()

        console.log("error in remove cakes from cart api", error)
      }
    })
  }

  increasequantity(index: any) {
    var url="https://apifromashu.herokuapp.com/api/addcaketocart"
    var myheader = new HttpHeaders()
    myheader = myheader.append("authtoken", localStorage["token"])
    var options = {
      headers: myheader
    }
    this.loader.start()
    this.help.addCakeToCart(url,this.cartitems[index],options).subscribe({
      next: (response: any) => {
        this.loader.stop()
        console.log("response from add cake to cart api", response)
        if(response.data){
        this.totalprice = this.totalprice + this.cartitems[index].price
        this.cartitems[index].quantity++
        }
      },
      error: (error: any) => {
        this.loader.stop()

        console.log("error in add cakes to cart api", error)
        
      }
    })
   
  }
  decreasequantity(index: any) {
    var url ="https://apifromashu.herokuapp.com/api/removeonecakefromcart"
    var myheader = new HttpHeaders()
    myheader = myheader.append("authtoken", localStorage["token"])
    var options = {
      headers: myheader
    }
    var body ={
      cakeid:this.cartitems[index].cakeid
    }
    this.loader.start()
    this.help.removeItemFromCart(url,body,options).subscribe({
      next: (response: any) => {
        this.loader.stop()
        console.log("response from remove from cart api", response)
        this.totalprice = this.totalprice - this.cartitems[index].price
        this.cartitems[index].quantity--
      },
      error: (error: any) => {
        this.loader.stop()

        console.log("error in add cakes to cart api", error)
        
      }
    })
 
  }
checkout(){
  this.help.cartitems= this.cartitems
  this.help.price= this.totalprice
  this.router.navigate(["/checkout"])
}
  ngOnInit(): void {
  }

}
