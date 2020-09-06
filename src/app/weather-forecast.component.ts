import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {WeatherService} from './weather/weather.service';
import {WeatherItem} from './weather/weather-item';
     
@Component({
    selector: 'weather-forecast',
    template: `
    			<div class="day-forecast">
	                <weather-list [currentPage]="currentPage"></weather-list>
	                <pagination [currentPage]="currentPage"></pagination>
	            </div>`,
	styleUrls: ['../scss/weather-forecast.scss']
})
export class WeatherForecastComponent implements OnInit {
    data : any = {};

    /* Pagination support. */
    currentPage : any = 1;
    pagesNumber : number = 5;
    private subscription: Subscription;

    constructor (private activateRoute: ActivatedRoute, private router : Router, private _weatherService : WeatherService) {
    	this.subscription = activateRoute.params.subscribe(params=>{
			    /* Value validation. */
	    		if ((parseInt(params['page']) <= this.pagesNumber) && (parseInt(params['page']) >= 1)) {
		    		this.currentPage=params['page'];
		    	}
		    	else {
		    		this.router.navigate(['/forecast/1']);
		    	}
	    	});
    }

	ngOnInit() {
		this._weatherService.getWeatherViaAPI()
			.subscribe(data => this.data = data,
				error => this.router.navigate(['auth'])); /* Check API key. */
	}

}