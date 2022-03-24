import { MentionService } from './../service/mention.service';
import { Mention } from './../shared/mention';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-mention',
  templateUrl: './list-mention.component.html',
  styleUrls: ['./list-mention.component.scss']
})
export class ListMentionComponent implements OnInit {

  mentions: Mention[];

  constructor(private mentionService: MentionService) { }

  ngOnInit() {
    this.mentionService
        .getMentions()
        .subscribe( data => this.mentions = data, error => console.error( error ) );
  }

}
