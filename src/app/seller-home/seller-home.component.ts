import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  constructor(private product: ProductService,private toastr: ToastrService) {}

  ngOnInit() {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((response: any) => {
      if (response) {
        this.toastr.success('Product Deleted Successfully');
        this.list();
      }
    });
  }

  list() {
    this.product.productList().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.productList = result;
      }
    });
  }
}
