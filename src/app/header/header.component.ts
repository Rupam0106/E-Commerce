import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | Product[];
  constructor(
    private route: Router,
    private product: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.events.subscribe((response: any) => {
      if (response.url) {
        if (localStorage.getItem('seller') && response.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.toastr.success('User Logout Successfully');
    this.route.navigate(['/']);
  }
  logout() {
    localStorage.removeItem('seller');
    this.toastr.success('Seller Logout Successfully');
    this.route.navigate(['/']);
  }
}
