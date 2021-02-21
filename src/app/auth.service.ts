import { dependenciesFromGlobalMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { UserProfile, Users, Games } from './models/user-profile.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private gamesRef: AngularFirestoreCollection<Games>;
  private usersRef: AngularFirestoreCollection<Users>;

  userExist: Observable<boolean>;

  constructor(private router:Router, private afAuth: AngularFireAuth, private afs:AngularFirestore) {
    this.gamesRef = afs.collection('games');
    this.usersRef = afs.collection('users');
   }

  ngOnInit(): void {
  }

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private loggedInToken = JSON.parse(localStorage.getItem('loggedIn') || 'false');


  setLoginStatus(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }


  get LoginStatus() {
    return localStorage.getItem('loggedIn') || this.loggedInStatus.toString(); 
  }

  setUserUidObj(uid: any){
    localStorage.setItem('userIdObj',JSON.stringify(uid));
  }

  get UserUidObj(){
    return JSON.parse(localStorage.getItem('userIdObj')); 
  }

  removeUserUidObj(){
    localStorage.removeItem('userIdObj');
  }

  setUserUid(uid: string){
    localStorage.setItem('userId', uid);
  }
  get UserUid() {
    return localStorage.getItem('userId'); 
  }
  setLoginToken(value: boolean) {
    this.loggedInToken = value;
    localStorage.setItem('loggedInToken', 'true');
  }

  get LoginToken() {
    return localStorage.getItem('loggedInToken') || this.loggedInToken.toString(); 
  }

  removeToken(){
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInToken');
  }
  

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn(){    
    return !!this.afAuth.auth.currentUser;
  }

  async CreateUserDocument(){
    // get the current user
      const user =  this.afAuth.auth.currentUser;

    // create the object with new data
    const userProfile : UserProfile = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role : 'user',
      level: 3
    }
    // write to cloud firestore
      return  this.afs.doc(`users/${user.uid}`).set(userProfile);
  }

  updateUserDocument(userProfile: UserProfile){
    return this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
  }

  async CreateNewGameDocument(payload:any){
    return  this.afs.doc(`games`).set(payload);
  }

   getAllGames(): AngularFirestoreCollection<Games>{
    return this.gamesRef;
  }

  // async UpdateGame(){
  //   return this.afs.doc(`games`).update({})
  // }
  
  addIteminInCollection(collection: string, payload:any){
// const summary = {...person, ...tools}
    const obj = {
      ...{players:[], waiting:[],teams:[]},
      ...payload
    }
   if(collection === 'users'){
    this.usersRef.add(obj);
   }else{
    this.gamesRef.add(obj);
   }
  }

  updateIteminInCollection(collection: string, payload:any, id: string){
    if(collection === 'users'){
      this.usersRef.doc(id).update(payload);
    }else{
      this.gamesRef.doc(id).update(payload);
    }
   }

  //  addItemToArrayInDoc(collection: string, id: string, arrayName:string, payload:any){
  //    let field = arrayName;
  //   if(collection === 'users'){
  //     this.usersRef.doc(id).get().toPromise().then((res) => {
  //       this.usersRef.doc(id).update({field:[...res.data().field,payload]});
  //      }).catch(error => console.log(error));
  //   }else{
  //     debugger;
  //     this.gamesRef.doc(id).get().toPromise().then((res) => {
  //       this.gamesRef.doc(id).update({field:[...res.data().field,payload]});
  //      }).catch(error => console.log(error));
  //   }
  //  }

async addItemToArrayInGamesPlayersDoc(id: string, payload:any){
  this.gamesRef.doc(id).get().toPromise().then((res) => {
    this.gamesRef.doc(id).update({players:[...res.data().players,payload]});
   }).catch(error => console.log(error));
}
async addItemToArrayInGamesWaitingDoc(id: string, payload:any){
  this.gamesRef.doc(id).get().toPromise().then((res) => {
    this.gamesRef.doc(id).update({waiting:[...res.data().waiting,payload]});
   }).catch(error => console.log(error));
}

async removeItemFromArrayInGamesPlayersDoc(id: string, itemToRemove: string){
  this.gamesRef.doc(id).get().toPromise().then((res) => {
    const updatedPlayers = res.data().players.filter(item => item.uid !== itemToRemove);
    this.gamesRef.doc(id).update({players:updatedPlayers});
  }).catch(error => console.log(error));
 }

 async removePlayerFromGame(id: string, itemToRemove: string, payload: any){
  this.gamesRef.doc(id).get().toPromise().then((res) => {
    const updatedPlayersAfterRemove = res.data().players.filter(item => item.uid !== itemToRemove);
    const updatedPlayersAdding = [...updatedPlayersAfterRemove, payload ];
    const updatedWaiting = res.data().waiting.slice(1);
    this.gamesRef.doc(id).update({players: updatedPlayersAdding, waiting: updatedWaiting});

  }).catch(error => console.log(error));
 }

 
 async removeItemFromArrayInGamesWaitingDoc(id: string, itemToRemove: string){
  this.gamesRef.doc(id).get().toPromise().then((res) => {
    const updatedWaiting = res.data().waiting.filter(item => item.uid !== itemToRemove);
    this.gamesRef.doc(id).update({waiting:updatedWaiting});
  }).catch(error => console.log(error));
}

isUserRegistered(docId: string, userId: string){
  let exist = 0;
  this.gamesRef.doc(docId).get().toPromise().then((res) => {
     exist = res.data().waiting.filter(item => item.uid !== userId);
    if (exist > 0 ) this.userExist = of(true);
    else this.userExist = of(false);
  }).catch(error => console.log(error));

}
getGameById(id){
  return this.gamesRef.doc(id).get();
}

getUserById(id){
  return this.usersRef.doc(id).get();
}
// removeItemFromArrayInDoc(id: string, arrayName:string, field:string, payload:any, itemToRemove: string){
//   this.gamesRef.doc(id).get().toPromise().then((res) => {
//       const updatedPlayers = res.data().arrayName.filter(item => item.field !== itemToRemove);
//       this.gamesRef.doc(id).update({arrayName:updatedPlayers});
//     }).catch(error => console.log(error));
// }

}




// https://bezkoder.com/angular-11-firestore-crud-angularfirestore/