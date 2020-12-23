import { SideNavService } from './../../services/side-nav.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store/store';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') public sideNav: MatSidenav;
  showFiller = false;

  authenticated: boolean;
  authenticatedAsAdmin: boolean;
  constructor(
    private sideNavService: SideNavService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.ngRedux.subscribe(() => {
      this.authenticated = this.ngRedux.getState().authenticated;
      this.authenticatedAsAdmin = this.ngRedux.getState().authenticatedAsAdmin;
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.sideNav);
  }

  onClickSideNavItem() {
    this.sideNavService.close();
  }
}
