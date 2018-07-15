import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';



/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
firedata =firebase.database().ref('/shopping');
  constructor(public http: HttpClient,public fire2auth : AngularFireAuth) {
    console.log('Hello UsersProvider Provider');
  }

  addUser(newUser:any){
    var promise =new Promise ((resolve,reject)=>{
      this.fire2auth.auth.createUserWithEmailAndPassword(newUser.email,newUser.password).then(()=>{
        this.fire2auth.auth.currentUser.updateProfile({
          displayName: newUser.displayName,
          photoURL:'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        }).then(()=>{
          this.firedata.child(this.fire2auth.auth.currentUser.uid).set({
            uid: this.fire2auth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL:'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
          })
        }).then(()=>{
          resolve({success :true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

passwordReset(email){
  var promise =new Promise((resolve,reject)=>{
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
      resolve({success :true});
    }).catch((err)=>{
      reject(err);
    })
  })
  return promise;
}

updateImage(imgUrl){
var promise = new Promise((resolve, reject)=>{
  this.fire2auth.auth.currentUser.updateProfile({
displayName: this.fire2auth.auth.currentUser.displayName,
photoURL:imgUrl,
  }).then(()=>{
firebase.database().ref('/shopping' + firebase.auth().currentUser.uid).update({
  displayName :this.fire2auth.auth.currentUser.displayName,
  photoURL:imgUrl,
  uid:firebase.auth().currentUser.uid
}).then(()=>{
  resolve({success:true});
}).catch((err)=>{
  reject(err);
})
  })
})
return promise;
}

getUserDetails(){
  var promise = new Promise((resolve,reject)=>{
      this.firedata.child(firebase.auth().currentUser.uid).once('value' ,(snapshot)=>{
        resolve(snapshot.val());
      }).catch((err)=>{
        reject(err);
      })   
  })
  return promise;
}

updatedDisplayName(newName){
  var promise = new Promise((resolve, reject)=>{
    this.fire2auth.auth.currentUser.updateProfile({
    displayName: newName,
     photoURL:this.fire2auth.auth.currentUser.photoURL
    }).then(()=>{
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName:newName,
        photoURL:this.fire2auth.auth.currentUser.photoURL,
        uid:this.fire2auth.auth.currentUser.uid
      }).then(()=>{
          resolve({success : true});
      }).catch((err)=>{
        reject(err);
      })
    }).catch((err)=>{
      reject(err);
    })
  })
  return promise;
}


getAllUser(){
  var promise = new Promise((resolve,reject)=>{
    this.firedata.orderByChild('uid').once('value',(snapshot)=>{
      let userData=snapshot.val();
      let temapArr=[];
      for(var key in userData){
        temapArr.push (userData[key]);
      }
      resolve(temapArr);
    }).catch((err)=>{
      reject(err);
    })
  })
  return promise;
}

}
