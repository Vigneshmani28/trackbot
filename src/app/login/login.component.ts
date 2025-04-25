import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth-service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MenuService } from '../services/menu/menu.service';
import { MenuEnum } from '../model/tracker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, MatInputModule, MatCommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule]
})
export class LoginComponent implements OnInit{
  emailId =  ''
  password = ''
  hide = true
  loading = false;
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router, private _snackBar : MatSnackBar, private menuService: MenuService){}

  ngOnInit(): void {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    if (rememberMe) {
      this.emailId = localStorage.getItem("rememberedEmail") || "";
      this.rememberMe = true;
    }
  }

  isLoginButtonDisabled(): boolean {
    return !(this.emailId.length > 0 && this.password.length > 0);
  }  

  submit(){
    this.loading = true;
    this.authService.login(this.emailId, this.password).subscribe({
      next: (result) => {
        this.loading = false;
        this.router.navigate(["home"])
        this.menuService.setMenu(MenuEnum.DASHBOARD);

        if (this.rememberMe) {
          localStorage.setItem("rememberedEmail", this.emailId);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.setItem("rememberMe", "false");
        }
      },
      error: (error) => {
        console.log(error)
        this.loading = false;
        this._snackBar.open("Username or password incorrect!", "OK", {duration: 2000})
      }
    })
  }


}
