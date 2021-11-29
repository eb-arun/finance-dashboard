import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'finance-dashboard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username= new FormControl('', [Validators.required])
    password = new FormControl('', [Validators.required])
    fires:Subscription | undefined;
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
  constructor(private route:Router, private afs: AngularFirestore, private dataService:DataServiceService) { }

  ngOnInit(): void {
  }
 
  authLogin() {
    this.fires = this.afs.collection('login', ref=> ref.where('username', '==', this.username.value).where('password', '==', this.password.value)).valueChanges().subscribe(res=> {
      if(res.length == 1){
        this.makeActive(this.username.value);
      } else {
        alert('Invalid Login')
      }
    })
    
  }

  makeActive(username:any) {
    this.dataService.userName.next(username);
    this.fires?.unsubscribe();
    this.route.navigate(['/dashboard']);
    // this.afs.doc(`login/${username}`).update({'active':true}).then(()=> {
      
    // });
  }
 
}
