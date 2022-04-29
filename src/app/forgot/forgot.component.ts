import { Component, OnInit } from '@angular/core';
import { HelpsService } from '../helps.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private help: HelpsService) { }

userdetails:any
forgot() 
  {
    var url = "https://apifromashu.herokuapp.com/api/recoverpassword"
    this.help.forgot(url, this.userdetails).subscribe
    ({
      next: (response: any) => 
      {
        console.log("resonse from login", response)
        
      },
      error: (error: any) =>
       {
        console.log("error from login", error)
      }
    })
  }





  ngOnInit(): void {
  }

}
