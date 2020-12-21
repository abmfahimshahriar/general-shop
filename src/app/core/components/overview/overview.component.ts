import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  imageObject = [
    {
      image: 'https://iili.io/Ka7Lu4.jpg',
      thumbImage: 'https://iili.io/Ka7Lu4.jpg',
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
