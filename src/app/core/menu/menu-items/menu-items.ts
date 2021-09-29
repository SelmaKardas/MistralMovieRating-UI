import { Injectable } from '@angular/core';
import { PermissionService } from 'app/core/auth/permissions.service';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  permission: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  permission: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/top-movies',
    name: 'TopRatedMovies',
    type: 'link',
    icon: 'explore',
    permission: null,
    
  },
  {
    state: '/rating',
    name: 'MoviesList',
    type: 'link',
    icon: 'explore',
    permission: null,
  },
  {
    state: '/rating/me',
    name: 'MyMoviesList',
    type: 'link',
    icon: 'explore',
    permission: 'Rating.Create',
  }
];

@Injectable()
export class MenuItems {
  constructor(private permissionsService: PermissionService) {
	}
  async getAll(): Promise<Menu[]> {
    let items = MENUITEMS;
    let allowedItems = [];
    for(var item of items) {
      var allowed = this.permissionsService.hasPermission(item.permission);
      if (allowed) {
        allowedItems.push(item);
      }
    }
    return allowedItems;
  }
}

