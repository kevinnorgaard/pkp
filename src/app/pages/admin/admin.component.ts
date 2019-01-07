import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  currentMode = 'rushee-profiles';

  changeMode(mode: string) {
    this.currentMode = mode;
  }
}
