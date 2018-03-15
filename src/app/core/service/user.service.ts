import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AppService, server} from './app.service';
import {HttpRes} from '../model/http-res';
import {isString} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '@delon/theme';
import {NzModalService} from 'ng-zorro-antd';
import {ReuseTabService} from '@delon/abc';
import * as moment from 'moment';

@Injectable()
export class UserService {
    private readonly userKey = 'user';
    private storage: Storage = localStorage;


    constructor(private http: HttpClient, private appService: AppService, private settingsService: SettingsService,
                private router: Router, private route: ActivatedRoute, private modalSrv: NzModalService,
                private reuseTabSrv: ReuseTabService) {
    }

    login(account: string, password: string, success: Function, fail: Function): void {
        this.http.post(server.apis.noAuth.login, {
            account: account,
            password: password
        }).subscribe((res: HttpRes) => {
                if (server.successCode === res.code) {
                    const user = res.data.user;
                    user.token = res.data.token;
                    // 设置登录系统时间
                    user.loginSysTime = moment().format('YYYY-MM-DD HH:mm:ss');
                    this.setUser(user);
                    this.appService.onlineError = false;
                    success();
                } else {
                    fail();
                }
            });
    }

    logout(redirectUrl?: string) {
        // clear cache
        // localStorage.clear();
        this.removeUser();
        this.router.navigate(['passport/login'], {
            queryParams: {redirectUrl: redirectUrl || this.router.url},
            relativeTo: this.route
        });
        setTimeout(() => {
            this.reuseTabSrv.clear();
        }, 500);
    }

    needLogin() {
        this.errorMask('已注销,请重新登录', () => this.logout());
    }

    timeout() {
        this.errorMask('会话超时,请重新登录', () => this.logout());
    }

    errorMask(content: string, onOk: () => void) {
        if (!this.appService.onlineError) {
            this.appService.onlineError = true;
            this.modalSrv.error({
                title: '错误',
                closable: false,
                content: content,
                maskClosable: false,
                okText: '确定',
                onOk: onOk
            });
        }
    }

    isLogin(): boolean {
        return isString(this.getUser().token);
    }

    getTokenHeader(): any {
        const header = {};
        const token = this.appService.getTokenConfig();
        if (token.header) {
            header[`${token.header}`] = `${token.head}${this.getToken()}`;
        }
        return header;
    }

    getTokenQuery(): any {
        const params = {};
        const token = this.appService.getTokenConfig();
        if (token.header) {
            params[`${token.queryParam}`] = `${token.head}${this.getToken()}`;
        }
        return params;
    }

    setUser(user: any) {
        user = Object.assign(this.getUser(), user);
        this.settingsService.setUser(user);
        this.storage.setItem(this.userKey, JSON.stringify(user));
    }

    private removeUser() {
        this.storage.removeItem(this.userKey);
    }

    getUser(): any {
        const userStr = this.storage.getItem(this.userKey);
        if (userStr) {
            return JSON.parse(userStr);
        }
        return {};
    }

    private getToken(): string {
        return this.getUser().token || '';
    }
}
