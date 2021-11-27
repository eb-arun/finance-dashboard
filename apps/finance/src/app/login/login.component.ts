import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'finance-dashboard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username= new FormControl('', [Validators.required])
    password = new FormControl('', [Validators.required])

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
 
  authLogin() {
    this.route.navigate(['/dashboard']);
  }
 
}
