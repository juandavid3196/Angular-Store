import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
    providedIn: 'root',
})

export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get cartAction$():Observable<Product[]> {
    return this.cartSubject.asObservable();
  }
  get totalAction$():Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$():Observable<number> {
    return this.quantitySubject.asObservable();
  }

  public updateCart(product:Product):void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  private addToCart(product:Product): void {
    const isProductCart = this.products.find(({id})=> id === product.id);
    
    if(isProductCart){
      isProductCart.qty += 1;
    }else {
      this.products.push({...product,qty:1});
    }

    this.cartSubject.next(this.products);
  }

  private quantityProducts():void {
    const quantity = this.products.reduce((acc,pro)=> acc += pro.qty,0);
    this.quantitySubject.next(quantity);
  }

  private calcTotal(): void {
    const total = this.products.reduce((acc,pro)=>acc += (pro.price * pro.qty),0);
    this.totalSubject.next(total);
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
  }

}