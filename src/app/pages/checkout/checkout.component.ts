import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs';
import { delay, switchMap} from 'rxjs/operators';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  stores : Store[] = [];
  cart: Product[] = [];
  isDelivery : boolean = true;
  constructor(
    private dataSvc: DataService, 
    private shoppingCartSvc : ShoppingCartService,
    private router:Router){}

  ngOnInit():void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  model = {
    name : '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  onPickupOnDelivery(value:boolean):void {
   this.isDelivery = value;
  }

  onSubmit({value}:NgForm) : void {
    
    const data:Order = {
      ...value,
      data:this.getCurrentDay,
      isDelivery: this.isDelivery,
    };

    this.dataSvc.saveOrder(data)
    .pipe(
      tap((res)=>console.log(res)),
      switchMap(({id:orderId})=> {
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({details,orderId});
      }),
      tap(()=> this.router.navigate(['/checkout/thankyou-page'])),
      delay(2000),
      tap(()=> this.shoppingCartSvc.resetCart()),
    )
    .subscribe()
  }

  private getStores(): void {
    this.dataSvc.getStore()
    .pipe( tap((res:Store[]) => this.stores = res))
    .subscribe()
  } 

  private getCurrentDay():string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product)=>{
      const {id:productId,name:productName,qty:quantity} = product;
      details.push({productId,productName,quantity});
    })
    return details;
  }

  private getDataCart():void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products:Product[])=> this.cart = products)
    )
    .subscribe()
  }
}
