import { Component } from '@angular/core';
import { SideNavService } from './core/services/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'general-shop';
  showFiller = false;

}
