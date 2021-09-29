import { NgxPermissionsStore } from 'ngx-permissions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PermissionService {
    constructor(private ngxPermissionStore: NgxPermissionsStore) {}

    public hasPermission(permissions: string | string[]): boolean {
        if (permissions == null)
        {
            return true;
        }
        if (!this.ngxPermissionStore.permissionsSource.value) {
            return false;
        }

        if (permissions.constructor === String) {
            permissions = [permissions as string];
        }

        return (permissions as string[]).some((ele) =>
            Object.keys(
                this.ngxPermissionStore.permissionsSource.value
            ).includes(ele)
        );
    }
}
