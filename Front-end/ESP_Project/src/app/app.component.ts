// running with : ng serve --proxy-config proxy.conf.json

import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ESP_Project';
  data : any;
  response : any;
  temp :any ;
  humidite : any ;
  constructor(private service : AppServiceService){

  }

  ngOnInit(): void {
    this.getDataFromAPI();
  }
  getDataFromAPI(){
    this.service.getData().subscribe((response)=>{
      console.log('Response from API is :',response)
      this.response = response ; 
      this.data = this.response.value;
      this.temp = this.data.substring(1, 20); 
      this.humidite = this.data.substring(30, 18);
    }, (error) => {
        console.log('Error is',error);
    })
  }


}
