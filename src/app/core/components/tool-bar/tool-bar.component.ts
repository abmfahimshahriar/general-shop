import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  @Output() themeMode = new EventEmitter();
  constructor(
    private sideNavService: SideNavService,
    private dialog: MatDialog
  ) {

  }

  clickMenu() { 
    this.sideNavService.toggle();
  }
  authentication(){
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AuthModalComponent, {
      autoFocus: false
    });

    dialogRef.componentInstance.login.subscribe(async (response) => {
      console.log(response.value);
      dialogRef.close();
    });

    dialogRef.componentInstance.signUp.subscribe(async (response) => {
      console.log(response.value);
      dialogRef.close();
    });

    
  }
  changeTheme($event) {
    this.themeMode.emit($event);
  }

  ngOnInit(): void {
  }

}
