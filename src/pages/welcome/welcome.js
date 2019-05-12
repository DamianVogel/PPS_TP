var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, nativeAudio) {
        this.navCtrl = navCtrl;
        this.nativeAudio = nativeAudio;
        this.splash = true;
        this.nativeAudio.preloadSimple('uniqueId1', 'assets/sounds/2019_TP_PPS_Comanda.mp3').then(function (msg) { }, function (error) { });
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.splash = false;
            _this.nativeAudio.play('uniqueId1');
        }, 7000);
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    WelcomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-welcome',
            templateUrl: 'welcome.html'
        }),
        __metadata("design:paramtypes", [NavController, NativeAudio])
    ], WelcomePage);
    return WelcomePage;
}());
export { WelcomePage };
//# sourceMappingURL=welcome.js.map