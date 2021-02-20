import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { UserProfile } from '../models/user-profile.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: any;
  error: string;
  post: any = '';
  loading = false;
  errorMessage = "";
  userName: string;
  userEmail: string;
  isShow = false;

  downloadedUrl : Observable<string>;
  uploadProgrress: Observable<number>;


  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;
  uid: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private formBuilder: FormBuilder,
     private route: ActivatedRoute, private router: Router, private auth: AuthService, private afStorage: AngularFireStorage) { 
       this.uid = this.route.snapshot.paramMap.get('id');
       this.afStorage.ref(`users/${this.uid}/profile-image`).getDownloadURL().subscribe( userImage =>{
        this.downloadedUrl = userImage;
       });
     }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userName: [this.userName, [Validators.required]],
      email: [this.userEmail],
    });

    this.itemDoc = this.afs.doc<UserProfile>(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
    this.item.subscribe(it => {

      // TODO - fix refresh load data
      this.userForm.patchValue({
        userName: it.name,
        email : it.email
      });
    });
    
    this.loading = false;
  }

  async onUpdate(){
    this.loading = true;
    const { userName, email } = this.userForm.value;

    const userProfile: UserProfile = {
      uid: this.uid,
      email:email,
      name: userName
    }

    try{
      await this.auth.updateUserDocument(userProfile);
      }catch(error){
        console.log(error);
        this.errorMessage = error;
    }
  }

  back(){
    this.router.navigate(["/games/delete"]);
  }

  fileChange(event){
    // TODO - fix uploading image
    this.downloadedUrl = null;
    const file = event.target.files[0];
    const filePath = `users/${this.uid}/profile-image`;

    const fileRef = this.afStorage.ref(filePath)

    const task = this.afStorage.upload(filePath, file);
    task.catch(error => console.log(error));
    this.isShow = true;
    this,this.uploadProgrress = task.percentageChanges();

    task.snapshotChanges()
    .pipe(
      finalize(()=> {
        this.downloadedUrl = fileRef.getDownloadURL();
        this.isShow = false;
      })
    ).subscribe();

  }

}
