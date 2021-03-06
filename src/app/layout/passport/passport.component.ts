import { Component } from '@angular/core';

@Component({
    selector: 'layout-passport',
    template: `
        <div class="container">
            <div class="top">
                <div class="head">
                    <a [routerLink]="['/']">
                        <img class="logo" src="./assets/img/logo.svg">
                        <span class="title">轨迹管理系统</span>
                    </a>
                </div>
            </div>
            <router-outlet></router-outlet>
            <global-footer [links]="links">
                <ng-template #copyright>
                    Copyright <nz-icon nzType="copyright"></nz-icon> 2018 <a href="http://www.cnic.cas.cn/" target="_blank">cnic</a>出品
                </ng-template>
            </global-footer>
        </div>
    `,
    styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent {
    links = [];
}
