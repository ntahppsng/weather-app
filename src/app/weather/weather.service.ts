import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherItem} from './weather-item';
import {WEATHER_ITEMS} from './weather.data';

@Injectable()
export class WeatherService {

	private _urlRequestString : string = 'https://api.openweathermap.org/data/2.5/weather?q=';
	private _forecastUrlRequestString : string = 'https://api.openweathermap.org/data/2.5/forecast?q=';
	public cityRequestString : string = 'Chelyabinsk'
	private _apiRequestString : string = '&APPID=19890d71ce5438af8b80942993c0a581';
	private _unitsRequestString : string = '&units=metric';
	private _languageRequestString : string = '&lang=ru';

	constructor (private _http : HttpClient){}

	storeApiKey(key : string) : void {
		this._apiRequestString = '&APPID=' + key;
	}

	getWeatherItems() : WeatherItem[] {
		return WEATHER_ITEMS;
	}

	clearWeatherItems() : void {
		WEATHER_ITEMS.splice(0, WEATHER_ITEMS.length);
	}

	removeSixthDay(elementsNumber : number) : void {
		WEATHER_ITEMS.splice(WEATHER_ITEMS.length - elementsNumber, WEATHER_ITEMS.length);		
	}

	addWeatherItem(weatherItem : WeatherItem){
		WEATHER_ITEMS.push(weatherItem);
	}

	getWeatherViaAPI(cityName : string=this.cityRequestString) {
		return this._http.get(this._urlRequestString + cityName
			+ this._apiRequestString + this._unitsRequestString + this._languageRequestString);
	}

	getWeatherForecastViaAPI(cityName : string=this.cityRequestString) {
		return this._http.get(this._forecastUrlRequestString + cityName
			+ this._apiRequestString + this._unitsRequestString + this._languageRequestString);
	}

}