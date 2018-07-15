import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usercreds } from '../../app/models/interfaces/usercred';
import {AngularFireAuth} from 'angularfire2/auth' ;


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(public http: HttpClient , public afireauth : AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }
  login(usercred : usercreds){
    var promise = new Promise((resolve , reject)=>{
         this.afireauth.auth.signInWithEmailAndPassword(usercred.email , usercred.password).then(()=>{
            resolve(true);
         }).catch((err)=>{
             reject(err);
         })
    })
    return promise;
  }

}
