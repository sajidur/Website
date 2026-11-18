import { Component } from '@angular/core';
import { PRODUCTS } from 'src/app/shared/data/site-content';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = PRODUCTS;
}
