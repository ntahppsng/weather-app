import { Component, Input, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
  
@Component({
    selector: 'pagination',
    template: `
    			<div class="pagination">
	    			<div class="previous-page"><a routerLink="/forecast/{{previousPage}}"><</a></div>
	    			<div class="pages">
		    			<a *ngFor="let i of pages" routerLink="/forecast/{{i}}" routerLinkActive="active">{{i}}</a>
		    		</div>
	    			<div class="next-page"><a routerLink="/forecast/{{nextPage}}">></a></div>
    			</div>
    		`,
    styleUrls: ['../../scss/pagination.scss']
})
export class PaginationComponent implements OnChanges {
	@Input() currentPage : any;
	pages : number[] = [1, 2, 3, 4, 5];
	previousPage : number;
	nextPage : number;
	ngOnChanges () {
		this.previousPage = parseInt(this.currentPage)-1;
		this.nextPage = parseInt(this.currentPage)+1;
	}
}