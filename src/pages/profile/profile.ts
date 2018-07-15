import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { rootRenderNodes } from '@angular/core/src/view';
import firebase from 'firebase';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
avatar: string;
displayName : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService : UsersProvider,public zone :NgZone,public alert :AlertController,public imgHandler :ImghandlerProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProfilePage');
    this.loadUserDetails();
  }
  loadUserDetails(){
    debugger;
    this.userService.getUserDetails().then((res:any)=>{
      this.displayName =res.displayName;
      console.log(res.displayName+'>>>>>' + res.photoURL);
      this.zone.run(()=>{
        this.avatar=res.photoURL;
      }) 

    })
  }

  editImage(){

    let statusAlert=this.alert.create({
      buttons:['okay']
    });
        this.imgHandler.uploadImage().then((url:any)=>{
          this.userService.updateImage(url).then((res:any)=>{
            if(res.success){
              statusAlert.setTitle('Updated');
              statusAlert.setSubTitle('Your Profile Picture has been changed successfully');
              statusAlert.present();
              this.zone.run(()=>{
                this.avatar=  url;
              })
            }
                
          }).catch((err)=>{
            statusAlert.setTitle('Failed');
            statusAlert.setSubTitle('Something went wrong while uploading image!');
            statusAlert.present();
          })
             
            })
          }
      

  editName(){
    let statusAlert=this.alert.create({
      buttons:['okay']
    });
    
    let alert=this.alert.create({
      title:'Edit Nickname',
      inputs:[
        {
          name:'nickname',
          placeholder:'Nickname'
        }
      ],
      buttons:[{
        text:'Cancel',
        role:'cancel',
        handler:data=>{

        }
      },
   
      {
        text:'Edit',
        handler:data=>{
          if(data.nickname){
            this.userService.updatedDisplayName(data.nickname).then((res:any)=>{
              if(res.success){
                statusAlert.setTitle('Updated');
                statusAlert.setSubTitle('Your Nickname has been changed successfully');
                statusAlert.present();
                this.zone.run(()=>{
                  this.displayName=  data.nickname;
                })
              }
                   else{
                    statusAlert.setTitle('Failed');
                    statusAlert.setSubTitle('Something went wrong while changing name!');
                    statusAlert.present();
                   }
            })
          }
        }
      }]
    });
    alert.present();
  }

  logout(){
    firebase.auth().signOut().then(()=>{
this.navCtrl.parent.parent.setRoot('LoginPage');
    })
  }

}
