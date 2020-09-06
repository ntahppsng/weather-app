import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
	selector: 'head-comp',
	template: `
		<header>
			<div class="header-left">WeatherApp</div>
			<div class="header-center">
				<ul>
					<li><a routerLink="">Сегодня</a></li>
					<li><a routerLink="/forecast/1">Прогноз на 5 дней</a></li>
				</ul>
			</div>
			<div class="header-left"><span>WeatherApp</span></div>
		</header>
	`,
	styleUrls: ['../scss/header.scss']
})
export class HeaderComponent {}