import { Component, OnChanges } from '@angular/core';
import { Router} from '@angular/router';
import {WeatherService} from './weather/weather.service';
  
@Component({
    selector: 'authorization',
    template: `
    			<div class="authorization">
	            	<label> Введите, пожалуйста, свой API ключ с сайта 
	            		<a href="https://openweathermap.org">https://openweathermap.org</a>. </label>
	                <input name="key" [(ngModel)]="apiK" />
	                <button (click)="storeKey()">Сохранить</button>
    			</div>
    		`,
	styleUrls: ['../scss/authorization.scss']
})
export class AuthorizationComponent {
	apiK : any;
	constructor (private weatherService : WeatherService, private router : Router) {}

	storeKey() {
		document.cookie = "apiKey="+this.apiK+"; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; secure; samesite=strict";
		this.weatherService.storeApiKey(getCookie("apiKey"));
		this.router.navigate(['']);
	}

}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}