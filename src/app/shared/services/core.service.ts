import { Injectable } from '@angular/core';

export interface ChildrenItems {
	state: string;
	name: string;
	type?: string;
  }
  
  export interface Menu {
	state: string;
	name: string;
	type: string;
	icon: string;
	children?: ChildrenItems[];
  }

@Injectable({
	providedIn: 'root'
})

export class CoreService {

	collapseSidebar: boolean = false;
	collapseSidebarStatus: boolean;
	sidenavMode: string = "side";
	sidenavOpen: boolean = true;
	horizontalSideNavMode: string = "over";
	horizontalSideNavOpen: boolean = false;
}