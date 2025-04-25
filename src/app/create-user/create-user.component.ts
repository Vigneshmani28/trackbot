import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CompanyService } from '../services/company-service/company.service';
import { UserService } from '../services/user-service/user.service';
import { Company } from '../model/company';
import { Role, User } from '../model/user';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthResponse } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, CommonModule, MatCommonModule, MatInputModule, FormsModule,  MatSelectModule, MatCheckboxModule ]
})
export class CreateUserComponent implements OnInit{
  userName = ''
  phoneNumber = ''
  emailId = ''
  companies : Company[] = []
  companyId: number | undefined
  isAdmin = false

  constructor(private companyService: CompanyService, private userService: UserService, private _dialogRef: MatDialogRef<CreateUserComponent>){}
  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(list => {
      this.companies = list
    })
  }

  submit(){ 
    console.log("submit clicked")
    let roles = [Role.User]
    if(this.isAdmin){
      roles.push(Role.CompanyAdmin)
      roles.push(Role.SubCompanyAdmin)
    }
    this.userService.createUser(this.userName, this.emailId, this.phoneNumber, this.companyId!, roles).subscribe({
      next: (user: User) => {
        this._dialogRef.close(user)
      }
    })
  }

  onStatusChanged(event: MatSelectChange){
    this.companyId = event.value
  }
  
}
