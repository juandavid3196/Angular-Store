import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { tap } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products!: Product[];
  constructor(private productSvc : ProductsService, private shoppingCartSvc: ShoppingCartService){}
  
  ngOnInit() {
    this.productSvc.getProducts()
    .pipe(
      tap((res:Product[]) => this.products = res)
    )
    .subscribe();
  }

  addToCart(product:Product):void {
    this.shoppingCartSvc.updateCart(product);
  }
}
