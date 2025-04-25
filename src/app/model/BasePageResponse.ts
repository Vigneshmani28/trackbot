import { DeviceStatus } from "./tracker";

export interface BasePageResponse{
    content: [DeviceLocation]
    last: boolean
    totalElements: number
}

interface DeviceLocation {
    latitude: number;
    longitude: number;
    altitude: number;
    heading: number;
    status: DeviceStatus;
    deviceTime: string;
}