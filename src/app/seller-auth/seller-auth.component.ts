import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  showLogin = true;
  authError: string = '';
  constructor(private seller: SellerService, private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: any) {
    console.log(data);
    this.seller.sellerSignUp(data);
  }
  login(data: any) {
    this.authError=''
    this.seller.sellerLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.toastr.error('Email & password is Incorrect');
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
