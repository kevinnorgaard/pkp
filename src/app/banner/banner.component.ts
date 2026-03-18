import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: false,
})
export class BannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  mode(): string {
    return environment.mode;
  }
}
