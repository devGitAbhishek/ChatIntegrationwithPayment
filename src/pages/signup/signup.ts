import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
newUsers={
  email:'',
  displayName:'',
  password:''
}
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UsersProvider,
  public lodCtrl: LoadingController,public toaster : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

signUp(){
var toast=this.toaster.create({
  duration: 3000,
  position: 'bottom'
});

if(this.newUsers.email== '' || this.newUsers.password == '' || this.newUsers.displayName == ''){
  toast.setMessage('No fields can be empty!');
  toast.present();
}
  else if(this.newUsers.password.length<7){
    toast.setMessage('There should be minimum 7 characters');
    toast.present();
}else{
  let load = this.lodCtrl.create({
                 content:'Please Wait!'
  });
  load.present();
this.userService.addUser(this.newUsers).then((res: any)=>{
  debugger;
  load.dismiss();
  if(res.success){
    debugger;
    this.navCtrl.push('ProfilepicPage');
  }else{
    alert('ERROR');
  }
})
}
}
goBack(){
  this.navCtrl.setRoot('LoginPage');
}

}
