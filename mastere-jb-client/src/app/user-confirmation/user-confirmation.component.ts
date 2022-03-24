import { HttpClientService } from './../service/httpclient.service';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;

  constructor(public dialogRef: MatDialogRef<UserConfirmationComponent>,
    private authService: HttpClientService) { }

  ngOnInit() {
  }

  onSubmit() {
     this.dialogRef.close();
}

}
