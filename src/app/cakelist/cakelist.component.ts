import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css']
})
export class CakelistComponent {

  constructor(private helpsangular: HelpsService, private http: HttpClient, private ngxService: NgxUiLoaderService) {
    var url = "https://apifromashu.herokuapp.com/api/allcakes"
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log("Response from all cakes api", response)
        this.cakes = response.data
      },
      error: (error) => {
        console.log("error from cakes api", error)
      }
    })
  }
  ascSort() {
    // this.helpsangular.PORT = 4200
    this.cakes = this.helpsangular.ascending(this.cakes)
  }
  descSort() {
    this.cakes = this.helpsangular.descending(this.cakes)
  }
  cakes: any =
    [
      // {name:"Truffle Cake", price:800, image:"assets/cake2.jpg", special:true},
      // {name:"Cake", price:600, image:"assets/cake3.jpg"},
      // {name:"Cake", price:700, image:"assets/cake1.jpg"},
      // {name:"Cake", price:690, image:"assets/cake3.jpg"},
      // {name:"Cake", price:580, image:"assets/cake4.jpg"},
      // {name:"Cake", price:790, image:"assets/cake2.jpg"},
      // {name:"Cake", price:450, image:"assets/cake1.jpg"},
      // {name:"Cake", price:880, image:"assets/cake3.jpg"}

    ]


}
