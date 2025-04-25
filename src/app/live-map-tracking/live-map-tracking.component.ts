import { Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapCircle, MapInfoWindow, MapMarker, MapPolygon, MapPolyline } from '@angular/google-maps';
import { DeviceStatus, Tracker, TrackerDetails } from '../model/tracker';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { RequestPlayback, TrackerDetailsComponent } from '../tracker-details/tracker-details.component';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { PlaybackBottomSheetComponent } from '../playback-bottom-sheet/playback-bottom-sheet.component';
import { Subject, Subscription, delay, timestamp } from 'rxjs';
import { TrackingBottomSheetComponent } from '../tracking-bottom-sheet/tracking-bottom-sheet.component';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMarker } from '../model/customMarker';
import { log } from 'console';
import { TrackerReportsComponent } from '../tracker-reports/tracker-reports.component';
import { TrackerSettingsComponent } from '../tracker-settings/tracker-settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';
import { PlaybackcontrolsbottomsheetComponent } from '../playbackcontrolsbottomsheet/playbackcontrolsbottomsheet.component';
import { MatDividerModule } from '@angular/material/divider';
import { AcknowledgeBottomContainerComponent } from '../acknowledge-bottom-container/acknowledge-bottom-container.component';
import { AcknowledgeBottomSheetService } from '../services/acknowledgeService/acknowledge-bottom-sheet.service';
import { TrackerChatComponent } from '../tracker-chat/tracker-chat.component';
import { MOCK_MARKER_GROUPS, MOCK_MARKERS } from '../mock-trackers';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CountryMenuComponent } from '../country-menu/country-menu.component';
import { KmlUploaderComponent } from '../kml-uploader/kml-uploader.component';

interface MarkerPlayback {
  id: string;
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

interface GeofenceTracker {
  id: number;
  name: string;
}

type PolygonGeofence = {
  type: 'polygon';
  name: string;
  color: string;
  paths: google.maps.LatLngLiteral[];
};

type CircleGeofence = {
  type: 'circle';
  name: string;
  color: string;
  center: google.maps.LatLngLiteral;
  radius: number;
};

type GeoFence = PolygonGeofence | CircleGeofence;

interface KmlPolylineData {
  path: google.maps.LatLngLiteral[];
  color: string;
}
interface FileWithColor {
  file: File;
  color: string;
}

@Component({
  selector: 'app-live-map-tracking',
  templateUrl: './live-map-tracking.component.html',
  styleUrl: './live-map-tracking.component.css',
  standalone: true,
  imports: [GoogleMap, CommonModule, MatCardModule, MapAdvancedMarker, MatSidenavModule, TrackerDetailsComponent, TrackerReportsComponent, TrackerSettingsComponent, MapInfoWindow, MatBottomSheetModule, MapPolyline, MatIconModule, MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatButtonModule,MatDialogContent, MatDialogActions, MatDividerModule, MapInfoWindow, TrackerChatComponent, FormsModule, MatTooltipModule, MapPolygon, MapMarker, MapCircle, MatSlideToggleModule, CountryMenuComponent, KmlUploaderComponent]
})
export class LiveMapTrackingComponent implements OnInit, OnDestroy, OnChanges {
  readonly REFRESH_TIME = 15 * 1000

  
//#region Geofence
  @Input() showGeoFenceView!: Subject<boolean>;
  showGeoFence = false;

  allGeofenceTrackers: GeofenceTracker[] = [];

  geofences: GeoFence[] = [
    {
      type: 'polygon',
      name: 'Chennai City',
      color: '#FF5733',
      paths: [
        { lat: 13.0827, lng: 80.2707 }, // Central Chennai
        { lat: 13.0879, lng: 80.2785 }, // North-east
        { lat: 13.0651, lng: 80.2871 }, // South-east
        { lat: 13.0500, lng: 80.2500 }, // South-west
        { lat: 13.0750, lng: 80.2300 }, // North-west
      ]
    }
  ];
  

  getPolygonCenter(paths: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    let latSum = 0;
    let lngSum = 0;

    paths.forEach(point => {
      latSum += point.lat;
      lngSum += point.lng;
    });

    return {
      lat: latSum / paths.length,
      lng: lngSum / paths.length,
    };
  }

  onPolygonClick(geofenceNumber: number): void {
    this.selectedGeofence = geofenceNumber;
    this.geofenceMenuShow = true;
    this.addGeoFenceShow = false;
    this.coordinates = [{ lat: null, lng: null }, { lat: null, lng: null }, { lat: null, lng: null }];
    this.geoFenceMarkers = this.coordinates.map(() => null);
    this.shapeName = '';
    this.selectedColor = '#ff0000';
    this.circleRadius = 500;
    this.isEditMode = false;
    this.editIndex = null;
    this.editType = null;
  }

circleCenter = { lat: 13.107995, lng: 80.096988 }; // Center point (e.g., CMBT)
circleRadius = 500; // radius in meters

geofenceMenuShow = false;
toggleGeofenceView() {
  this.geofenceMenuShow = !this.geofenceMenuShow;
}

selectedGeofence: number | null = null;

allocatedTrackersMap = new Map<number, GeofenceTracker[]>();

allocateTracker(trackerId: number): void {
  if (this.selectedGeofence === null) return;

  let allocatedTrackers = this.allocatedTrackersMap.get(this.selectedGeofence) || [];

  const tracker = this.filteredTrackerOptions.find(t => t.id === trackerId);
  if (!tracker) return;

  const isAlreadyAllocated = allocatedTrackers.some(t => t.id === tracker.id);
  if (isAlreadyAllocated) {
    this._snackBar.open('Tracker is already allocated to this geofence.', 'Close', {
      duration: 3000,
      panelClass: ['mat-warn'], 
    });
    return;
  }

  allocatedTrackers.push(tracker);
  this.allocatedTrackersMap.set(this.selectedGeofence, allocatedTrackers);
}

unallocateTracker(trackerId: number): void {
  if (this.selectedGeofence === null) return;

  let allocatedTrackers = this.allocatedTrackersMap.get(this.selectedGeofence) || [];
  allocatedTrackers = allocatedTrackers.filter(t => t.id !== trackerId);
  this.allocatedTrackersMap.set(this.selectedGeofence, allocatedTrackers);
}


shapeType = 'polygon';
isPolygon = this.shapeType === 'polygon';
shapeName = '';
selectedColor = '#ff0000';

coordinates: { lat: number | null; lng: number | null }[] = [
  { lat: null, lng: null },
  { lat: null, lng: null },
  { lat: null, lng: null }
];

addCoord() {
  this.coordinates.push({ lat: null, lng: null });
  this.geoFenceMarkers.push(null);
}

removeCoord(index: number) {
  this.coordinates.splice(index, 1);
  this.geoFenceMarkers.splice(index, 1);
}

geoFenceMarkers: (google.maps.LatLngLiteral | null)[] = this.coordinates.map(() => null);
activeGeoFenceCoordIndex: number | null = null;
activeGeoFenceCoordField: 'lat' | 'lng' | null = null;
showGeoFenceMarker = false;
geoFenceMarkerPosition: google.maps.LatLngLiteral | null = null;

onCoordFocus(index: number, field: 'lat' | 'lng') {
  this.activeGeoFenceCoordIndex = index;
  this.activeGeoFenceCoordField = field;
}

onCoordManualChange(index: number) {
  const coord = this.coordinates[index];
  if (coord.lat != null && coord.lng != null) {
    this.geoFenceMarkers[index] = { lat: coord.lat, lng: coord.lng };
  }
}

selectCoord(index: number, type: 'lat' | 'lng') {
  this.activeGeoFenceCoordIndex = index;
  this.showGeoFenceMarker = true;

  const coord = this.coordinates[index];
  if (coord.lat && coord.lng) {
    this.geoFenceMarkerPosition = { lat: coord.lat, lng: coord.lng };
  } else {
    this.geoFenceMarkerPosition = { lat: 0, lng: 0 };
  }
}

onMapClick(event: google.maps.MapMouseEvent) {
  if (!event.latLng || this.activeGeoFenceCoordIndex === null) return;

  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  const index = this.activeGeoFenceCoordIndex;
  this.coordinates[index] = { lat, lng };
  this.geoFenceMarkers[index] = { lat, lng };
}

draggingIndex: number | null = null;

defaultIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
};

highlightedIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
};

onMarkerDrag(event: google.maps.MapMouseEvent, index: number) {
  if (!event.latLng) return;

  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  this.coordinates[index] = { lat, lng };
  this.geoFenceMarkers[index] = { lat, lng };

  this.draggingIndex = null; 
}

onDragStart(index: number) {
  this.draggingIndex = index;
}

addGeoFenceShow = false;

addGeoFenceScreenToggle() {
this.addGeoFenceShow = !this.addGeoFenceShow
this.geofenceMenuShow = false;
this.coordinates = [{ lat: null, lng: null }, { lat: null, lng: null }, { lat: null, lng: null }];
this.geoFenceMarkers = this.coordinates.map(() => null);
this.shapeName = '';
this.selectedColor = '#ff0000';
this.circleRadius = 500;
this.isEditMode = false;
this.editIndex = null;
this.editType = null;
}

getValidPolygonPaths(): google.maps.LatLngLiteral[] {
  return this.geoFenceMarkers.filter((m): m is google.maps.LatLngLiteral => m !== null);
}

submitGeoFence() {
  if (!this.shapeName){
    this._snackBar.open('Geofence name required', '', {
      duration: 2000,
    });
    
    return
  }

  if (this.isPolygon) {
    const validCoords = this.coordinates.filter(c => c.lat != null && c.lng != null) as google.maps.LatLngLiteral[];
    if (validCoords.length < 3) {
      alert('Polygon requires at least 3 coordinates');
      return;
    }

    const polygon: PolygonGeofence = {
      type: 'polygon',
      paths: validCoords,
      name: this.shapeName,
      color: this.selectedColor
    };

    if (this.isEditMode && this.editIndex !== null) {
      this.geofences[this.editIndex] = polygon;
    } else {
      this.geofences.push(polygon);
    }

  } else {
    const center = this.coordinates[0];
    if (!center?.lat || !center?.lng || !this.circleRadius) {
      alert('Circle requires center and radius');
      return;
    }

    const circle: CircleGeofence = {
      type: 'circle',
      center: center as google.maps.LatLngLiteral,
      radius: this.circleRadius,
      name: this.shapeName,
      color: this.selectedColor
    };

    if (this.isEditMode && this.editIndex !== null) {
      this.geofences[this.editIndex] = circle;
    } else {
      this.geofences.push(circle);
    }
  }

  this.resetForm();
}



isEditMode = false;
editIndex: number | null = null;
editType: 'polygon' | 'circle' | null = null;

editGeofence() {
  if (this.selectedGeofence == null) return;

  const geofence = this.geofences[this.selectedGeofence];
  this.isEditMode = true;
  this.editIndex = this.selectedGeofence;
  this.addGeoFenceShow = true;

  if (geofence.type === 'polygon') {
    this.coordinates = geofence.paths.map(p => ({ ...p }));
    this.geoFenceMarkers = geofence.paths.map(p => ({ ...p }));
    this.shapeName = geofence.name;
    this.selectedColor = geofence.color;
    this.shapeType = 'polygon';
    this.isPolygon = true;
    this.editType = 'polygon';
  } else if (geofence.type === 'circle') {
    this.coordinates = [{ ...geofence.center }];
    this.geoFenceMarkers = [{ ...geofence.center }];
    this.circleRadius = geofence.radius;
    this.shapeName = geofence.name;
    this.selectedColor = geofence.color;
    this.shapeType = 'circle';
    this.isPolygon = false;
    this.editType = 'circle';
  }
}

deleteGeofence() {
  if (this.selectedGeofence == null) return;

  this.geofences.splice(this.selectedGeofence, 1);
  this.geofenceMenuShow = false;
  this.selectedGeofence = null;
}

resetForm() {
  this.coordinates = [{ lat: null, lng: null }, { lat: null, lng: null }, { lat: null, lng: null }];
  this.geoFenceMarkers = this.coordinates.map(() => null);
  this.shapeName = '';
  this.selectedColor = '#ff0000';
  this.circleRadius = 500;
  this.isEditMode = false;
  this.editIndex = null;
  this.editType = null;
  this.addGeoFenceShow = false;
}
//#endregion

//#region kml upload

kmlMarkers: { position: google.maps.LatLngLiteral; label: string }[] = [];
kmlPolylinePaths: KmlPolylineData[] = [];
selectedKmlPolylineColor = '#ff0000';

handleKmlFiles(filesWithColors: FileWithColor[] | null) {
  if (!filesWithColors || filesWithColors.length === 0) {
    this.kmlMarkers = [];
    this.kmlPolylinePaths = [];
    this.zoom = 5;
    this.center = { lat: 12.82342, lng: 80.04548 };
    return;
  }

  this.kmlMarkers = [];
  this.kmlPolylinePaths = [];

  filesWithColors.forEach(({ file, color }) => {
    const reader = new FileReader();

    reader.onload = () => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(reader.result as string, 'application/xml');

      const placemarks = Array.from(xml.getElementsByTagName('Placemark'));

      const markers = placemarks
        .filter(p => p.getElementsByTagName('Point').length > 0)
        .map(p => {
          const name = p.getElementsByTagName('name')[0]?.textContent ?? 'Unnamed';
          const coord = p.getElementsByTagName('coordinates')[0]?.textContent?.trim();
          if (!coord) return null;
          const [lng, lat] = coord.split(',').map(Number);
          return { position: { lat, lng }, label: name };
        })
        .filter(Boolean) as { position: google.maps.LatLngLiteral; label: string }[];

      const polylinePlacemarks = placemarks.filter(p => p.getElementsByTagName('LineString').length > 0);

      polylinePlacemarks.forEach(p => {
        const coordText = p.getElementsByTagName('coordinates')[0]?.textContent?.trim();
        if (coordText) {
          const path: google.maps.LatLngLiteral[] = [];
          coordText.split(/\s+/).forEach(c => {
            const [lng, lat] = c.split(',').map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
              path.push({ lat, lng });
            }
          });

          if (path.length) {
            this.kmlPolylinePaths.push({ path, color });
          }
        }
      });

      this.kmlMarkers.push(...markers);

      // Set map center on first file’s first polyline
      if (this.kmlPolylinePaths.length && this.kmlPolylinePaths[0].path.length) {
        this.center = this.kmlPolylinePaths[0].path[0];
        this.zoom = 12;
      }
    };

    reader.readAsText(file);
  });
}

handleColorChange(color: string) {
  this.selectedKmlPolylineColor = color;
}

//#endregion

  trackers: Tracker[] = [];
  @ViewChild(MatDrawer) matDrawer!: MatDrawer;
  @Input() switchScreen!: Subject<boolean>
  @Input() showMessageBox!: Subject<boolean>;
  @Input() trackerName!: string|null
  @Input() onSwitchView!: () => void;
  @Input() showKMLFileUploader!: Subject<boolean>;
  @Input() showWeather!: Subject<boolean>;
  autoZoom = true;
  totalTrackers = ""
  activeTrackers = ""
  inActiveTrackers = ""
  sleepTrackers = ""
  alertTrackers = ""

  center: google.maps.LatLngLiteral = { lat: 12.82342, lng: 80.04548 };
  activeMarkerId: string | null = null;
 // Store paths based on tracker IDs
dynamicRoutePathMap: { [trackerId: string]: google.maps.LatLngLiteral[] } = {};

lastTenRoutePathMap: { [trackerId: string]: google.maps.LatLngLiteral[] } = {};

  lastTenPointMarkers: { position: google.maps.LatLngLiteral; content: HTMLImageElement | null }[] = [];
  crossedPointMarkers: { position: google.maps.LatLngLiteral; content: HTMLImageElement }[] = [];

  polylineOptions = {
    strokeColor: "#0E53FF",
    strokeOpacity: 1.0,
    strokeWeight: 4
  };

  polylineOptionsMap: { [key: string]: any } = {};

  pathMap: { [trackerId: string]: google.maps.LatLngLiteral[] } = {
    "ELB1005": [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9720, lng: 77.5950 }
    ],
    "ELB1006": [
      { lat: 13.0827, lng: 80.2707 },
      { lat: 13.0830, lng: 80.2710 }
    ]
  };
  
  markersData = MOCK_MARKERS;
  groupsMarkerData = MOCK_MARKER_GROUPS;

  redMarker: { position: google.maps.LatLngLiteral; content: HTMLImageElement } | null = null;
  midpointMarker: google.maps.LatLngLiteral | null = null;
  distanceText: string = '';
  distanceContent: Node | null = null;
  @ViewChild('distanceTemplate', { static: true }) distanceTemplate!: TemplateRef<any>;
  isMeasureDistanceChecked = true;

  showAcknowledgement = false;
  showTrackerName = true;
  selectedLastTenTrackerId = new Set<string>(); ;
  selectedLastFewTrackerIds: Set<string> = new Set();

  showTrackerOptions = false;

  selectedAcknowledgeTracker : any;
   acknowledgeTrackers = [
    { name: 'ELB10004', trackerName: 'Tracker A', alertReceived: '2024-03-26 14:30:00', lat: '12.9716', lng: '77.5946', timeAgo: '5 min ago' },
    { name: 'ELB10005', trackerName: 'Tracker B', alertReceived: '2024-03-26 14:25:00', lat: '13.0827', lng: '80.2707', timeAgo: '10 min ago' },
    { name: 'ELB10006', trackerName: 'Tracker C', alertReceived: '2024-03-26 14:20:00', lat: '19.0760', lng: '72.8777', timeAgo: '15 min ago' },
    { name: 'ELB10007', trackerName: 'Tracker D', alertReceived: '2024-03-26 14:15:00', lat: '28.7041', lng: '77.1025', timeAgo: '20 min ago' },
  ];

  showMessages = false;

  messages = [
    { id: 1, trackerId: 'ELB1005', trackerName: 'Tracker 5', text: 'Sample message 1' },
    { id: 2, trackerId: 'ELB1005', trackerName: 'Tracker 5', text: 'Sample message 2' },
    { id: 3, trackerId: 'ELB1006', trackerName: 'Tracker 6', text: 'Sample message 3' },
    { id: 4, trackerId: 'ELB1006', trackerName: 'Tracker 6', text: 'Sample message 4' },
    { id: 5, trackerId: 'ELB1005', trackerName: 'Tracker 5', text: 'Sample message 5' }
  ];

  activeMarker!: MarkerPlayback;
  startMarkerPosition: google.maps.LatLngLiteral | null = null;
  endMarkerPosition: google.maps.LatLngLiteral | null = null;

  currentTracker: Tracker | undefined
  currentMockMarker: MarkerPlayback | undefined
  zoom = 5;
  isDrawerOpened = false;
  bottomSheetRef: MatBottomSheetRef | undefined
  playbackRequest: RequestPlayback | undefined
  vertices: google.maps.LatLngLiteral[] | undefined
  currentTrackingMarker: CustomMarker | undefined
  subscription: Subscription | undefined
  timer: undefined | NodeJS.Timeout
  map?: google.maps.Map;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('groupInput') groupInput!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  myGroupControl = new FormControl('');
  options: any[] = [];
  filteredTrackerOptions!: any[];

  groupTrackerOptions: any[] = [];
  filteredGroupTrackerOptions!: any[];

  // markers holder
  markers: CustomMarker[] = [] // empty list

  @ViewChild('drawer') drawer!: MatDrawer;
  trackerListShow = false;
  selectedView: string = 'Trackers';
  showDropdown: boolean = false;
  selectAllTrackerChecked: boolean = false;
  selectedTrackers = new Map<string, boolean>();
  selectedGroups = new Map<string, boolean>();

  trackerOptionss = [
    { id: 'Tracker1', name: 'Tracker 1', isChecked: false },
    { id: 'Tracker2', name: 'Tracker 2', isChecked: false }
  ];
  
  groupOptions = [
    { id: 'Group1', name: 'Group 1' },
    { id: 'Group2', name: 'Group 2' }
  ];
  
  trackerOptions = [
    { name: "Show Geofence", isChecked: false },
    { name: "Show point of interest", isChecked: false },
    { name: "Measure Distance", isChecked: false },
    { name: "Display DeviceName on Marker", isChecked: false }
  ];

  mapMoveable: boolean = true;

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: !this.mapMoveable,
    draggable: this.mapMoveable,
    scrollwheel: this.mapMoveable,
    disableDoubleClickZoom: !this.mapMoveable,
    gestureHandling: this.mapMoveable ? 'auto' : 'none'
  };
  

  currentView: 'main' | 'reports' | 'settings' | 'chat' = 'main';

  openDrawer() {
    this.drawer.open();
    this.currentView = 'main';
  }

  setView(view: 'main' | 'reports' | 'settings' | 'chat') {
    this.currentView = view;
  }

  getIcon(rotation: number) {    
    let icon = document.createElement('img');
    icon.src = "/assets/car_top.png";
    icon.style.transform = 'rotate(' + rotation + 'deg)';
    return icon
  }

  trackerListShowToggle() {
    this.trackerListShow = !this.trackerListShow;
  }

  //#region aiport selection
  selectedAirport: { lat: number; lng: number; name: string } | null = null;

  updateMap(airport: { lat: number; lng: number; name: string }) {
    this.selectedAirport = airport;
    console.log('received airports', this.selectedAirport)

    this.center = { lat: airport.lat, lng: airport.lng };
    this.zoom = 15; 

  }

  onResetMap() {
    this.selectedAirport = null;
    this.center = { lat: 12.82342, lng: 80.04548 };
    this.zoom = 5;
  }
  //#endregion

  private dialogRef?: MatDialogRef<any>;
  
  constructor(private dialog: MatDialog,
    private playbackBottomSheet: MatBottomSheet,
    private trackerService: TrackersService,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private acknowledgeBottomSheet: AcknowledgeBottomSheetService
  ) { 
    this.filteredTrackerOptions = this.options.slice()
    this.filteredGroupTrackerOptions = this.groupOptions.slice();
  }

  openDialog(template: TemplateRef<any>, width: string = '300px') {
    this.dialogRef = this.dialog.open(template, { width });
  }

  acknowledgeCloseDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openAcknowledgeDialog(dialogTemplate: TemplateRef<any>, tracker: any) {
    this.selectedAcknowledgeTracker = tracker;
    this.openDialog(dialogTemplate, '350px');
  }

  acknowledgeClick(trackerName: string) {
    this.acknowledgeTrackers = this.acknowledgeTrackers.filter(t => t.name !== trackerName);
    this.acknowledgeCloseDialog();
  }

  changePolylineColor(event: Event, trackerId: string, who?:string) {
    if(who === 'groups'){
      const groups = this.groupsMarkerData.find(t => t.id === trackerId);
      if (!groups) return;

      const inputElement = event.target as HTMLInputElement;

      this.polylineOptionsMap = {
        ...this.polylineOptionsMap,
        ...Object.fromEntries(groups.markers.map(i => [
          i.id,
          {
            ...(this.polylineOptionsMap[i.id] || {}), 
            strokeColor: inputElement.value,
            strokeOpacity: 1.0,
            strokeWeight: 4
          }
        ]))
    };

    }
    const inputElement = event.target as HTMLInputElement;
    this.polylineOptionsMap = {
      ...this.polylineOptionsMap,
      [trackerId]: {
        ...(this.polylineOptionsMap[trackerId] || {}), 
        strokeColor: inputElement.value,
        strokeOpacity: 1.0,
        strokeWeight: 4
      }
    };

    this.cdr.detectChanges();
  }
  
  setActiveMarker(markerId: string): void {
    const selectedMarker = this.markersData.find(marker => marker.id === markerId);
    if (selectedMarker) {
        this.activeMarker = selectedMarker;
    }
    this.cdr.detectChanges();
}

getPositionTitle(position: { lat: number; lng: number }): string {
  return `Lat: ${position.lat}, Lng: ${position.lng}`;
}  



showFullRoute(): void {
  if (!this.activeMarker || this.activeMarker.filteredTrackingData.length === 0) return;
  
  this.dynamicRoutePathMap[this.activeMarker.id] = this.activeMarker.filteredTrackingData.map(data => ({ lat: data.lat, lng: data.lng }));
  
  this.activeMarker.currentMarkerPosition = this.dynamicRoutePathMap[this.activeMarker.id][this.dynamicRoutePathMap[this.activeMarker.id].length - 1];
  this.center = { ...this.activeMarker.currentMarkerPosition };
  
  this.crossedPointMarkers = [];
  for (let i = 1; i < this.dynamicRoutePathMap[this.activeMarker.id].length; i++) {
    const start = this.dynamicRoutePathMap[this.activeMarker.id][i - 1];
    const end = this.dynamicRoutePathMap[this.activeMarker.id][i];
    
    const imgTag = new Image();
    imgTag.src = "assets/navigation-black.svg";
    imgTag.width = 20;
    imgTag.height = 20;
    
    const markerBearing = this.calculateBearing(start, end);
    imgTag.style.transform = `rotate(${markerBearing}deg)`;
    
    this.crossedPointMarkers.push({
      position: end,
      content: imgTag
    });
  }
  
  if (this.dynamicRoutePathMap[this.activeMarker.id].length > 1) {
    const lastBearing = this.calculateBearing(
      this.dynamicRoutePathMap[this.activeMarker.id][this.dynamicRoutePathMap[this.activeMarker.id].length - 2],
      this.dynamicRoutePathMap[this.activeMarker.id][this.dynamicRoutePathMap[this.activeMarker.id].length - 1]
    );
    this.updateMarkerRotation(this.activeMarker, lastBearing);
  }
  
  this.cdr.detectChanges();
}


play(): void {
  this.zoom = 18;
  if (!this.activeMarker || this.activeMarker.isPlaying || this.activeMarker.filteredTrackingData.length === 0) return;
  this.activeMarker.isPlaying = true;

  const animateToNextPoint = (index: number, startProgress = 0) => {
    if (!this.activeMarker.isPlaying || index >= this.activeMarker.filteredTrackingData.length - 1) {
      this.pause();
      return;
    }

    const start = this.activeMarker.filteredTrackingData[index];
    const end = this.activeMarker.filteredTrackingData[index + 1];
    const duration = 5000 / this.activeMarker.speedMultiplier;
    const startTime = performance.now() - (startProgress * duration);

    const animateStep = (timestamp: number) => {
      if (!this.activeMarker.isPlaying) {
        this.activeMarker.pausedProgress = (timestamp - startTime) / duration;
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.activeMarker.currentMarkerPosition = {
        lat: start.lat + (end.lat - start.lat) * progress,
        lng: start.lng + (end.lng - start.lng) * progress
      };

      this.center = {...this.activeMarker.currentMarkerPosition};

      this.dynamicRoutePathMap[this.activeMarker.id] = [
        ...this.activeMarker.filteredTrackingData.slice(0, this.activeMarker.currentIndex + 1),
        this.activeMarker.currentMarkerPosition
      ];

      if (
        progress === 1 &&
        index + 1 < this.activeMarker.filteredTrackingData.length - 1 && 
        !this.crossedPointMarkers.some(m => m.position.lat === end.lat && m.position.lng === end.lng)
      ) {
        const imgTag = new Image();
        imgTag.src = "assets/navigation-black.svg";
        imgTag.width = 20;
        imgTag.height = 20;

        const markerBearing = this.calculateBearing(start, end);
        imgTag.style.transform = `rotate(${markerBearing}deg)`;
      
        this.crossedPointMarkers.push({
          position: end,
          content: imgTag
        });
      }

      // Calculate bearing and update marker rotation
      const bearing = this.calculateBearing(start, end);
      this.updateMarkerRotation(this.activeMarker, bearing);

      this.cdr.detectChanges();

      if (progress < 1) {
        this.activeMarker.animationFrame = requestAnimationFrame(animateStep);
      } else {
        this.activeMarker.pausedProgress = 0;
        this.activeMarker.currentIndex = index + 1;
        animateToNextPoint(this.activeMarker.currentIndex);
      }
    };

    requestAnimationFrame(animateStep);
  };

  animateToNextPoint(this.activeMarker.currentIndex, this.activeMarker.pausedProgress);
}

private updateMarkerRotation(marker: MarkerPlayback, bearing: number): void {
  const imgTag = marker.content as HTMLImageElement;
  imgTag.style.transform = `rotate(${bearing}deg)`;
}

pause(): void {
  this.zoom = 18;
  if (!this.activeMarker) return;
  this.activeMarker.isPlaying = false;
  if (this.activeMarker.animationFrame) cancelAnimationFrame(this.activeMarker.animationFrame);
}

reverse(): void {
  if (!this.activeMarker || this.activeMarker.currentIndex === 0) return;
  this.activeMarker.speedMultiplier = 1;
  this.pause();
  this.activeMarker.currentIndex -= 1;
  this.activeMarker.currentMarkerPosition = { ...this.activeMarker.filteredTrackingData[this.activeMarker.currentIndex] };
  if (this.crossedPointMarkers.length > 0) {
    this.crossedPointMarkers.pop();
  }
  if (this.dynamicRoutePathMap[this.activeMarker.id].length > 0) {
    this.dynamicRoutePathMap[this.activeMarker.id] = [...this.dynamicRoutePathMap[this.activeMarker.id].slice(0, -1)];
  }
  this.cdr.detectChanges();
}

fastForward(speedValue?: number): void {  
  
  if (!this.activeMarker) return;

  if (speedValue !== undefined) {
    this.activeMarker.speedMultiplier = speedValue;
  } else {
    this.activeMarker.speedMultiplier = Math.min(this.activeMarker.speedMultiplier * 2, 10);
  }


  if (this.activeMarker.isPlaying) {
    this.pause();
    this.play();
  }
}

  ngOnInit(): void {
    this.isPolygon = this.shapeType === 'polygon';

    this.subscription = this.showGeoFenceView.subscribe((value:boolean) => {
      this.showGeoFence = value;
      console.log(this.geofences)
      if (this.showGeoFence && this.geofences.length > 0) {
        const firstGeo = this.geofences[0];
      
        if (firstGeo.type === 'polygon' && firstGeo.paths.length > 0) {
          this.center = firstGeo.paths[0]; 
          this.zoom = 14;
        } else if (firstGeo.type === 'circle') {
          this.center = firstGeo.center;
          this.zoom = 14;
        }
      }
      
    })

    this.subscription = this.showMessageBox.subscribe((value:boolean) => {
      this.showMessages = value;
    })
    
    // Measure distance toggle
    this.acknowledgeBottomSheet.measureDistance$.subscribe((value) => {   
        this.isMeasureDistanceChecked = value;
    })

    const navigationIcon = "assets/navigation.svg";

    this.markersData.forEach((location) => {
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
  
      if (this.showTrackerName) {
        const label = document.createElement("div");
        label.innerText = `${location.id}`; 
        label.style.backgroundColor = "white";
        label.style.padding = "2px 5px";
        label.style.borderRadius = "4px";
        label.style.fontSize = "12px";
        label.style.fontWeight = "bold";
        label.style.textAlign = "center";
        label.style.marginBottom = "2px";
        label.style.boxShadow = "0px 0px 2px rgba(0,0,0,0.5)";
        container.appendChild(label);
      }
  
      const imgTag = document.createElement("img");
      imgTag.src = navigationIcon;
      imgTag.width = 26;
      imgTag.height = 26;
  
      container.appendChild(imgTag);
      location.content = container;
    });    
   
    this.crossedPointMarkers.forEach((marker) => {
      const imgTag = new Image();
      imgTag.src = "assets/navigation-black.svg";
      imgTag.width = 20;
      imgTag.height = 20;
      marker.content = imgTag;
    });

    this.switchScreen.subscribe(it => {
      this.bottomSheetRef?.dismiss()      
    })

    this.trackerService.trackers().subscribe({
      next : (result) => {
        // here the data used by Mock not the actual api data
        this.options = this.markersData;
        this.filteredTrackerOptions = [...this.markersData];
        this.groupOptions = this.groupsMarkerData;
        this.filteredGroupTrackerOptions = [...this.groupsMarkerData];

        this.toggleSelectAll();
      }
    })


    // setTimeout(() => {
    //   // this.markers=this.newMarkersPosition

    //   this.updateMarker("664857f4e86a13620986fc781", {
    //     tracker: {
    //       deviceName: "ELB1012",
    //       latitude: 37.8049,
    //       longitude: -122.4294,
    //       heading: 200,
    //       lastUpdatedDeviceTime: "20240230T055960",
    //       status: DeviceStatus.ACTIVE,
    //       deviceId: "3"
    //     }
    //   })

    //   this.moveMarker(this.markers[0], 10000)

    // }, 4000);

  }

  deviceInterval(event:any){
    console.log('device interval received', event)
  }

  onTrackerOptionChange(tracker: any): void {    
    if (tracker.name === "Display DeviceName on Marker") {
      this.showTrackerName = tracker.isChecked;
      this.updateMarkerLabels();
    }
  }  

  updateMarkerLabels(): void {
    const navigationIcon = "assets/navigation.svg";
  
    this.markersData.forEach((location) => {
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
  
      if (this.showTrackerName) {
        const label = document.createElement("div");
        label.innerText = `${location.deviceName}`; 
        label.style.backgroundColor = "white";
        label.style.padding = "2px 5px";
        label.style.borderRadius = "4px";
        label.style.fontSize = "12px";
        label.style.fontWeight = "bold";
        label.style.textAlign = "center";
        label.style.marginBottom = "2px";
        label.style.boxShadow = "0px 0px 2px rgba(0,0,0,0.5)";
        container.appendChild(label);
      } else {
        const label = document.createElement("div");
        label.innerText = `${location.id}`; 
        label.style.backgroundColor = "white";
        label.style.padding = "2px 5px";
        label.style.borderRadius = "4px";
        label.style.fontSize = "12px";
        label.style.fontWeight = "bold";
        label.style.textAlign = "center";
        label.style.marginBottom = "2px";
        label.style.boxShadow = "0px 0px 2px rgba(0,0,0,0.5)";
        container.appendChild(label);
      }
  
      const imgTag = document.createElement("img");
      imgTag.src = navigationIcon;
      imgTag.width = 26;
      imgTag.height = 26;
  
      container.appendChild(imgTag);
      location.content = container;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.shapeType = this.isPolygon ? 'polygon' : 'circle';
    
    if(changes['trackerName'] && changes['trackerName'].currentValue !== changes['trackerName'].previousValue){            
      if (!this.trackerName) {
        this.stopTracking();
        this.zoom = 5;
        this.center = { lat: 12.82342, lng: 80.04548 };
      } else {
        this.fetchTrackerData();
      }
      
    }
  }

// actual

  // fetchTrackerData(): void {
  //   this.trackerService.getTracker().subscribe({
  //     next: (result) => {
  //       const tracker = result.find(device => device.id === this.trackerName);
  //       if (tracker) {
  //         this.trackerSelected(tracker);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching trackers', err);
  //     }
  //   });
  // }

  fetchTrackerData(): void {
    this.trackerService.trackers().subscribe({
      next: (result) => {        
        const tracker = result.find(device => device.deviceName === this.trackerName);
        
        if (tracker) {
          this.trackerSelected(tracker);
        }
      },
      error: (err) => {
        console.error('Error fetching trackers', err);
      }
    });
  }

  checkMarkersAvailable(deviceId: String): CustomMarker | undefined {

    let marker = this.markers.find((value) => value.tracker.deviceId === deviceId)
    return marker
  }

  // move marker
  moveMarker(customMarker: CustomMarker, duration: number): void {

    //  const startCoords: google.maps.LatLngLiteral,
    //  let endCoords: google.maps.LatLngLiteral
    const startTime = performance.now();

    if (customMarker.position == null) {
      customMarker.position = { lat: customMarker.tracker.latitude, lng: customMarker.tracker.longitude }
    }
    // current position
    const startLat = customMarker.position.lat;
    const startLng = customMarker.position.lng;

    // new position
    customMarker.position.lat = customMarker.tracker.latitude
    customMarker.position.lng = customMarker.tracker.longitude

    // destination point -starting point.
    const deltaLat = customMarker.tracker.latitude - startLat;
    const deltaLng = customMarker.tracker.longitude - startLng;
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      customMarker.position = {
        lat: startLat + (deltaLat * progress),
        lng: startLng + (deltaLng * progress)
      };
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  mapInitialized(map: google.maps.Map) {
    // this.map = map;
    let refresh: () => void = () => {
      this.subscription = this.trackerService.trackers().subscribe({
        next: (result) => {
          this.populateTrackers(result, map)
          this.timer = setTimeout(refresh, this.REFRESH_TIME)
        },
        error: (err) => {
          this._snackBar.open("Something went wrong!", "OK")
        }
      })
    }    
    refresh();
  }

  populateTrackers(it: Tracker[], map: google.maps.Map) {
    this.ngZone.run(() => {
      this.trackers = it;
      this.totalTrackers = this.trackers.length < 10 ? '0' + this.trackers.length : this.trackers.length.toString()
      this.activeTrackers = this.getCount(this.trackers, DeviceStatus.ACTIVE)
      this.inActiveTrackers = this.getCount(this.trackers, DeviceStatus.OFFLINE)
      this.sleepTrackers = this.getCount(this.trackers, DeviceStatus.SLEEP)
      this.alertTrackers = this.getCount(this.trackers, DeviceStatus.ALERT)

      this.processData(this.trackers)
      if (this.currentTrackingMarker) {
        this.currentTrackingMarker = this.markers.find((value) => value.tracker.deviceId == this.currentTrackingMarker!.tracker.deviceId)
        this.map?.setCenter({ lat: this.currentTrackingMarker!.tracker.latitude, lng: this.currentTrackingMarker!.tracker.longitude })
        this.moveMarker(this.currentTrackingMarker!, 5000)
      }
    })
    if (this.autoZoom) {
      this.fitTrackersInMap()
      this.autoZoom = false;
    }
  }


  // Function to calculate bearing between two coordinates
  // calculateBearing(customMarker: CustomMarker) {
  //   var startLatRad = this.toRadians(customMarker.position.lat);
  //   var startLngRad = this.toRadians(customMarker.position.lng);
  //   var endLatRad = this.toRadians(customMarker.tracker.latitude);
  //   var endLngRad = this.toRadians(customMarker.tracker.longitude);

  //   var dLng = endLngRad - startLngRad;

  //   var y = Math.sin(dLng) * Math.cos(endLatRad);
  //   var x = Math.cos(startLatRad) * Math.sin(endLatRad) - Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(dLng);
  //   var bearingRad = Math.atan2(y, x);
  //   var bearingDeg = (this.toDegrees(bearingRad) + 360) % 360; // Convert to degrees and normalize to 0-360

  //   return bearingDeg;
  // }
  // // to radians
  // toRadians(degrees: number) {
  //   return degrees * (Math.PI / 180);
  // }
  // // to degrees
  // toDegrees(radians: number) {
  //   return radians * (180 / Math.PI);
  // }

  private calculateBearing(start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral): number {
    const startLat = this.toRadians(start.lat);
    const startLng = this.toRadians(start.lng);
    const endLat = this.toRadians(end.lat);
    const endLng = this.toRadians(end.lng);
  
    const y = Math.sin(endLng - startLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
    const bearing = Math.atan2(y, x);
    return (this.toDegrees(bearing) + 360) % 360;
  }
  
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  private toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  createCustomMarkerContent(tracker: Tracker): HTMLElement {
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
  
    if (this.showTrackerName) {
      const label = document.createElement("div");
      label.innerText = `${tracker.deviceName}`;
      label.style.backgroundColor = "white";
      label.style.padding = "2px 5px";
      label.style.borderRadius = "4px";
      label.style.fontSize = "12px";
      label.style.fontWeight = "bold";
      label.style.textAlign = "center";
      label.style.marginBottom = "2px";
      label.style.boxShadow = "0px 0px 2px rgba(0,0,0,0.5)";
      container.appendChild(label);
    }
  
    const imgTag = document.createElement("img");
    imgTag.src = 'assets/navigation.svg';
    imgTag.width = 26;
    imgTag.height = 26;
    container.appendChild(imgTag);
  
    return container;
  }
  

  processData(trackers: Tracker[]) {

    trackers.forEach(_tracker => {

      let marker = this.checkMarkersAvailable(_tracker.deviceId)

      if (!marker) {
        let newCusMarker: CustomMarker = {
          tracker: _tracker,
          position: { lat: _tracker.latitude, lng: _tracker.longitude },
          bearing: _tracker.heading,
          content: this.createCustomMarkerContent(_tracker)

        }
        this.markers.push(newCusMarker)
      } else {
        marker.tracker = _tracker
        // update only new bearing value in custom marker
        if (marker.position.lat != marker.tracker.latitude || marker.position.lng != marker.tracker.longitude)
          // this.updateBearingValue(marker)
        this.moveMarker(this.checkMarkersAvailable(_tracker.deviceId)!, 5000)
      }
      this.cdr.detectChanges(); 




    })
  }

  fitTrackersInMap() {
    let bounds = new google.maps.LatLngBounds();
    this.trackers.forEach(item => {
      bounds.extend(new google.maps.LatLng(item.latitude, item.longitude))
    })
    this.map?.fitBounds(bounds, 16)
  }

  getCount(list: Tracker[], status: DeviceStatus): string {
    let count = list.filter(it => it.status === status).length
    return count < 10 ? '0' + count : count.toString()
  }


  onDateRangeChange(range: { from: Date; to: Date }): void {
    this.zoom = 18;

    const videoMode = (range as any).videoMode ?? false; 

    const fromLocal = new Date(range.from.getTime() - range.from.getTimezoneOffset() * 60000);
    const toLocal = new Date(range.to.getTime() - range.to.getTimezoneOffset() * 60000);

    this.activeMarker.filteredTrackingData = this.activeMarker.trackingData.filter(({ timestamp }) => {
      const pointTime = new Date(timestamp).getTime();
      return pointTime >= fromLocal.getTime() && pointTime <= toLocal.getTime();
    });

    if (this.activeMarker.filteredTrackingData.length > 0) {
      this.activeMarker.currentMarkerPosition = { ...this.activeMarker.filteredTrackingData[0] };
    }

    if (this.activeMarker.filteredTrackingData.length > 0) {
      this.activeMarker.currentMarkerPosition = { ...this.activeMarker.filteredTrackingData[0] };
      this.startMarkerPosition = { ...this.activeMarker.filteredTrackingData[0] };
      this.endMarkerPosition = { ...this.activeMarker.filteredTrackingData[this.activeMarker.filteredTrackingData.length - 1] };

      const mapCenter = this.activeMarker.currentMarkerPosition;
      this.center = { lat: mapCenter.lat, lng: mapCenter.lng }
      this.matDrawer.toggle()
    }
    
    this.cdr.detectChanges();
    
    this.playbackBottomSheet.open(PlaybackcontrolsbottomsheetComponent, {
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'full-width-bottom-sheet', 
      data : {videoMode}
    }).afterDismissed().subscribe(() => {
      this.dynamicRoutePathMap = {};
      this.crossedPointMarkers = [];
      this.setMoveMap(true);
      this.startMarkerPosition = null;
      this.endMarkerPosition = null;
      if (this.activeMarker) {
        this.activeMarker.currentIndex = 0;
        this.activeMarker.pausedProgress = 0; 
        this.activeMarker.isPlaying = false; 
        this.activeMarker.speedMultiplier = 1; 
  
        if (this.activeMarker.trackingData.length > 0) {
          this.activeMarker.currentMarkerPosition = { ...this.activeMarker.trackingData[0] };
          this.zoom = 5;
        }
      }
      this.cdr.detectChanges();
    });
  }

  // actual

  // gotoMarker(trackerId:string){
  //   if (this.activeMarkerId === trackerId) {
  //     this.zoom = 5;
  //     this.center =  { lat: 12.82342, lng: 80.04548 };
  //     this.activeMarkerId = null; 
  // } else {
  //     const tracker = this.markersData.find(t => t.id === trackerId)?.trackingData;
  //     if (tracker) {
  //         this.zoom = 18;
  //         this.center = {
  //             lat: tracker[0].lat,
  //             lng: tracker[0].lng
  //         };
  //         this.activeMarkerId = trackerId;
  //     }
  // }
  // }
  gotoMarker(trackerId:string){
    if (this.activeMarkerId === trackerId) {
      this.zoom = 5;
      this.center =  { lat: 12.82342, lng: 80.04548 };
      this.activeMarkerId = null; 
  } else {
      const tracker = this.markers.find(t => t.tracker.deviceName === trackerId);
      if (tracker) {
          this.zoom = 18;
          this.center = {
              lat: tracker.position.lat,
              lng: tracker.position.lng
          };
          this.activeMarkerId = trackerId;
      }
  }
  }

  markerClick(trackerId: string) {   
    if (this.dynamicRoutePathMap[trackerId] && this.dynamicRoutePathMap[trackerId].length>0) {
        console.log('Click blocked: Already active marker');
        return;
    }

    this.setActiveMarker(trackerId);
    this.currentTracker = this.markers.find(t => t.tracker.deviceName === trackerId)?.tracker;
    this.currentMockMarker = this.markersData.find(t => t.id === trackerId);
    
    this.matDrawer.toggle();
}

oldMarkerClick(tracker: Tracker) { 
  this.setActiveMarker(tracker.deviceName);
  this.currentMockMarker = this.markersData.find(t => t.id === tracker.deviceName); 

  this.currentTracker = tracker
  this.matDrawer.toggle()
}


  setMoveMap(value: boolean): void {
    this.mapMoveable = value;
    
    this.mapOptions = {
      ...this.mapOptions,
      disableDefaultUI: !this.mapMoveable,
      draggable: this.mapMoveable,
      scrollwheel: this.mapMoveable,
      disableDoubleClickZoom: !this.mapMoveable,
      gestureHandling: this.mapMoveable ? 'auto' : 'none'
    };
  }

  closeDrawer(text: string) {
    this.isDrawerOpened = false
  }

  setVertices(request: RequestPlayback) {
    this.vertices = request.list.map(it => {
      return { lat: it.latitude, lng: it.longitude }
    });
  }

  // actual
  // trackerSelected(tracker:MarkerPlayback){    
    
  //   this.zoom = 18;
  //   this.center = ({ lat: tracker.trackingData[0].lat, lng: tracker.trackingData[0].lng })
  // }
  trackerSelected(tracker:any){        
    this.zoom = 18;
    this.center = ({ lat: tracker.latitude, lng: tracker.longitude })
  }

  // trackerSelected(tracker:Tracker){    
  //   this.isDrawerOpened = false
  //   this.currentTrackingMarker = this.checkMarkersAvailable(tracker.deviceId);
  //   this.map?.setZoom(20);
  //   this.map?.setCenter({ lat: tracker.latitude, lng: tracker.longitude })
  // }

  startTracking(tracker: Tracker) {
    this.isDrawerOpened = false
    this.currentTrackingMarker = this.checkMarkersAvailable(tracker.deviceId);
    this.zoom = 16;
    this.map?.setCenter({ lat: tracker.latitude, lng: tracker.longitude })
    this.bottomSheetRef = this.playbackBottomSheet.open(TrackingBottomSheetComponent, { data: { tracker: tracker } })
    this.bottomSheetRef.afterDismissed().subscribe(it => {
      this.stopTracking();
    })
  }

  stopTracking() {
    this.currentTrackingMarker = undefined
    this.fitTrackersInMap()
  }

  startPlayback(request: RequestPlayback) {
    this.setVertices(request)
    this.playbackRequest = request
    this.bottomSheetRef = this.playbackBottomSheet.open(PlaybackBottomSheetComponent, { data: request })
    this.bottomSheetRef.afterDismissed().subscribe(it => {
      this.playbackRequest = undefined
    })
  }


  // updateBearingValue(marker: CustomMarker) {
  //   let calBearing = this.calculateBearing(marker)
  //   marker.bearing = calBearing
  //   console.log(calBearing)

  // }

  showTrack(trackerId: string) {
    if (this.selectedLastFewTrackerIds.has(trackerId)) {
      const positionsToRemove = this.lastTenRoutePathMap[trackerId] || [];
  
      this.selectedLastFewTrackerIds.delete(trackerId);
      this.lastTenRoutePathMap[trackerId] = [];
  
      this.lastTenPointMarkers = this.lastTenPointMarkers.filter(marker => {
        const isTrackerMarker = positionsToRemove.some(
          p => p.lat === marker.position.lat && p.lng === marker.position.lng
        );
  
        if (isTrackerMarker) {
          marker.content?.remove();
        }
  
        return !isTrackerMarker;
      });
  
    } else {
      const markerData = this.markersData.find(marker => marker.id === trackerId);
  
      if (markerData) {
        const fullData = markerData.trackingData;
  
        const currentIndex = fullData.findIndex(coord =>
          coord.lat === markerData.currentMarkerPosition.lat &&
          coord.lng === markerData.currentMarkerPosition.lng
        );
  
        const newIndex = Math.min(currentIndex + 150, fullData.length - 1);
        const newMarkerPosition = fullData[newIndex];
  
        markerData.currentMarkerPosition = {
          lat: newMarkerPosition.lat,
          lng: newMarkerPosition.lng
        };
  
        const trailStartIndex = Math.max(0, newIndex - 150);
        const trailPath = fullData.slice(trailStartIndex, newIndex);
  
        this.lastTenRoutePathMap[trackerId] = [
          ...trailPath.map(coord => ({
            lat: coord.lat,
            lng: coord.lng
          })),
          {
            lat: newMarkerPosition.lat,
            lng: newMarkerPosition.lng
          }
        ];
  
        this.lastTenPointMarkers = [
          ...this.lastTenPointMarkers,
          ...trailPath.map(coord => {
            const imgTag = new Image();
            imgTag.src = "assets/location-pin.png";
            imgTag.width = 20;
            imgTag.height = 20;
  
            return {
              position: {
                lat: coord.lat,
                lng: coord.lng
              },
              content: imgTag
            };
          })
        ];
      }
  
      this.selectedLastFewTrackerIds.add(trackerId);
    }
  }
  

  showGroupTrack(groupId: string) {
    const group = this.groupsMarkerData.find(g => g.id === groupId);
    if (!group) return;
  
    if (this.selectedLastFewTrackerIds.has(groupId)) {
      this.selectedLastFewTrackerIds.delete(groupId);
  
      group.markers.forEach(marker => {
        delete this.lastTenRoutePathMap[marker.id];
        this.lastTenPointMarkers = [];
      });
  
    } else {
      this.selectedLastFewTrackerIds.add(groupId);
  
      group.markers.forEach(marker => {
        const markerData = this.markersData.find(m => m.id === marker.id);
        if (markerData) {
          const fullData = markerData.trackingData;
  
          const currentIndex = fullData.findIndex(coord =>
            coord.lat === markerData.currentMarkerPosition.lat &&
            coord.lng === markerData.currentMarkerPosition.lng
          );
  
          const newIndex = Math.min(currentIndex + 150, fullData.length - 1);
          const newMarkerPosition = fullData[newIndex];
  
          markerData.currentMarkerPosition = {
            lat: newMarkerPosition.lat,
            lng: newMarkerPosition.lng
          };
  
          const trailStartIndex = Math.max(0, newIndex - 150);
          const trailPath = fullData.slice(trailStartIndex, newIndex);
  
          this.lastTenRoutePathMap[marker.id] = [
            ...trailPath.map(coord => ({
              lat: coord.lat,
              lng: coord.lng
            })),
            {
              lat: newMarkerPosition.lat,
              lng: newMarkerPosition.lng
            }
          ];
  
          const imageMarkers = trailPath.map(coord => {
            const imgTag = new Image();
            imgTag.src = "assets/location-pin.png";
            imgTag.width = 20;
            imgTag.height = 20;
  
            return {
              position: {
                lat: coord.lat,
                lng: coord.lng
              },
              content: imgTag
            };
          });
  
          this.lastTenPointMarkers.push(...imageMarkers);
        }
      });
    }
  }
  
   
  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();    
    this.filteredTrackerOptions = this.options.filter(o => 
      o.id.toLowerCase().includes(filterValue) || o.id.toLowerCase().includes(filterValue)
    );    
        
  }

  groupFilter(): void {
    const filterValue = this.groupInput.nativeElement.value.toLowerCase();    
    this.filteredGroupTrackerOptions = this.groupOptions.filter(o => 
      o.id.toLowerCase().includes(filterValue) || o.id.toLowerCase().includes(filterValue)
    );    
        
  }

  toggleSelectAll() {
    this.selectAllTrackerChecked = !this.selectAllTrackerChecked;
    this.filteredTrackerOptions.forEach(tracker => {
      this.selectedTrackers.set(tracker.id, this.selectAllTrackerChecked);
    });
  }

  toggleTrackerView() {
    this.showDropdown = !this.showDropdown;
  }

  setTrackerView(view: string) {
   if(view === 'Trackers'){
    this.selectedGroups = new Map<string, boolean>()
    this.markersData = MOCK_MARKERS;
   }
    this.selectedView = view;
    this.showDropdown = false;
  }

  
  getMarkersByTrackers(trackerId: string, event: any) {
    if (event.checked) {
      const selectedTracker = MOCK_MARKERS.find(tracker => tracker.id === trackerId);
      if (!selectedTracker) return;
  
      if (!this.markersData.some(tracker => tracker.id === trackerId)) {
        this.markersData.push(selectedTracker);
      }
  
      const allSelected = this.filteredTrackerOptions.every(opt =>
        this.markersData.some(tr => tr.id === opt.id)
      );
      if (allSelected) {
        this.markersData = [...MOCK_MARKERS];
      }
    } else {
      console.log(this.lastTenPointMarkers)
      this.markersData = this.markersData.filter(tracker => tracker.id !== trackerId);
    }
  }
  
  

  getMarkersByGroup(groupId: string, event:any) {
    if(!event.checked){
      this.markersData = MOCK_MARKERS
      return
    }
    const selectedGroup = this.groupsMarkerData.find(group => group.id === groupId);
    if (!selectedGroup) return;
  
    this.markersData = selectedGroup.markers
  
  }

  toggleTrackerSelection(trackerId: string, event:any) {
    this.getMarkersByTrackers(trackerId, event)
    if (this.selectedTrackers.has(trackerId)) {
      this.selectedTrackers.delete(trackerId);
    } else {
      this.selectedTrackers.set(trackerId, true);
    }
  }

  toggleGroupTrackerSelection(groupId: string, event:any) {
    this.getMarkersByGroup(groupId, event);
    if (this.selectedGroups.has(groupId)) {
      this.selectedGroups.delete(groupId);
    } else {
      this.selectedGroups.set(groupId, true);
    }
  }

  isTrackerSelected(trackerId: string): boolean {
    return this.selectedTrackers.get(trackerId) || false;
  }

  clearInput(): void {
    this.myControl.setValue('');
    this.myGroupControl.setValue('');
    this.filteredGroupTrackerOptions = [];
    this.filteredTrackerOptions = [];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  openAcknowledge() {
    this.showAcknowledgement = true;
  }

  closeAcknowledgement() {
    this.showAcknowledgement = false;
  }

  showAcknowledgementBottomSheet(trackerId:string){
    this.lastTenRoutePathMap = {};
    this.lastTenPointMarkers = [];
    
    this.playbackBottomSheet.open(AcknowledgeBottomContainerComponent, {
      disableClose: false,
      panelClass: 'full-width-bottom-sheet',
    }).afterDismissed().subscribe(() => {
      this.dynamicRoutePathMap = {};
      this.distanceContent = null;
      this.distanceText = '';
      this.redMarker = null;
      this.midpointMarker = null;
      this.zoom = 5

      this.cdr.detectChanges();
    })
    this.showAcknowledgement = false;
    this.center =  {
      lat : this.markers[0].position.lat,
      lng : this.markers[0].position.lng,
    }
    this.zoom = 16
    // const currentMarker = this.markersData[0].trackingData[0];    //actual
    const currentMarker = {
      lat : this.markers[0].position.lat,
      lng : this.markers[0].position.lng,
      timestamp : this.markers[0].tracker.lastUpdatedDeviceTime
    }
    const nearestMarker = {
      "lng":80.045049,
      "lat": 12.829053, 
      "timestamp": "2025-03-11T08:49:03.244Z"
  }    

    if (nearestMarker) {
      const imgTag = new Image();
      imgTag.src = "assets/sos-marker.png"; 
      imgTag.width = 60;
      imgTag.height = 60;

      this.redMarker = {
        position: { lat: nearestMarker.lat, lng: nearestMarker.lng },
        content: imgTag
      };
      this.dynamicRoutePathMap[trackerId] = [
        { lat: currentMarker.lat, lng: currentMarker.lng },
        { lat: nearestMarker.lat, lng: nearestMarker.lng }
      ];

      // Calculate distance
      const distance = this.calculateDistance(currentMarker, nearestMarker);
    this.distanceText = `${distance.toFixed(2)} m`;
    console.log('distance', this.distanceText);

    this.midpointMarker = this.getMidpoint(currentMarker, nearestMarker);

    const distanceElement = document.createElement('div');
    distanceElement.innerHTML = `<span style="background: white; padding: 5px; border-radius: 5px; 
                              box-shadow: 0px 0px 3px rgba(0,0,0,0.3); font-weight: bold;">
                              ${this.distanceText}</span>`;

    this.distanceContent = distanceElement;
    
    }
  }

  calculateDistance(point1: any, point2: any) {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = (point1.lat * Math.PI) / 180;
    const lat2 = (point2.lat * Math.PI) / 180;
    const deltaLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const deltaLng = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  }

  getMidpoint(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral) {    
    return {
      lat: (point1.lat + point2.lat) / 2,
      lng: (point1.lng + point2.lng) / 2
    };
  }

  trackAlert(alert: any): void {
    console.log('Tracking:', alert);
  }

  acknowledgeAlert(alert: any): void {
    console.log('Acknowledged:', alert);
  }

  getTimeAgo(alertTime: Date): string {
    const diff = Math.floor((new Date().getTime() - new Date(alertTime).getTime()) / 60000);
    return `${diff} min ago`;
  }

  closeMessage(messageId: number) {
    this.messages = this.messages.filter(message => message.id !== messageId);
    if(this.messages.length <=0){
      this.showMessages = false;
    }
  }

  clearAllMessages() {
    this.messages = [];
    if(this.messages.length <=0){
      this.showMessages = false;
    }
  }

  replyToMessage(trackerId: string) {
    this.markerClick(trackerId)
    this.setView('chat'); 
  }

}

enum MapModes {
  LIVE, PLAYBACK, TRACKING
}


