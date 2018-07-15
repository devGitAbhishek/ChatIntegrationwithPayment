import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UsersProvider } from '../../providers/users/users';
/**
 * Generated class for the ProfilepicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl='https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public imgService :ImghandlerProvider,public zone :NgZone,
  public userservice :UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }
  chooseImage(){
    this.imgService.uploadImage().then((uploadedURL :any)=>{
        this.zone.run(()=>{
          this.imgurl=uploadedURL;
          this.moveon=false;
        })
    })
  }

  proceed(){
    this.navCtrl.setRoot('TabsPage');
  }

  updateProceed(){
    debugger;
this.userservice.updateImage(this.imgurl).then((res:any)=>{
if(res.success){
  this.navCtrl.setRoot('TabsPage');
}else{
  alert(res);
}
})
  }
}
