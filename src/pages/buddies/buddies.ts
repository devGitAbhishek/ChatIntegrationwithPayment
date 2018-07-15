import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ConnRequest } from '../../app/models/interfaces/request';
import firebase from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';
/**
 * Generated class for the BuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
filteredUsers =[];
tempArr =[];
newRequests= {} as ConnRequest;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService : UsersProvider, public alertCtrl: AlertController,
                          public reqService : RequestsProvider) {
    this.userService.getAllUser().then((res:any)=>{
      this.filteredUsers= res;
      this.tempArr= res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddiesPage');
  }

  searchUser(searchbar){
this.filteredUsers =this.tempArr;
var q =searchbar.target.value;
if(q.trim()== ''){
  return ;
}
this.filteredUsers=this.filteredUsers.filter((v)=>{
  if(v.displayName.toLowerCase().indexOf(q.toLowerCase()) >-1)  {
    return true;
  }
  return false;
})
  }

  sendReq(recipient){
    this.newRequests.sender= firebase.auth().currentUser.uid;
    this.newRequests.recipient =recipient.uid;
    if(this.newRequests.sender=this.newRequests.recipient){
           let statusAlert =this.alertCtrl.create({
             title:'Dont send it to yourself',
             subTitle:' You are always your friend',
             buttons :['ok']
           })
    }else{
      let successAlert =this.alertCtrl.create({
        title:'Request Sent',
        subTitle:' Your request was sent to '+recipient.displayName,
        buttons :['ok']
    })
 
  this.reqService.sendRequest(this.newRequests).then((res: any)=>{
    if(res.success){
      successAlert.present();
      let sentUser = this.filteredUsers.indexOf(recipient);
      this.filteredUsers.splice(sentUser,1);
    }
  }).catch((err)=>{
    alert(err);
  })
}
}
}
