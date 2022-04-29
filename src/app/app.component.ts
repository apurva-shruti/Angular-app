import { Component } from '@angular/core';
import { HelpsService } from './helps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tekangularapp';
  constructor(private help : HelpsService){

  }
}
