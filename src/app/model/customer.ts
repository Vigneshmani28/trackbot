export interface CustomerState {
    CustomerName: string;
    GSTNumber: string;
    DirectorName: string;
    Contact: {
      Name: string;
      PhoneNumber: string;
      Email: string;
    };
    SMSNumber: string;
    UserId: string;
    Password: string;
    Address: string;
    Description: string;
  }

export interface Customer {
  SNo: number;
  CustomerName: string;
  CompanyType : string;
  GSTNumber : string;
  DirectorName : string;
  ContactPersonName : string;
  ContactPersonNumber : string;
  ContactEmail : string;
  LoginEmailId : string;
  Address : string;
  Description : string;
  UserCount?: number 
  TerminalCount?: number
  CreditLimit?: number
  ConsumedCredit?: number
  LimitReached?: boolean;
  RegistrationDateAndTime?: string;
  BillingDate?: string;
  ExpiryDate?: string;
  PaymentDate?: string;
}