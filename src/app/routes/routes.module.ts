import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import {NGXLogger} from 'ngx-logger';
import {Exception403Component} from './exception/403.component';
import {Exception404Component} from './exception/404.component';
import {Exception500Component} from './exception/500.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    imports: [ SharedModule, RouteRoutingModule ],
    declarations: [
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        // single pages
        Exception403Component,
        Exception404Component,
        Exception500Component,
        WelcomeComponent,
    ],
    providers: [
        NGXLogger
    ]
})

export class RoutesModule {}
