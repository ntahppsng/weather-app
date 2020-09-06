import { Component, OnChanges } from '@angular/core';
import { Router} from '@angular/router';
import {WeatherService} from './weather/weather.service';
  
@Component({
    selector: 'main-app',
    template: `
    			<div class="main-component">
    				<router-outlet></router-outlet>
    			</div>
    		`,
	styleUrls: ['../scss/main.scss']
})
export class MainComponent {
	constructor (private weatherService : WeatherService, private router : Router) {
		this.weatherService.storeApiKey(getCookie("apiKey"));
	}

}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}