import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(private sideNavService: SideNavService) {

  }

  clickMenu() { 
    this.sideNavService.toggle();
  }

  ngOnInit(): void {
  }

}
