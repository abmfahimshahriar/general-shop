import { SideNavService } from './../../services/side-nav.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') public sideNav: MatSidenav;
  showFiller = false;

  constructor(private sideNavService: SideNavService) { 
  }

  ngOnInit() { 
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.sideNav);
  }

  onClickSideNavItem() {
    this.sideNavService.close();
  }
   

}
