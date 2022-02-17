import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //debe ser pública porque se adjuntará al template (angular sólo enlaza a propiedades públicas de los componentes)
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

}
