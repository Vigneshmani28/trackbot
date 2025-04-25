import { Company, CompanyState } from "./model/company";
import { Customer } from "./model/customer";
import { DataFormats } from "./model/data-formats";
import { Products } from "./model/products";
import { DeviceStatus, MockTracker, Tracker } from "./model/tracker";
import { MockSubUsers, MockUsers, Role, User } from "./model/user";

export const TRACKERS: Tracker[] = [
    { deviceName: "ELB10001", trackerId:"ELB10001", latitude: 13.026351, longitude: 80.264462, heading: 203.03, speed: 16, altitude:120,lastUpdatedReceivedTime: "20240230T023520", lastUpdatedDeviceTime: "202320340T032003", status: DeviceStatus.ACTIVE, deviceId: "1" },
    { deviceName: "ELB10002",  trackerId:"ELB10001",latitude: 13.028860, longitude: 80.272401, heading: 203.03, speed: 16, altitude:120,lastUpdatedReceivedTime: "20240230T023520",lastUpdatedDeviceTime: "202320340T032003", status: DeviceStatus.ACTIVE, deviceId: "2" },
    { deviceName: "ELB10003", trackerId:"ELB10001", latitude: 13.018156, longitude: 80.268625, heading: 203.03, speed: 16, altitude:120,lastUpdatedReceivedTime: "20240230T023520",lastUpdatedDeviceTime: "202320340T032003", status: DeviceStatus.ACTIVE, deviceId: "3" },
    { deviceName: "ELB10004", trackerId:"ELB10001", latitude: 13.012093, longitude: 80.250343, heading: 203.03, speed: 16, altitude:120,lastUpdatedReceivedTime: "20240230T023520",lastUpdatedDeviceTime: "202320340T032003", status: DeviceStatus.ACTIVE, deviceId: "4" },
]

export const PLAYBACK_LIST: Tracker[] = [
    {
        deviceName: "ELB10001",
        trackerId:"ELB10001",
        latitude: 13.026351,
        longitude: 80.264462,
        heading: 200,

        speed: 32,
        altitude:120,
        lastUpdatedReceivedTime: "20240230T023520",
        lastUpdatedDeviceTime: "20240230T023432",
        status: DeviceStatus.ACTIVE,
        deviceId: "1"
    },
    {
        deviceName: "ELB10001",
        trackerId:"ELB10001",
        latitude: 13.028860,
        longitude: 80.272401,
        heading: 200,
        speed: 32,
        altitude:120,
        lastUpdatedReceivedTime: "20240230T023520",
        lastUpdatedDeviceTime: "20240230T023432",
        status: DeviceStatus.ACTIVE,
        deviceId: "2"
    },
    {
        deviceName: "ELB10001",
        trackerId:"ELB10001",
        latitude: 13.018156,
        longitude: 80.268625,
        heading: 200,
        speed: 32,
        altitude:120,
        lastUpdatedReceivedTime: "20240230T023520",
        lastUpdatedDeviceTime: "20240230T023432",
        status: DeviceStatus.ACTIVE,
        deviceId: "3"
    },
    {
        deviceName: "ELB10001",
        trackerId:"ELB10001",
        latitude: 13.012093,
        longitude: 80.250343,
        heading: 200,
        speed: 32,
        altitude:120,
        lastUpdatedReceivedTime: "20240230T023520",
        lastUpdatedDeviceTime: "20240230T023432",
        status: DeviceStatus.ACTIVE,
        deviceId: "4"
    }
]

export const COMPANIES: Company[] = [
    {
        companyName: 'Elab',
        companyId: "1",
        contactPersonName: "Siva",
        contactEmailId: "siva.elab@gmail.com",
        contactPhoneNumber: "9112312345"
    },
    {
        companyName: 'NIOT',
        companyId: "1",
        contactPersonName: "Jai",
        contactEmailId: "jai.niot@gmail.com",
        contactPhoneNumber: "9112312345"
    }
]

export const MOCK_COMPANIES : CompanyState[] = [
    {
        Id: 1,
        CompanyName: "American",
        CompanyType: "Registered Business - Regular",
        GSTNumber: "27AAACR5055K1Z7",
        DirectorName: "Director of Company One",
        ContactPersonName : "Vignesh",
        ContactPersonNumber : "8072873118",
        ContactEmail : 'vickycontact@email.com',
        LoginEmailId : 'vicky@email.com',
        Address: "No:1, XXX Street, Chennai, Tamilnadu",
        Description: "Description of Company One",
        CustomerCount : 100,
        UserCount: 100,
        DeviceCount : 100,
        RegistrationDateTime: "2024-06-11T14:30:45.120",
        BillingDate: "2024-07-05T09:15:20.500",
        ExpiryDate: "2025-01-01T23:59:59.999",
        PaymentDate: "2024-08-20T16:45:10.250"
    },
    {
        Id: 2,
        CompanyName: "Burma",
        CompanyType: "UnRegistered Business",
        GSTNumber: "27AAACR5055K1Z7",
        DirectorName: "Director of Company One",
        ContactPersonName : "Vignesh",
        ContactPersonNumber : "8072873118",
        ContactEmail : 'vickycontact@email.com',
        LoginEmailId : 'vicky@email.com',
        Address: "No:1, XXX Street, Chennai, Tamilnadu",
        Description: "Description of Company One",
        CustomerCount : 100,
        UserCount: 100,
        DeviceCount : 100,
        RegistrationDateTime: "2024-06-11T14:30:45.120",
        BillingDate: "2024-07-05T09:15:20.500",
        ExpiryDate: "2025-01-01T23:59:59.999",
        PaymentDate: "2024-08-20T16:45:10.250"
    },
    {
        Id: 3,
        CompanyName: "American",
        CompanyType: "Registered Business - Regular",
        GSTNumber: "27AAACR5055K1Z7",
        DirectorName: "Director of Company One",
        ContactPersonName : "Vignesh",
        ContactPersonNumber : "8072873118",
        ContactEmail : 'vickycontact@email.com',
        LoginEmailId : 'vicky@email.com',
        Address: "No:1, XXX Street, Chennai, Tamilnadu",
        Description: "Description of Company One",
        CustomerCount : 100,
        UserCount: 100,
        DeviceCount : 100,
        RegistrationDateTime: "2024-06-11T14:30:45.120",
        BillingDate: "2024-07-05T09:15:20.500",
        ExpiryDate: "2025-01-01T23:59:59.999",
        PaymentDate: "2024-08-20T16:45:10.250"
    }
]

export const MOCK_CUSTOMERS: Customer[] = [
    {
       SNo : 1,
       CustomerName : 'Customer_1' ,
       CompanyType: "Registered Business - Regular",
       GSTNumber: "27AAACR5055K1Z7",
       DirectorName: "Director of Company One",
       ContactPersonName : "Vignesh",
       ContactPersonNumber : "8072873118",
       ContactEmail : 'vickycontact@email.com',
       LoginEmailId : 'vicky@email.com',
       Address: "No:1, XXX Street, Chennai, Tamilnadu",
       Description: "Description of Company One",
       UserCount : 100,
       TerminalCount : 100,
       CreditLimit : 100,
       ConsumedCredit : 25,
       LimitReached : false,
       RegistrationDateAndTime : "12/02/2025",
       BillingDate : "12/02/2025",
       ExpiryDate : "12/02/2025",
       PaymentDate : "12/02/2025",
    },
    {
        SNo : 2,
        CustomerName : 'Customer_2' ,
        CompanyType: "Registered Business - Regular",
        GSTNumber: "27AAACR5055K1Z7",
        DirectorName: "Director of Company One 2",
        ContactPersonName : "Vignesh",
        ContactPersonNumber : "8072873118",
        ContactEmail : 'vickycontact2@email.com',
        LoginEmailId : 'vicky2@email.com',
        Address: "No:1, XXX Street2, Chennai, Tamilnadu",
        Description: "Description of Company One 2",
        UserCount : 100,
        TerminalCount : 100,
        CreditLimit : 100,
        ConsumedCredit : 100,
        LimitReached : true,
        RegistrationDateAndTime : "12/02/2025",
        BillingDate : "12/02/2025",
        ExpiryDate : "12/02/2025",
        PaymentDate : "12/02/2025",
    }
]

export const MOCK_USERS:MockUsers[] = [
    {
        SNo : 1,
        UserName : 'User_1',
        UserEmailId : 'user1@email.com',
        Customer : 'Customer_1',
        CreationDateAndTime : '12/02/2025',
        TrackersCount : 10,
        CustomerTotalCredits : 1000,
        CustomerTotalConsumed : 700
    },
    {
        SNo : 2,
        UserName : 'User_2',
        UserEmailId : 'user2@email.com',
        Customer : 'Customer_2',
        CreationDateAndTime : '13/04/2024',
        TrackersCount : 100,
        CustomerTotalCredits : 2000,
        CustomerTotalConsumed : 500
    },
]

export const MOCK_SUB_USERS:MockSubUsers[] = [
    {
        SNo : 1,
        NameOfTheUser : 'User_1',
        LoginId : 'user@gmail.com',
        CreationDateAndTime : '12/02/2025',
        TrackersCount : 10,
        AdminRights : 'Yes',
        Description : 'Details'
    },
    {
        SNo : 2,
        NameOfTheUser : 'User_2',
        LoginId : 'user2@gmail.com',
        CreationDateAndTime : '12/02/2025',
        TrackersCount : 100,
        AdminRights : 'No',
        Description : 'Details'
    },
]

export const MOCK_DATA_FORMATS:DataFormats[] = [
    {
        SNo :1,
        DataFormatName : 'DataFormat_1',
        CreationDate : '12/02/2025',
        EncryptionEnabled : 'Yes',
        TypeOfEncryption : 'AES 256',
        SampleFormat : 'This is sample format_1',
        DecodeInformation : 'This is Sample decode information_1',
        Description : 'This is sample description_1'
    },
    {
        SNo :2,
        DataFormatName : 'DataFormat_2',
        CreationDate : '12/02/2025',
        EncryptionEnabled : 'No',
        TypeOfEncryption : 'AES 256',
        SampleFormat : 'This is sample format_2',
        DecodeInformation : 'This is Sample decode information_2',
        Description : 'This is sample description_2'
    },
    {
        SNo :3,
        DataFormatName : 'DataFormat_3',
        CreationDate : '12/02/2025',
        EncryptionEnabled : 'Yes',
        TypeOfEncryption : 'AES 256',
        SampleFormat : 'This is sample format_3',
        DecodeInformation : 'This is Sample decode information_3',
        Description : 'This is sample description_3'
    }
]

export const MOCK_PRODUCTS: Products[] =[
    {
        SNo : 1,
        NameOfTheProduct : 'Product_1',
        ProductModelNumber : 'obc_123',
        ProductVersion : 'V.1.0',
        Category : 'Marine',
        DataFormat : 'DataFormat_1, DataFormat_2, DataFormat_3',
        Manufacturer : 'Honeywell',
        Description : 'Details'
    },
    {
        SNo : 2,
        NameOfTheProduct : 'Product_2',
        ProductModelNumber : 'obc_123',
        ProductVersion : 'V.1.0',
        Category : 'Marine',
        DataFormat : 'DataFormat_1, DataFormat_2, DataFormat_3',
        Manufacturer : 'Honeywell',
        Description : 'Details'
    },
    {
        SNo : 3,
        NameOfTheProduct : 'Product_3',
        ProductModelNumber : 'obc_123',
        ProductVersion : 'V.1.0',
        Category : 'Marine',
        DataFormat : 'DataFormat_1, DataFormat_2, DataFormat_3',
        Manufacturer : 'Honeywell',
        Description : 'Details'
    },
]

export const MOCK_TRACKER: MockTracker[] = [
    {
      SNo: 1,
      TrackerId: "TRK12345",
      TrackerName: "Tracker Alpha",
      RegistrationDateTime: "2025-03-20 10:30:00",
      NameOfTheUser: "John Doe",
      UserLoginId: "johndoe123",
      TrackerStatus: "Active",
      TrackerTotalCredit: 1000,
      TotalConsumedCredit: 200,
      LastUpdatedTime: "2025-03-24 14:45:00",
    },
    {
      SNo: 2,
      TrackerId: "TRK67890",
      TrackerName: "Tracker Beta",
      RegistrationDateTime: "2025-03-21 11:15:00",
      NameOfTheUser: "Jane Smith",
      UserLoginId: "janesmith456",
      TrackerStatus: "Inactive",
      TrackerTotalCredit: 500,
      TotalConsumedCredit: 150,
      LastUpdatedTime: "2025-03-23 09:30:00",
    }
  ];
  

export const USERS: User[] = [
    {
        email: 'test@gmail.com',
        userId: 1,
        name: 'siva',
        company: {
            companyName: 'NIOT',
            companyId: "1",
            contactPersonName: "Jai",
            contactEmailId: "jai.niot@gmail.com",
            contactPhoneNumber: "9112312345"
        },
        role: [Role.User]
    },
    {
        email: 'test@gmail.com',
        userId: 2,
        name: 'joy',
        company: {
            companyName: 'NIOT',
            companyId: "1",
            contactPersonName: "Jai",
            contactEmailId: "jai.niot@gmail.com",
            contactPhoneNumber: "9112312345"
        },
        role: [Role.User]
    },
    {
        email: 'test@gmail.com',
        userId: 3,
        name: 'govind',
        company: {
            companyName: 'NIOT',
            companyId: "1",
            contactPersonName: "Jai",
            contactEmailId: "jai.niot@gmail.com",
            contactPhoneNumber: "9112312345"
        },
        role: [Role.User]
    },
    {
        email: 'test@gmail.com',
        userId: 4,
        name: 'mano',
        company: {
            companyName: 'NIOT',
            companyId: "1",
            contactPersonName: "Jai",
            contactEmailId: "jai.niot@gmail.com",
            contactPhoneNumber: "9112312345"
        },
        role: [Role.User]
    }
]

export const TEST_USER: User = {
    email: 'test@gmail.com',
    userId: 1,
    name: 'siva',
    company: {
        companyName: 'NIOT',
        companyId: "1",
        contactPersonName: "Jai",
        contactEmailId: "jai.niot@gmail.com",
        contactPhoneNumber: "9112312345"
    },
    role: [Role.User]
}

export interface MarkerPlayback {
    id: string;
    deviceName?: string;
    trackingData: { lat: number; lng: number; timestamp: string }[];
    filteredTrackingData: { lat: number; lng: number; timestamp: string }[];
    currentIndex: number;
    currentMarkerPosition: google.maps.LatLngLiteral;
    isPlaying: boolean;
    pausedProgress: number;
    speedMultiplier: number;
    animationFrame: any;
    content: HTMLElement;
  }

  export const MOCK_MARKERS: MarkerPlayback[] = [
    {
      id: 'ELB1005',
      deviceName : 'Tracker 5',
      trackingData:    [
        {
          lng: 80.04548,
          lat: 12.82342,
          timestamp: '2025-03-11T08:46:23.244Z'
        },
        {
          lng: 80.04548,
          lat: 12.82383,
          timestamp: '2025-03-11T08:46:28.244Z'
        },
        {
          lng: 80.04547,
          lat: 12.82444,
          timestamp: '2025-03-11T08:46:33.244Z'
        },
        {
          lng: 80.04547,
          lat: 12.82444,
          timestamp: '2025-03-11T08:46:38.244Z'
        },
        {
          lng: 80.04518,
          lat: 12.82446,
          timestamp: '2025-03-11T08:46:43.244Z'
        },
        {
          lng: 80.04489,
          lat: 12.82445,
          timestamp: '2025-03-11T08:46:48.244Z'
        },
        {
          lng: 80.04473,
          lat: 12.82445,
          timestamp: '2025-03-11T08:46:53.244Z'
        },
        {
          lng: 80.04473,
          lat: 12.82445,
          timestamp: '2025-03-11T08:46:58.244Z'
        },
        {
          lng: 80.04472,
          lat: 12.82457,
          timestamp: '2025-03-11T08:47:03.244Z'
        },
        {
          lng: 80.04471,
          lat: 12.82489,
          timestamp: '2025-03-11T08:47:08.244Z'
        },
        {
          lng: 80.04471,
          lat: 12.82517,
          timestamp: '2025-03-11T08:47:13.244Z'
        },
        {
          lng: 80.04471,
          lat: 12.82517,
          timestamp: '2025-03-11T08:47:18.244Z'
        },
        {
          lng: 80.04429,
          lat: 12.82517,
          timestamp: '2025-03-11T08:47:23.244Z'
        },
        {
          lng: 80.04367,
          lat: 12.82517,
          timestamp: '2025-03-11T08:47:28.244Z'
        },
        {
          lng: 80.04316,
          lat: 12.82517,
          timestamp: '2025-03-11T08:47:33.244Z'
        },
        {
          lng: 80.04292,
          lat: 12.82517,
          timestamp: '2025-03-11T08:47:38.244Z'
        },
        {
          lng: 80.0419,
          lat: 12.82538,
          timestamp: '2025-03-11T08:47:43.244Z'
        },
        {
          lng: 80.04178,
          lat: 12.82546,
          timestamp: '2025-03-11T08:47:48.244Z'
        },
        {
          lng: 80.04136,
          lat: 12.82613,
          timestamp: '2025-03-11T08:47:53.244Z'
        },
        {
          lng: 80.04131,
          lat: 12.82622,
          timestamp: '2025-03-11T08:47:58.244Z'
        },
        {
          lng: 80.04131,
          lat: 12.82622,
          timestamp: '2025-03-11T08:48:03.244Z'
        },
        {
          lng: 80.04128,
          lat: 12.82618,
          timestamp: '2025-03-11T08:48:08.244Z'
        },
        {
          lng: 80.04125,
          lat: 12.82614,
          timestamp: '2025-03-11T08:48:13.244Z'
        },
        {
          lng: 80.0412,
          lat: 12.82608,
          timestamp: '2025-03-11T08:48:18.244Z'
        },
        {
          lng: 80.04055,
          lat: 12.82524,
          timestamp: '2025-03-11T08:48:23.244Z'
        },
        {
          lng: 80.04055,
          lat: 12.82524,
          timestamp: '2025-03-11T08:48:28.244Z'
        },
        {
          lng: 80.04035,
          lat: 12.82534,
          timestamp: '2025-03-11T08:48:33.244Z'
        },
        {
          lng: 80.04105,
          lat: 12.82632,
          timestamp: '2025-03-11T08:48:38.244Z'
        },
        {
          lng: 80.0414,
          lat: 12.82669,
          timestamp: '2025-03-11T08:48:43.244Z'
        },
        {
          lng: 80.04153,
          lat: 12.82682,
          timestamp: '2025-03-11T08:48:48.244Z'
        },
        {
          lng: 80.04192,
          lat: 12.8272,
          timestamp: '2025-03-11T08:48:53.244Z'
        },
        {
          lng: 80.0427,
          lat: 12.82795,
          timestamp: '2025-03-11T08:48:58.244Z'
        },
        {
          lng: 80.04292,
          lat: 12.82816,
          timestamp: '2025-03-11T08:49:03.244Z'
        },
        {
          lng: 80.04427,
          lat: 12.82941,
          timestamp: '2025-03-11T08:49:08.244Z'
        },
        {
          lng: 80.04492,
          lat: 12.83002,
          timestamp: '2025-03-11T08:49:13.244Z'
        },
        {
          lng: 80.045,
          lat: 12.8301,
          timestamp: '2025-03-11T08:49:18.244Z'
        },
        {
          lng: 80.04573,
          lat: 12.83081,
          timestamp: '2025-03-11T08:49:23.244Z'
        },
        {
          lng: 80.0458,
          lat: 12.83087,
          timestamp: '2025-03-11T08:49:28.244Z'
        },
        {
          lng: 80.04588,
          lat: 12.83095,
          timestamp: '2025-03-11T08:49:33.244Z'
        },
        {
          lng: 80.04726,
          lat: 12.83218,
          timestamp: '2025-03-11T08:49:38.244Z'
        },
        {
          lng: 80.04751,
          lat: 12.83241,
          timestamp: '2025-03-11T08:49:43.244Z'
        },
        {
          lng: 80.04787,
          lat: 12.83272,
          timestamp: '2025-03-11T08:49:48.244Z'
        },
        {
          lng: 80.0479,
          lat: 12.83275,
          timestamp: '2025-03-11T08:49:53.244Z'
        },
        {
          lng: 80.04824,
          lat: 12.83306,
          timestamp: '2025-03-11T08:49:58.244Z'
        },
        {
          lng: 80.04844,
          lat: 12.83326,
          timestamp: '2025-03-11T08:50:03.244Z'
        },
        {
          lng: 80.04969,
          lat: 12.83448,
          timestamp: '2025-03-11T08:50:08.244Z'
        },
        {
          lng: 80.05049,
          lat: 12.83523,
          timestamp: '2025-03-11T08:50:13.244Z'
        },
        {
          lng: 80.05085,
          lat: 12.83558,
          timestamp: '2025-03-11T08:50:18.244Z'
        },
        {
          lng: 80.0518,
          lat: 12.83652,
          timestamp: '2025-03-11T08:50:23.244Z'
        },
        {
          lng: 80.05382,
          lat: 12.83843,
          timestamp: '2025-03-11T08:50:28.244Z'
        },
        {
          lng: 80.05421,
          lat: 12.83881,
          timestamp: '2025-03-11T08:50:33.244Z'
        },
        {
          lng: 80.05448,
          lat: 12.83906,
          timestamp: '2025-03-11T08:50:38.244Z'
        },
        {
          lng: 80.05495,
          lat: 12.83951,
          timestamp: '2025-03-11T08:50:43.244Z'
        },
        {
          lng: 80.0554,
          lat: 12.83993,
          timestamp: '2025-03-11T08:50:48.244Z'
        },
        {
          lng: 80.0562,
          lat: 12.84071,
          timestamp: '2025-03-11T08:50:53.244Z'
        },
        {
          lng: 80.0563,
          lat: 12.84083,
          timestamp: '2025-03-11T08:50:58.244Z'
        },
        {
          lng: 80.05697,
          lat: 12.84145,
          timestamp: '2025-03-11T08:51:03.244Z'
        },
        {
          lng: 80.05741,
          lat: 12.84185,
          timestamp: '2025-03-11T08:51:08.244Z'
        },
        {
          lng: 80.05789,
          lat: 12.84229,
          timestamp: '2025-03-11T08:51:13.244Z'
        },
        {
          lng: 80.05805,
          lat: 12.84245,
          timestamp: '2025-03-11T08:51:18.244Z'
        },
        {
          lng: 80.05846,
          lat: 12.84283,
          timestamp: '2025-03-11T08:51:23.244Z'
        },
        {
          lng: 80.05892,
          lat: 12.84326,
          timestamp: '2025-03-11T08:51:28.244Z'
        },
        {
          lng: 80.05931,
          lat: 12.84362,
          timestamp: '2025-03-11T08:51:33.244Z'
        },
        {
          lng: 80.05969,
          lat: 12.84398,
          timestamp: '2025-03-11T08:51:38.244Z'
        },
        {
          lng: 80.05987,
          lat: 12.84419,
          timestamp: '2025-03-11T08:51:43.244Z'
        },
        {
          lng: 80.06127,
          lat: 12.84564,
          timestamp: '2025-03-11T08:51:48.244Z'
        },
        {
          lng: 80.06152,
          lat: 12.84588,
          timestamp: '2025-03-11T08:51:53.244Z'
        },
        {
          lng: 80.06194,
          lat: 12.84633,
          timestamp: '2025-03-11T08:51:58.244Z'
        },
        {
          lng: 80.06234,
          lat: 12.84672,
          timestamp: '2025-03-11T08:52:03.244Z'
        },
        {
          lng: 80.06315,
          lat: 12.84783,
          timestamp: '2025-03-11T08:52:08.244Z'
        },
        {
          lng: 80.06399,
          lat: 12.84895,
          timestamp: '2025-03-11T08:52:13.244Z'
        },
        {
          lng: 80.064,
          lat: 12.84897,
          timestamp: '2025-03-11T08:52:18.244Z'
        },
        {
          lng: 80.0642,
          lat: 12.84925,
          timestamp: '2025-03-11T08:52:23.244Z'
        },
        {
          lng: 80.06436,
          lat: 12.84948,
          timestamp: '2025-03-11T08:52:28.244Z'
        },
        {
          lng: 80.0648,
          lat: 12.85009,
          timestamp: '2025-03-11T08:52:33.244Z'
        },
        {
          lng: 80.0648,
          lat: 12.85009,
          timestamp: '2025-03-11T08:52:38.244Z'
        },
        {
          lng: 80.06493,
          lat: 12.85002,
          timestamp: '2025-03-11T08:52:43.244Z'
        },
        {
          lng: 80.06476,
          lat: 12.84978,
          timestamp: '2025-03-11T08:52:48.244Z'
        },
        {
          lng: 80.06409,
          lat: 12.84887,
          timestamp: '2025-03-11T08:52:53.244Z'
        },
        {
          lng: 80.06305,
          lat: 12.84747,
          timestamp: '2025-03-11T08:52:58.244Z'
        },
        {
          lng: 80.06235,
          lat: 12.84656,
          timestamp: '2025-03-11T08:53:03.244Z'
        },
        {
          lng: 80.06208,
          lat: 12.84623,
          timestamp: '2025-03-11T08:53:08.244Z'
        },
        {
          lng: 80.06172,
          lat: 12.84581,
          timestamp: '2025-03-11T08:53:13.244Z'
        },
        {
          lng: 80.06155,
          lat: 12.84562,
          timestamp: '2025-03-11T08:53:18.244Z'
        },
        {
          lng: 80.06147,
          lat: 12.84553,
          timestamp: '2025-03-11T08:53:23.244Z'
        },
        {
          lng: 80.06128,
          lat: 12.84533,
          timestamp: '2025-03-11T08:53:28.244Z'
        },
        {
          lng: 80.06117,
          lat: 12.84521,
          timestamp: '2025-03-11T08:53:33.244Z'
        },
        {
          lng: 80.06077,
          lat: 12.8448,
          timestamp: '2025-03-11T08:53:38.244Z'
        },
        {
          lng: 80.06052,
          lat: 12.84459,
          timestamp: '2025-03-11T08:53:43.244Z'
        },
        {
          lng: 80.06028,
          lat: 12.84437,
          timestamp: '2025-03-11T08:53:48.244Z'
        },
        {
          lng: 80.05979,
          lat: 12.84391,
          timestamp: '2025-03-11T08:53:53.244Z'
        },
        {
          lng: 80.05979,
          lat: 12.84391,
          timestamp: '2025-03-11T08:53:58.244Z'
        },
        {
          lng: 80.0599,
          lat: 12.84377,
          timestamp: '2025-03-11T08:54:03.244Z'
        },
        {
          lng: 80.06015,
          lat: 12.84344,
          timestamp: '2025-03-11T08:54:08.244Z'
        },
        {
          lng: 80.06055,
          lat: 12.84292,
          timestamp: '2025-03-11T08:54:13.244Z'
        },
        {
          lng: 80.06082,
          lat: 12.84257,
          timestamp: '2025-03-11T08:54:18.244Z'
        },
        {
          lng: 80.06085,
          lat: 12.84253,
          timestamp: '2025-03-11T08:54:23.244Z'
        },
        {
          lng: 80.06126,
          lat: 12.842,
          timestamp: '2025-03-11T08:54:28.244Z'
        },
        {
          lng: 80.06136,
          lat: 12.84186,
          timestamp: '2025-03-11T08:54:33.244Z'
        },
        {
          lng: 80.06142,
          lat: 12.8418,
          timestamp: '2025-03-11T08:54:38.244Z'
        },
        {
          lng: 80.06162,
          lat: 12.84155,
          timestamp: '2025-03-11T08:54:43.244Z'
        },
        {
          lng: 80.06174,
          lat: 12.84146,
          timestamp: '2025-03-11T08:54:48.244Z'
        },
        {
          lng: 80.06184,
          lat: 12.84133,
          timestamp: '2025-03-11T08:54:53.244Z'
        },
        {
          lng: 80.06205,
          lat: 12.84109,
          timestamp: '2025-03-11T08:54:58.244Z'
        },
        {
          lng: 80.06271,
          lat: 12.84024,
          timestamp: '2025-03-11T08:55:03.244Z'
        },
        {
          lng: 80.0632,
          lat: 12.83969,
          timestamp: '2025-03-11T08:55:08.244Z'
        },
        {
          lng: 80.0633,
          lat: 12.83956,
          timestamp: '2025-03-11T08:55:13.244Z'
        },
        {
          lng: 80.06338,
          lat: 12.83944,
          timestamp: '2025-03-11T08:55:18.244Z'
        },
        {
          lng: 80.06344,
          lat: 12.8393,
          timestamp: '2025-03-11T08:55:23.244Z'
        },
        {
          lng: 80.06344,
          lat: 12.8393,
          timestamp: '2025-03-11T08:55:28.244Z'
        },
        {
          lng: 80.06356,
          lat: 12.83917,
          timestamp: '2025-03-11T08:55:33.244Z'
        },
        {
          lng: 80.0639,
          lat: 12.83896,
          timestamp: '2025-03-11T08:55:38.244Z'
        },
        {
          lng: 80.0643,
          lat: 12.83869,
          timestamp: '2025-03-11T08:55:43.244Z'
        },
        {
          lng: 80.06464,
          lat: 12.83847,
          timestamp: '2025-03-11T08:55:48.244Z'
        },
        {
          lng: 80.06472,
          lat: 12.83842,
          timestamp: '2025-03-11T08:55:53.244Z'
        },
        {
          lng: 80.06489,
          lat: 12.83831,
          timestamp: '2025-03-11T08:55:58.244Z'
        },
        {
          lng: 80.06538,
          lat: 12.83785,
          timestamp: '2025-03-11T08:56:03.244Z'
        },
        {
          lng: 80.06556,
          lat: 12.83767,
          timestamp: '2025-03-11T08:56:08.244Z'
        },
        {
          lng: 80.06556,
          lat: 12.83767,
          timestamp: '2025-03-11T08:56:13.244Z'
        },
        {
          lng: 80.0656,
          lat: 12.83737,
          timestamp: '2025-03-11T08:56:18.244Z'
        },
        {
          lng: 80.06561,
          lat: 12.83728,
          timestamp: '2025-03-11T08:56:23.244Z'
        },
        {
          lng: 80.06565,
          lat: 12.83704,
          timestamp: '2025-03-11T08:56:28.244Z'
        },
        {
          lng: 80.06565,
          lat: 12.83704,
          timestamp: '2025-03-11T08:56:33.244Z'
        }
      ],
      filteredTrackingData: [],
      currentIndex: 0,
      currentMarkerPosition: { lat: 0, lng: 0 },
      isPlaying: false,
      pausedProgress: 0,
      speedMultiplier: 1,
      animationFrame: null,
      content: document.createElement('img')
    },
    {
      id: 'ELB1006',
      deviceName : 'Tracker 6',
      trackingData: [
            {
              lng: 79.23037,
              lat: 10.04199,
              timestamp: '2025-03-27T11:13:50.243Z'
            },
            {
              lng: 79.23028,
              lat: 10.0425,
              timestamp: '2025-03-27T11:13:55.243Z'
            },
            {
              lng: 79.23016,
              lat: 10.04319,
              timestamp: '2025-03-27T11:14:00.243Z'
            },
            {
              lng: 79.23014,
              lat: 10.04331,
              timestamp: '2025-03-27T11:14:05.243Z'
            },
            {
              lng: 79.23016,
              lat: 10.04406,
              timestamp: '2025-03-27T11:14:10.243Z'
            },
            {
              lng: 79.23026,
              lat: 10.0446,
              timestamp: '2025-03-27T11:14:15.243Z'
            },
            {
              lng: 79.23034,
              lat: 10.04502,
              timestamp: '2025-03-27T11:14:20.243Z'
            },
            {
              lng: 79.23053,
              lat: 10.04607,
              timestamp: '2025-03-27T11:14:25.243Z'
            },
            {
              lng: 79.23052,
              lat: 10.04674,
              timestamp: '2025-03-27T11:14:30.243Z'
            },
            {
              lng: 79.23051,
              lat: 10.04713,
              timestamp: '2025-03-27T11:14:35.243Z'
            },
            {
              lng: 79.23059,
              lat: 10.0475,
              timestamp: '2025-03-27T11:14:40.243Z'
            },
            {
              lng: 79.2308,
              lat: 10.04807,
              timestamp: '2025-03-27T11:14:45.243Z'
            },
            {
              lng: 79.23086,
              lat: 10.04823,
              timestamp: '2025-03-27T11:14:50.243Z'
            },
            {
              lng: 79.23095,
              lat: 10.04848,
              timestamp: '2025-03-27T11:14:55.243Z'
            },
            {
              lng: 79.23122,
              lat: 10.04919,
              timestamp: '2025-03-27T11:15:00.243Z'
            },
            {
              lng: 79.23128,
              lat: 10.04936,
              timestamp: '2025-03-27T11:15:05.243Z'
            },
            {
              lng: 79.23136,
              lat: 10.04956,
              timestamp: '2025-03-27T11:15:10.243Z'
            },
            {
              lng: 79.23148,
              lat: 10.04989,
              timestamp: '2025-03-27T11:15:15.243Z'
            },
            {
              lng: 79.23165,
              lat: 10.05064,
              timestamp: '2025-03-27T11:15:20.243Z'
            },
            {
              lng: 79.23175,
              lat: 10.05135,
              timestamp: '2025-03-27T11:15:25.243Z'
            },
            {
              lng: 79.23175,
              lat: 10.05171,
              timestamp: '2025-03-27T11:15:30.243Z'
            },
            {
              lng: 79.23175,
              lat: 10.05184,
              timestamp: '2025-03-27T11:15:35.243Z'
            },
            {
              lng: 79.23174,
              lat: 10.05207,
              timestamp: '2025-03-27T11:15:40.243Z'
            },
            {
              lng: 79.23173,
              lat: 10.05241,
              timestamp: '2025-03-27T11:15:45.243Z'
            },
            {
              lng: 79.23166,
              lat: 10.05308,
              timestamp: '2025-03-27T11:15:50.243Z'
            },
            {
              lng: 79.2316,
              lat: 10.05351,
              timestamp: '2025-03-27T11:15:55.243Z'
            },
            {
              lng: 79.2316,
              lat: 10.05351,
              timestamp: '2025-03-27T11:16:00.243Z'
            },
            {
              lng: 79.23066,
              lat: 10.05348,
              timestamp: '2025-03-27T11:16:05.243Z'
            },
            {
              lng: 79.23011,
              lat: 10.05343,
              timestamp: '2025-03-27T11:16:10.243Z'
            },
            {
              lng: 79.23001,
              lat: 10.05342,
              timestamp: '2025-03-27T11:16:15.243Z'
            },
            {
              lng: 79.23001,
              lat: 10.05342,
              timestamp: '2025-03-27T11:16:20.243Z'
            }   
      ],
      filteredTrackingData: [],
      currentIndex: 0,
      currentMarkerPosition: { lat: 0, lng: 0 },
      isPlaying: false,
      pausedProgress: 0,
      speedMultiplier: 1,
      animationFrame: null,
      content: document.createElement('img')
    },
    {
      id: 'ELB1007',
      deviceName: "Tracker 7",
      trackingData: [
        {
          lng: 78.12345,
          lat: 9.87654,
          timestamp: '2025-03-30T09:15:00.000Z'
        },
        {
          lng: 78.12347,
          lat: 9.87660,
          timestamp: '2025-03-30T09:15:05.000Z'
        }
      ],
      filteredTrackingData: [],
      currentIndex: 0,
      currentMarkerPosition: { lat: 0, lng: 0 },
      isPlaying: false,
      pausedProgress: 0,
      speedMultiplier: 1,
      animationFrame: null,
      content: document.createElement('img')
    },
    {
      id: 'ELB1008',
      deviceName: "Tracker 8",
      trackingData: [
        {
          lng: 79.21213,
          lat: 10.05207,
          timestamp: '2025-04-11T06:51:55.232Z'
        },
        {
          lng: 79.21214,
          lat: 10.05178,
          timestamp: '2025-04-11T06:52:00.232Z'
        },
        {
          lng: 79.212,
          lat: 10.05114,
          timestamp: '2025-04-11T06:52:05.232Z'
        },
        {
          lng: 79.21189,
          lat: 10.05064,
          timestamp: '2025-04-11T06:52:10.232Z'
        },
        {
          lng: 79.21199,
          lat: 10.0498,
          timestamp: '2025-04-11T06:52:15.232Z'
        },
        {
          lng: 79.21212,
          lat: 10.04901,
          timestamp: '2025-04-11T06:52:20.232Z'
        },
        {
          lng: 79.21208,
          lat: 10.04872,
          timestamp: '2025-04-11T06:52:25.232Z'
        },
        {
          lng: 79.21189,
          lat: 10.04837,
          timestamp: '2025-04-11T06:52:30.232Z'
        },
        {
          lng: 79.21184,
          lat: 10.04815,
          timestamp: '2025-04-11T06:52:35.232Z'
        },
        {
          lng: 79.21192,
          lat: 10.04749,
          timestamp: '2025-04-11T06:52:40.232Z'
        },
        {
          lng: 79.21202,
          lat: 10.04667,
          timestamp: '2025-04-11T06:52:45.232Z'
        },
        {
          lng: 79.21207,
          lat: 10.04628,
          timestamp: '2025-04-11T06:52:50.232Z'
        },
        {
          lng: 79.21221,
          lat: 10.04573,
          timestamp: '2025-04-11T06:52:55.232Z'
        },
        {
          lng: 79.21237,
          lat: 10.04497,
          timestamp: '2025-04-11T06:53:00.232Z'
        },
        {
          lng: 79.21247,
          lat: 10.04468,
          timestamp: '2025-04-11T06:53:05.232Z'
        },
        {
          lng: 79.21247,
          lat: 10.04468,
          timestamp: '2025-04-11T06:53:10.232Z'
        },
        {
          lng: 79.21207,
          lat: 10.04459,
          timestamp: '2025-04-11T06:53:15.232Z'
        },
        {
          lng: 79.21207,
          lat: 10.04459,
          timestamp: '2025-04-11T06:53:20.232Z'
        }
      ],
      filteredTrackingData: [],
      currentIndex: 0,
      currentMarkerPosition: { lat: 0, lng: 0 },
      isPlaying: false,
      pausedProgress: 0,
      speedMultiplier: 1,
      animationFrame: null,
      content: document.createElement('img')
    }
  ];

  export const MOCK_MARKER_GROUPS = [
    {
      id: 'GROUP1',
      name: 'Fleet A',
      markers: [
        MOCK_MARKERS[0],
        MOCK_MARKERS[1],
      ]
    },
    {
      id: 'GROUP2',
      name: 'Fleet B',
      markers: [
       MOCK_MARKERS[2]
      ]
    }
  ];
  