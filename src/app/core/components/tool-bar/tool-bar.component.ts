import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  @Output() themeMode = new EventEmitter();
  constructor(private sideNavService: SideNavService) {

  }

  clickMenu() { 
    this.sideNavService.toggle();
  }
  changeTheme($event) {
    this.themeMode.emit($event);
  }

  ngOnInit(): void {
  }

}
