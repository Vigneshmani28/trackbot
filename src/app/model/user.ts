import { Company } from "./company";

export interface User{
    userId: number;
    name: string;
    email: string;
    company?: Company;
    role: [Role];
}

export interface MockUsers {
    SNo:number;
    UserName : string;
    UserEmailId:string;
    Customer : string;
    CreationDateAndTime: string;
    TrackersCount : number;
    CustomerTotalCredits : number;
    CustomerTotalConsumed : number;
    NameOfTheUser?:string;
    LoginId?:string;
    AdminRights?:string;
    Description?:string;
}

export interface MockSubUsers {
    SNo:number;
    NameOfTheUser : string;
    LoginId:string;
    CreationDateAndTime: string;
    TrackersCount : number;
    AdminRights : string;
    Description : string;
}


export enum Role{
    User = "User",
    Admin = "Admin",
    CompanyAdmin= "CompanyAdmin",
    SubCompanyAdmin="SubCompanyAdmin",
    SuperAdmin = "SuperAdmin",
    CustomerAdmin = "CustomerAdmin",
    CustomerUser = "CustomerUser"
}