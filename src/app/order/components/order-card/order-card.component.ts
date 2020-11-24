import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() orderDetails;
  @Output() changeStatus = new EventEmitter<any>();
  @Output() deleteOrder = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  chageOrderStatus(orderId) {
    this.changeStatus.emit(orderId)
  }

  onDeleteOrder(orderId) {
    this.deleteOrder.emit(orderId);
  }
}
