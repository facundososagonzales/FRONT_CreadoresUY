import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public idUser: string;
  public message: string;
  public errorMessage: any;
  public usuarios = [1, 2, 3, 4]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }




}
