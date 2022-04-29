import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
userdetails:any={}
  constructor(private help: HelpsService) {
    this.help.cartitems
   }
addAddress(){
 this.help.userdetails= this.userdetails
}
  ngOnInit(): void {
  }

}
