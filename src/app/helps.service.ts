import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpsService {
  PORT =8080
loggedinUser:any
cartitems:any
price:any
userdetails:any
email:any = ""
  signup(url: any,body:any){
return this.http.post(url,body)
  }

login(url: any,body:any){
  return this.http.post(url,body)
    }

getCakedetails(url:any){
return this.http.get(url)
}

searchCakes(url : any ){
  return this.http.get(url)
}

addCakeToCart(url : any,body:any,options:any){
  return this.http.post(url,body,options)
}

getCartItems(url : any,body:any,options:any){
  return this.http.post(url,body,options)
}

uploadImage(url : any,body:any,options:any){
  return this.http.post(url,body,options)
}

removeItemFromCart(url : any,body:any,options:any){
  return this.http.post(url,body,options)
}
placeOrder(url: any, body: any, options: any) {
  return this.http.post(url, body, options);
}

forgot(url: any, body: any) {
  return this.http.post(url, body);
}
ascending(data:any){
  data.sort((obj1 : any ,obj2 : any)=>{
    return obj1.price - obj2.price
  })
  return data
}
descending(data:any){
  data.sort((obj1 : any ,obj2 : any)=>{
    return obj2.price - obj1.price
  })
  return data
}
  constructor(private http : HttpClient) { }
}
