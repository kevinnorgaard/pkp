import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('hideShow', [
      state('hide', style({
        background: 'none'
      })),
      state('show', style({
        background: 'white'
      })),
      transition('hide => show', [
        animate('.15s')
      ]),
      transition('show => hide', [
        animate('0s')
      ])
    ]),
    trigger('toggle', [
      state('on', style({
        transform: 'rotate(-180deg)'
      })),
      state('off', style({
        transform: 'rotate(0)'
      })),
      transition('on => off', [
        animate('300ms ease-out')
      ]),
      transition('off => on', [
        animate('300ms ease-in')
      ])
    ]),
    trigger('spin', [
      state('on', style({
        transform: 'rotate(-360deg)'
      })),
      state('off', style({
        transform: 'rotate(0)'
      })),
      transition('on => off', [
        animate('300ms ease-out')
      ]),
      transition('off => on', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
  @Input() headerDisplay: boolean;
  isCollapsed = true;
  spin = true;

  getBackground() {
    return this.headerDisplay || !this.isCollapsed ? 'show' : 'hide';
  }

  getColor() {
    return this.headerDisplay || !this.isCollapsed ? 'black' : '#a6a6a6';
  }

  mode() {
    return environment.mode;
  }
}
