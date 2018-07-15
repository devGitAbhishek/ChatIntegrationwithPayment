import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl : AlertController,public userService : UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  reset(){
let alert =this.alertCtrl.create({
  buttons : ['Ok']
});
this.userService.passwordReset(this.email).then((res: any)=>{
  if(res.success){
    alert.setTitle('Email Sent');
    alert.setSubTitle('Please follow the isntructions to reset your password');
  }
 
}).catch((err)=>{
  alert.setTitle('Failed');
  alert.setSubTitle(err);
})
  }

goBack(){
  this.navCtrl.setRoot('LoginPage');
}
}
