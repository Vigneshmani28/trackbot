export interface Tracker {
    deviceName: string;
    latitude: number;
    trackerId: string;
    longitude: number;
    heading: number;
    speed: number;
    altitude: number,
    lastUpdatedDeviceTime: string;
    lastUpdatedReceivedTime : string;
    status: DeviceStatus;
    deviceId: string;
}

export interface TrackerDetails {
    totalTrackers: string
    activeTrackers: string
    sleepTrackers: string
    inActiveTrackers: string
    alertTrackers: string
}


export enum DeviceStatus{
    OFFLINE = "OFFLINE", SLEEP = "SLEEP", ALERT = "ALERT", ACTIVE = "ACTIVE"
}

export enum MenuEnum {
    DASHBOARD = "Dashboard",
    TRACKERS = "Trackers",
    REPORTS = "Reports",
    COMPANIES = "Companies",
    CUSTOMERS = "Customers",
    USERS = "User Master",
    SUB_USERS = 'Sub Users',
    USERS_MASTER = 'Users',
    COMPANY_REGISTRATION = "Company Registration",
    CUSTOMER_REGISTRATION = "Customer Registration",
    DEVICE_REGISTRATION = "Device Registration",
    USER_REGISTRATION = "User Registration",
    DATA_FORMATS = 'Data Formats',
    PRODUCTS = 'Products'
}

export interface MockTracker {
    SNo: number;
    TrackerId: string;
    TrackerName: string;
    RegistrationDateTime: string;
    NameOfTheUser: string;
    UserLoginId: string;
    TrackerStatus: "Active" | "Inactive";
    TrackerTotalCredit: number;
    TotalConsumedCredit: number;
    LastUpdatedTime: string;
}

export enum SpeedEnum {
    '1x' = 1,
    '2x' = 2,
    '4x' =  4,
    '6x' = 6,
    '8x' = 8,
    '10x' = 10
}