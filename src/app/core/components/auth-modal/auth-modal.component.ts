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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthModalComponent>,
  ) { }

  loginForm = this.fb.group({
    Email: ['',[Validators.required]],
    Password: ['',[Validators.required]]
  });

  signUpForm = this.fb.group({
    Email: ['',[Validators.required]],
    Password: ['',[Validators.required]]
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
