import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { tap } from 'rxjs';
import { Product } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products!: Product[];
  constructor(private productSvc : ProductsService){}
  
  ngOnInit() {
    this.productSvc.getProducts()
    .pipe(
      tap((res:Product[]) => this.products = res)
    )
    .subscribe();
  }
}
