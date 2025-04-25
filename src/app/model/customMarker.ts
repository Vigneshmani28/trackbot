import { MapMarker } from "@angular/google-maps";
import { Tracker } from "./tracker";

export interface CustomMarker {
    position: google.maps.LatLngLiteral,
    bearing: number,
    tracker: Tracker,
    content: HTMLElement;
}