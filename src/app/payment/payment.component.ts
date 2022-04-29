import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  userdetails: any;
  totalprice: any;
  cakes: any;
  cartitems: any;
  orderdetails: any = {};

  constructor(
    private help: HelpsService,
    private http: HttpClient
  ) {
    this.cartitems = this.help.cartitems;

    this.userdetails = this.help.userdetails;

    this.totalprice = this.help.price;
    this.cakes = this.cartitems;
  }

  placeorder() {
    var url = 'https://apifromashu.herokuapp.com/api/addcakeorder';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakes: this.cakes,
      price: this.totalprice,
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    this.help.placeOrder(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from add cake order api', response);
        this.orderdetails = response.order;
      },
      error: (error: any) => {
        console.log('Error from place order api', error);
      },
    });
  }

  ngOnInit(): void {}
}
