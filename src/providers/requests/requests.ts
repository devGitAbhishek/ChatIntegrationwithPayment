import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnRequest } from '../../app/models/interfaces/request';
import firebase from 'firebase'; 
import { UsersProvider } from '../users/users';
import{Events} from 'ionic-angular';
/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {
  firedata =firebase.database().ref('/requests');
  userDetails =[];
  constructor(public http: HttpClient,public userService :UsersProvider, public events : Events) {
    console.log('Hello RequestsProvider Provider');
  }


  sendRequest(req: ConnRequest){
    var promise = new Promise((resolve,reject)=>{
      this.firedata.child(req.recipient).push({
        sender: req.sender
      }).then(()=>{
        resolve({success : true});
      })/*.catch((err)=>{
        resolve(err);
      })*/
    })
    return promise;
  }

  getMyRequests(){
    let allMyRequest;
    var myRequests=[];
    this.firedata.child(firebase.auth().currentUser.uid).on('value' ,(snapshots)=>{
      allMyRequest = snapshots.val();
      myRequests=[];
      for(var i in allMyRequest){
        myRequests.push(allMyRequest[i].sender);
      }
      this.userService.getAllUser().then((res)=>{
        var allUsers = res;
        this.userDetails=[];
        for(var j in myRequests){
          for(var key in allUsers){
            if(myRequests[j]=== allUsers[key].uid){
              this.userDetails.push(allUsers[key]);
            }
          }
        }  
        this.events.publish('gotrequests');
      })
    })
  }



}
