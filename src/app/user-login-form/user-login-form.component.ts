import { Component, Input, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService  } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''}

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) {
     { }
   }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Set the user info in localStorage
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
         this.dialogRef.close(); // This will close the modal on success!
         this.snackBar.open(result, 'OK', {
            duration: 2000
         });
        }, (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000
          });
        });
      }
  

}
