import {Component, OnChanges, Input} from '@angular/core';
import {WeatherItemComponent} from './weather-item.component';
import {WeatherItem} from './weather-item';
import {WeatherService} from './weather.service';

@Component({
	selector: 'weather-list',
	template: 
	`
		<section class="list-info">
		    <div class="city">Челябинск</div>
		    <div class="current-date">{{currentDate}}</div>
	    </section>
		<div class="weather-list">
			<weather-item *ngFor="let weatherItem of weatherItems" [weatherItem]="weatherItem"></weather-item>
		</div>
	`
})
export class WeatherListComponent implements OnChanges {

    /* Pagination support. */
	@Input() currentPage : number;
	elementsNumber : number = 8;

	currentDate : string;
    /* Format time outputs. */
	optionsT = {
			  timeZone: 'Asia/Yekaterinburg',
			  hour: 'numeric',
			  minute: 'numeric'
	};
    /* Format date outputs. */
    optionsD = {
			  month: 'long',
			  day: 'numeric',
			  weekday: 'long',
	};


	weatherItems : WeatherItem[];

	constructor (private _weatherService : WeatherService) {}

	/* Abomination. */
	ngOnChanges () {
		this._weatherService.getWeatherForecastViaAPI()
    		.subscribe((data : any) => {
	    		this._weatherService.clearWeatherItems();
	    		for(let i = 0; i<data.list.length; i++){
					let dd = new Date(data.list[i].dt_txt);
	     			this._weatherService.addWeatherItem(
	     				new WeatherItem(data.city.name,
	     				 data.list[i].weather[0].description, 
	     				 Math.round(data.list[i].main.temp),"", dd.toLocaleString("ru",this.optionsT)));
	     		}

			    /* Get rid of the sixth day in the weather forecast. */
	     		let regSixthDay = new RegExp(data.list[data.list.length-1].dt_txt.slice(0,10), "i");
	     		let sixthDayElementsNumber = data.list.filter((item : any) => regSixthDay.test(item.dt_txt)).length;
	     		this._weatherService.removeSixthDay(sixthDayElementsNumber);

			    /* Get weather for a particular date. */
	     		if (this.currentPage == 1) {
	     			this.weatherItems = this._weatherService.getWeatherItems()
						.slice(0,this.elementsNumber-sixthDayElementsNumber);
					this.currentDate = new Date(data.list[0].dt_txt).toLocaleString("ru", this.optionsD);
	     		}
	     		else {
	     			this.weatherItems = this._weatherService.getWeatherItems()
						.slice((this.currentPage-1)*this.elementsNumber-sixthDayElementsNumber,
							this.currentPage*this.elementsNumber-sixthDayElementsNumber);
					this.currentDate = 
						new Date(data.list[(this.currentPage-1)*this.elementsNumber-sixthDayElementsNumber].dt_txt)
							.toLocaleString("ru", this.optionsD);
				}
			});
		
	}

}