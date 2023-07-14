import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  constructor(
    private product: ProductService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  submit(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.toastr.success('Product Added Successfully');
        this.route.navigate(['seller-home']);
      }
    });
  }
}
