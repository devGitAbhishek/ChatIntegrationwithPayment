import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {FileChooser} from '@ionic-native/file-chooser';
import {FilePath} from '@ionic-native/file-path';
/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {
nativepath: any;
reslt :any;
firestore = firebase.storage();
  constructor(public http: HttpClient,public fileChooser : FileChooser,public filePath: FilePath) {
    console.log('Hello ImghandlerProvider Provider');
  }

    uploadImage(){
      var promise = new Promise((resolve,reject)=>{
        this.fileChooser.open().then((url)=>{
          debugger;
          this.reslt = url;
          (<any>window).FilePath.resolveNativePath(this.reslt,(res)  =>{
                     this.nativepath =res;
                     (<any>window).resolveLocalFileSystemURL(this.nativepath,(res)=>{
                          res.file((resFile)=>{
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = (evt:any)=>{
                              var imgBlob = new Blob([evt.target.result] , {type:'image/jpeg'});
                              var imgStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                              imgStore.put(imgBlob).then((res)=>{
                                this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url)=>{
                                        resolve(url);
                                }).catch((err)=>{
                                  reject('upload failed' +err);
                                })
                                alert('Upload success');

                              }).catch((err)=>{
                                alert('upload failed' +err);
                              })
                            }
                          })
                    })
              })
        })
      
      })
      return promise;
    }


}
