import {Component, Input} from '@angular/core';
import {WeatherItem} from './weather-item';


@Component({
	selector: 'weather-item',
	template: `
		<div class="weather-item" >
			<div class="weather-item_date">
				{{weatherItem.date}}
			</div>
			<div class="weather-item_time">
				{{weatherItem.time}}
			</div>
			<div class="weather-item_weather-state">
				<div class="weather-item_weather-state_temperature">{{weatherItem.temperature}}<span>°C</span></div>
				<div class="weather-item_weather-state_sky">{{weatherItem.sky}}</div>
			</div>
		</div>
	`,
	styleUrls: ['../../scss/weather-item.scss']
})
export class WeatherItemComponent {
	@Input() weatherItem : WeatherItem;
}
