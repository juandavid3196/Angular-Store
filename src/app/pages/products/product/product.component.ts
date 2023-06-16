import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
@Input() product !: Product;
}
