import { SendEmailService } from './../service/send-email.service';
import { EmailTemplate } from './../shared/emailTemplate';
import { Notification } from './../shared/notification';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-envoyer-notication',
  templateUrl: './envoyer-notication.component.html',
  styleUrls: ['./envoyer-notication.component.scss']
})
export class EnvoyerNoticationComponent implements OnInit {
  sendNotificationForm: FormGroup;
  emailTemplate: EmailTemplate;
  donnee: string;
  email: string;

  formErrors = {
    'sendTo': '',
    'subject': '',
    'body': '',
  };

  validationMessages = {
    'sendTo': {
      'required':      'L\'é-mail est requis.',
      'email':         'L\'é-mail n\'est pas au format valide.'
    },
    'subject': {
      'required':      'Le sujet est requis.',
      'minlength':     'Le sujet ne doit pas être moins que 4 caractères.',
      'maxlength':     'Le sujet ne doit pas être plus que 15 caractères.'
    },
    'body': {
      'required':      'Le corps du message est requis.',
      'minlength':     'Le corps du message  ne doit pas être moins que 6 caractères.',
      'maxlength':     'Le corps du message ne doit pas être plus que 500 caractères.'
    }
  };

  @ViewChild('fform', {static: false}) sendNotificationFormDirective;
  constructor(
    public dialogRef: MatDialogRef<EnvoyerNoticationComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sendEmailService: SendEmailService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.sendNotificationForm = this.formBuilder.group({
      sendTo: '',
      subject : 'Dossier incomplet',
      body: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(510) ] ]
    });
    this.sendNotificationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.sendNotificationForm) { return; }
    const form = this.sendNotificationForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.emailTemplate = this.sendNotificationForm.value;
    this.envoyer( this.emailTemplate);
    this.sendNotificationFormDirective.resetForm();
  }

  envoyer( emailTemplate: EmailTemplate ) {
    console.log('dossier TMEP: ', this.emailTemplate);
    this.sendEmailService
        .sendTo( emailTemplate )
        .subscribe( data => this.donnee = data, error => console.error( error )  );
  }
}
