export interface Company {
  companyName: string;
  companyId: string;
  contactPersonName: string;
  contactEmailId: string;
  contactPhoneNumber: string;
}

export interface CompanyState {
  Id?: number;
  CompanyName: string;
  CompanyType: string;
  GSTNumber: string;
  DirectorName: string;
  ContactPersonName: string;
  ContactPersonNumber : string;
  ContactEmail: string;
  LoginEmailId: string;
  Address: string;
  Description: string;
  CustomerCount?: number;
  UserCount?: number;
  DeviceCount?: number;
  RegistrationDateTime?: string | Date;
  BillingDate?: string;
  ExpiryDate?: string;
  PaymentDate?: string;
}
