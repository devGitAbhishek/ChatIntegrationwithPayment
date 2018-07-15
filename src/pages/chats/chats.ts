import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
myRequest;
  constructor(public navCtrl: NavController, public navParams: NavParams,public reqService :RequestsProvider,public events :Events) {
  }

  ionViewWillEnter() {
    this.reqService.getMyRequests();
    this.events.subscribe('gotrequests',()=>{
      this.myRequest =[];
      this.myRequest=this.reqService.userDetails;
    })
  }

  ionViewDidLeave() {
   this.events.unsubscribe('gotrequests');
  }
  addBuddy(){
    this.navCtrl.push('BuddiesPage');
  }
}
