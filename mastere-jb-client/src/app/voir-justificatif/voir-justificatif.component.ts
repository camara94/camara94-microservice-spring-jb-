import { Component,OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-voir-justificatif',
  templateUrl: './voir-justificatif.component.html',
  styleUrls: ['./voir-justificatif.component.scss']
})
export class VoirJustificatifComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VoirJustificatifComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject('baseURL') public baseURL) {}

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
      console.debug("Scroll Event");
    }

}
