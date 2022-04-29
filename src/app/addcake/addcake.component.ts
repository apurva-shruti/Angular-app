import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css']
})
export class AddcakeComponent implements OnInit {


  file:any
  imageUrl:any
getFile(event:any): void{
this.file = event.target.files[0]
}
upload(){
var url = "https://apifromashu.herokuapp.com/api/upload"
var formdata = new FormData()
formdata.append("file", this.file)

var myheader = new HttpHeaders() 
myheader = myheader.append("authtoken",localStorage["token"])
var options={
  headers: myheader
}
this.help.uploadImage(url,formdata, options).subscribe({
  next:(response:any)=>{
console.log("upload image api is working", response)
this.imageUrl = response.imageUrl
  },
  error:(error: any)=>{
    console.log("eroor from upload image is working", error)
  }
})
}  
constructor(private help : HelpsService) {
  
 }

  ngOnInit(): void {
  }

}
