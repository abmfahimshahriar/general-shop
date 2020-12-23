import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  @Output() login = new EventEmitter<any>();
  @Output() signUp = new EventEmitter<any>();
  hide = true;
  minLength = 6;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthModalComponent>,
  ) { }

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(this.minLength)]]
  });

  signUpForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(this.minLength)]]
  });

  onLogin() {
    this.login.emit(this.loginForm);
  }

  onSignUp() {
    this.signUp.emit(this.signUpForm);
  }
  
  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
