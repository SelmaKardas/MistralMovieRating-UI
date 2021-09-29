import {filter} from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoreService } from '../../shared/services/core.service';
import { MenuItems } from 'app/core/menu/menu-items/menu-items';
import { PageTitleService } from 'app/shared/services/page-title.service';
import { AuthService } from 'app/core/auth/auth-service.component';


declare var require: any

const screenfull = require('screenfull');

@Component({
	selector: 'xcore-layout',
	templateUrl:'./main-material.html',
	styleUrls: ['./main-material.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
	 '(window:resize)': 'onResize($event)'
	}
})

export class MainComponent implements OnInit, OnDestroy {

	currentUrl            : any;
	root                  : any = 'ltr';
	layout                : any = 'ltr';
	currentLang           : any = 'en';
	customizerIn          : boolean = false;
	showSettings          : boolean = false;
	chatpanelOpen         : boolean = false;
	sidenavOpen           : boolean = true;
	isMobile              : boolean = false;   
	isFullscreen          : boolean = false;
	collapseSidebarStatus : boolean;
	header                : string;
	dark                  : boolean;
	compactSidebar        : boolean;
	isMobileStatus        : boolean;
	sidenavMode           : string = 'side';
	popupDeleteResponse   : any;
	sidebarColor          : any;
	url                   : string;
	windowSize            : number;
	private _routerEventsSubscription  : Subscription;
	private _router                    : Subscription;
	@ViewChild('sidenav',{static : true}) sidenav;

	isLoggedIn = false;


	constructor(public menuItems: MenuItems, 
					private pageTitleService: PageTitleService, 
					public translate: TranslateService, 
					private router: Router,
					public coreService : CoreService,
					private routes :Router,
					private activatedRoute: ActivatedRoute,
					private authService: AuthService ) {


this.authService.loginChanged.subscribe(loggedIn => {
	this.isLoggedIn = loggedIn;
	});
}

	ngOnInit() {

		this.authService.isLoggedIn().then(loggedIn => {
			this.isLoggedIn = loggedIn;
			}) ;
	
		this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
		this.pageTitleService.title.subscribe((val: string) => {
			this.header = val;
		});

		this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
			this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
			this.url = event.url;
			this.customizeSidebar();
		});
		this.url = this.router.url;
		this.customizeSidebar();
	  
		setTimeout(()=>{ 
			this.windowSize = window.innerWidth;
			this.resizeSideBar();
		},0)


		this._routerEventsSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd && this.isMobile) {
				this.sidenav.close();
			}
		});
	}

	ngOnDestroy() {
		this._router.unsubscribe();
	}
	 
	/**
	  *As router outlet will emit an activate event any time a new component is being instantiated.
	  */
	onActivate(e, scrollContainer) {
		scrollContainer.scrollTop = 0;
	}

	/**
	  * toggleFullscreen method is used to show a template in fullscreen.
	  */
	toggleFullscreen() {
		if (screenfull.enabled) {
			screenfull.toggle();
				this.isFullscreen = !this.isFullscreen;
		}
	}
	
	/**
	  * customizerFunction is used to open and close the customizer.
	  */
	customizerFunction() {
		this.customizerIn = !this.customizerIn;
	}

	/**
	  * addClassOnBody method is used to add a add or remove class on body.
	  */
	addClassOnBody(event) {
		var body = document.body;
		if(event.checked){
			body.classList.add("dark-theme-active");
		}else{
			body.classList.remove('dark-theme-active');
		}
	}

	toggleSidebar() {
		this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
	}

	login() {
		this.authService.login();
	}
	
	  logout() {
		this.authService.logout();
	}
	
	collapseSidebar(event){
		document.getElementById('main-app').classList.toggle('collapsed-sidebar');
	}

	//onResize method is used to set the side bar according to window width.
	onResize(event){
		this.windowSize = event.target.innerWidth;
		this.resizeSideBar();
	}   

	//customizeSidebar method is used to change the side bar behaviour.
	customizeSidebar(){
		if(window.innerWidth<1200){
			this.coreService.sidenavMode = 'over';  
			this.coreService.sidenavOpen = false;
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++){
				if(!(main_div[i].classList.contains('sidebar-overlay'))){
					document.getElementById('main-app').className += " sidebar-overlay";
				}
			}
		}
	}

	//To resize the side bar according to window width.
	resizeSideBar(){
		if(this.windowSize < 1200){
			this.isMobileStatus = true;
			this.isMobile = this.isMobileStatus;
			this.coreService.sidenavMode = 'over';  
			this.coreService.sidenavOpen = false;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++){
				if(!(main_div[i].classList.contains('sidebar-overlay'))){
					if(document.getElementById('main-app')) {
					  document.getElementById('main-app').className += " sidebar-overlay";
					}
				}
			}
		}
		else{
			this.isMobileStatus = false;
			this.isMobile = this.isMobileStatus;
			this.coreService.sidenavMode = 'side';
			this.coreService.sidenavOpen = true;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++){
				if(main_div[i].classList.contains('sidebar-overlay')){
					document.getElementById('main-app').classList.remove('sidebar-overlay');
				}
			}
		}
	}
}


