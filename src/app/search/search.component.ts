import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpsService } from '../helps.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchitems:any=[]
  constructor(private route: ActivatedRoute, private help: HelpsService) {
   
    this.route.queryParams.subscribe((query:any)=>{
      var searchtext = query["q"]
      var url = "https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
    this.help.searchCakes(url).subscribe({
      next: (response: any) => {
        console.log("response from search cakes", response)
        this.searchitems = response.data
      },
      error:(error)=>{
      console.log("error from searchcake api")
      }
    })
    })
    
}

ngOnInit(): void {
}

}
