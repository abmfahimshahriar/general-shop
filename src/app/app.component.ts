import { Component } from '@angular/core';
import { SideNavService } from './core/services/side-nav.service';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'general-shop';
  theme = 'light-theme';
  overlay: HTMLElement;


  constructor(private overlayContainer: OverlayContainer) {
    this.overlay = overlayContainer.getContainerElement();
  }

  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }
  // changeTheme() {
  //   this.theme = (this.theme === 'light-theme') ? 'dark-theme' : 'light-theme' ;
  // }

  changeTheme(event): void {
    if (this.overlay.classList.contains('dark-theme')) {
      this.overlay.classList.remove('dark-theme');
      this.overlay.classList.add('light-theme');
      this.theme = 'light-theme';
    } else if (this.overlay.classList.contains('light-theme')) {
      this.overlay.classList.remove('light-theme');
      this.overlay.classList.add('dark-theme');
      this.theme = 'dark-theme';
    } else {
      this.overlay.classList.add('light-theme');
      this.theme = 'light-theme';
    }
  }

}
