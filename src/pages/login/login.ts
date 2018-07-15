import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usercreds } from '../../app/models/interfaces/usercred';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials ={} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams, public customAuth : AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

signin(){
  this.customAuth.login(this.credentials).then((res : any)=>{
          if(!res.code){
            this.navCtrl.setRoot('TabsPage');
          }
          else{
            alert(res);
          }
  })
}

signUp(){
  this.navCtrl.setRoot('SignupPage');
}

passwordReset(){
  this.navCtrl.push('PasswordresetPage'); 
}

}
