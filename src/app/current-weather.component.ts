import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {WeatherService} from './weather/weather.service';
import {WeatherItem} from './weather/weather-item';
     
@Component({
    selector: 'current-weather',
    template: `
    			<div class="current">
    			<div class="crcr">
					<section class="location">
					    <div class="city">Челябинск</div>
				    </section>
		            <weather-item [weatherItem]="weatherItem"></weather-item>
		        </div>
                </div>`,
    styleUrls: ['../scss/current-weather.scss']
})
export class CurrentWeatherComponent implements OnInit { 
    city : string = 'Chelyabinsk';
    weatherItem : WeatherItem;
    /*Format date and time outputs. */
    options = {
			  month: 'long',
			  day: 'numeric',
			  weekday: 'long',
	};
    data : any = {};
    constructor (private router : Router, private _weatherService : WeatherService) {}

    ngOnInit() : void {
		this._weatherService.getWeatherViaAPI(this.city).subscribe((data : any) =>  
		this.weatherItem = new WeatherItem(data.name, data.weather[0].description,
		 data.main.temp,(new Date).toLocaleString("ru", this.options),""), 
		error => this.router.navigate(['auth'])); /* Check API key. */

    }

}