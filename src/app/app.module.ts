import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent }   from './header.component';

import { MainComponent }   from './main.component';
import { AuthorizationComponent }   from './authorization.component';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherForecastComponent } from './weather-forecast.component';

import { PaginationComponent } from './tools/pagination.component';
import { WeatherItemComponent } from './weather/weather-item.component';
import { WeatherListComponent } from './weather/weather-list.component';

import {WeatherService} from './weather/weather.service';


const appRoutes : Routes = [
	{path: '', component: CurrentWeatherComponent },
	{path: 'auth', component: AuthorizationComponent},
	{path: 'forecast/:page', component: WeatherForecastComponent},
	{path: '**', redirectTo: ''}
];

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [ HeaderComponent, MainComponent, 
    	AuthorizationComponent, CurrentWeatherComponent, WeatherForecastComponent,
		PaginationComponent, WeatherItemComponent, WeatherListComponent],
    providers: [WeatherService],
    bootstrap: [ MainComponent, HeaderComponent]
})
export class AppModule { }