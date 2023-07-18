import { Component } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showLogin: boolean = true;
  constructor(
    private user: UserService,
    private toastr: ToastrService,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      this.toastr.error('Email & password is not correct.');
      if (result) {
      
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('data is stored in DB');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
