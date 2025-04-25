import { Component, ElementRef, OnInit, ViewChild, OnDestroy, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { DeviceStatus, Tracker, TrackerDetails } from '../model/tracker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCommonModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { LiveMapTrackingComponent } from '../live-map-tracking/live-map-tracking.component';
import { TrackersTableComponent } from '../trackers-table/trackers-table.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth-service/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { PlaybackService } from '../services/playback-service/playback.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu/menu.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { MOCK_MARKER_GROUPS, MOCK_MARKERS } from '../mock-trackers';
@Component({
  selector: 'app-root-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [MatToolbarModule,FormsModule, MatCommonModule,MatSlideToggleModule, LiveMapTrackingComponent, TrackersTableComponent, MatButtonModule,  MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
  CommonModule, RouterOutlet,MatTooltip, MatSelectModule, MatDialogContent, MatDialogActions, MatDialogClose, MatDividerModule, GroupDialogComponent],
})


export class HomeComponent implements OnInit, OnDestroy {

  title = 'tracking-web-app';
  trackers: Tracker[] = []
  isInMapView = false
  screenName = "MapView"
  trackerDetails: TrackerDetails | undefined
  switchScreen = new Subject<boolean>()
  trackersUpdate = new Subject<Tracker[]>()
  isChecked: boolean = false
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions!: any[];

    @ViewChild(LiveMapTrackingComponent) mapComponent!: LiveMapTrackingComponent;
    @ViewChild('blockDeviceDialog') blockDeviceDialog!: TemplateRef<any>;
    @ViewChild('unblockDeviceDialog') unblockDeviceDialog!: TemplateRef<any>;
    @ViewChild('locationSharingDialog') locationSharingDialog!: TemplateRef<any>; 
    @ViewChild('resetDeviceDialog') resetDeviceDialog!: TemplateRef<any>; 
    @ViewChild('batteryInfoDialog') batteryInfoDialog!: TemplateRef<any>; 
  private subscriptions: Subscription[] = [];

  private dialogRefs: MatDialogRef<any>[] = [];

  showMessageBox = new BehaviorSubject<boolean>(false);
  showGeoFenceView = new BehaviorSubject<boolean>(false);
  showGeoFence = false;

  showKMLFileUploader = new BehaviorSubject<boolean>(false);
  showUploadKML = false;
  showWeather = new BehaviorSubject<boolean>(false);
  showWeatherOption = false;

  toggleGeoFenceView() {
    this.showGeoFence = !this.showGeoFence;
    this.showGeoFenceView.next(!this.showGeoFenceView.value);
  
    if (!this.isInMapView) {
      this.switchView();
    }
  }

  toggleUploadKml() {
    this.showUploadKML = !this.showUploadKML;
    this.showKMLFileUploader.next(!this.showKMLFileUploader.value);
    if(!this.isInMapView){
      this.switchView();
    }
  }

  toggleShowWeather(){
    this.showWeatherOption = !this.showWeatherOption;
    this.showWeather.next(!this.showWeather.value);
    if(!this.isInMapView){
      this.switchView();
    }
  }
  

  toggleScreen() {
    this.showMessageBox.next(!this.showMessageBox.value);
  }

  openDialog = new Subject<boolean>(); 
  isDialogOpen = false;
  selectedType: string = 'trackers'; 
  selectedBroadCastMessage: string = ''
  otaMessage: string = '';
  selectedLocationSharing : string = '';
  selectedInterval: string = '';
  broadCastForm = new FormControl('');
  filteredTrackerOptions: any[] = [];
  selectedTrackers: string[] = [];
  selectedGroups: string[] = [];
  trackersOption = [
    { id: 1, deviceName: 'Tracker A' },
    { id: 2, deviceName: 'Tracker B' },
    { id: 3, deviceName: 'Tracker C' },
    { id: 4, deviceName: 'Tracker D' },
    { id: 5, deviceName: 'Tracker E' },
    { id: 6, deviceName: 'Tracker F' },
    { id: 7, deviceName: 'Tracker G' },
    { id: 8, deviceName: 'Tracker H' },
    { id: 9, deviceName: 'Tracker I' },
    { id: 10, deviceName: 'Tracker J' },
    { id: 11, deviceName: 'Tracker K' },
    { id: 12, deviceName: 'Tracker L' },
    { id: 13, deviceName: 'Tracker M' }
];


  groupsOption = [
    { id: 1, deviceName: 'Group X' },
    { id: 2, deviceName: 'Group Y' },
    { id: 3, deviceName: 'Group Z' }
  ];

  toggleBroadCast()
  {
    this.isDialogOpen = !this.isDialogOpen;
    this.openDialog.next(this.isDialogOpen);
  }

  switchView = () => {
    this.switchScreen.next(true);
    this.isInMapView = !this.isInMapView;
    this.isChecked = this.isInMapView; 
    this.screenName = this.isInMapView ? "Dashboard" : "MapView";
    this.clearInput();
  }
  

  constructor(private menuService: MenuService, private dialog: MatDialog, private authService: AuthService, private router: Router, private trackerService: TrackersService, private playbackService: PlaybackService) {
    this.filteredOptions = this.options.slice();
    this.filterTracker();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.playbackService.play$.subscribe(() => this.onPlay()),
      this.playbackService.pause$.subscribe(() => this.onPause()),
      this.playbackService.fastForward$.subscribe((speedValue) => 
        this.onFastForward(speedValue !== undefined ? speedValue : undefined) 
      ),
      this.playbackService.reverse$.subscribe(() => this.onReverse()),
      this.playbackService.showFullRoute$.subscribe(() => this.onShowFullRoute()),
      this.playbackService.moveMap$.subscribe((value) => this.onMoveMap(value)) 
    );

   this.trackerService.getTracker().subscribe({
    next: (result) => {
      this.options = result
    }
   })
  }

  getSortedOptions(options: any[], selectedOptions: any[]): any[] {
    return [
      ...options.filter(option => selectedOptions.includes(option.deviceName)),
      ...options.filter(option => !selectedOptions.includes(option.deviceName))
    ];
  }
  
  get sortedTrackersOption() {
    return this.getSortedOptions(this.trackersOption, this.selectedTrackers);
  }
  
  get sortedGroupsOption() {
    return this.getSortedOptions(this.groupsOption, this.selectedGroups);
  }
  
  formatTime() {
    if (this.selectedInterval) {
      if (this.selectedInterval.length === 2 && this.selectedInterval.indexOf(':') === -1) {
        this.selectedInterval = this.selectedInterval + ':';
      }
      
      if (this.selectedInterval.length === 5 && this.selectedInterval.indexOf(':', 3) === -1) {
        this.selectedInterval = this.selectedInterval + ':';
      }

      const timeParts = this.selectedInterval.split(':');
      if (timeParts.length > 1) {
        let [hours, minutes, seconds] = timeParts;
        
        if (!seconds) {
          seconds = '00';
        }
        
        if (hours.length === 2 && minutes.length === 2 && seconds.length === 2) {
          if (+hours >= 0 && +hours <= 23 && +minutes >= 0 && +minutes <= 59 && +seconds >= 0 && +seconds <= 59) {
            this.selectedInterval = `${hours}:${minutes}:${seconds}`;
          }
        }
      }
    }
  }

  onTypeChange() {
    this.broadCastForm.setValue('');
    this.filterTracker();
  }

  filterTracker() {
    this.filteredTrackerOptions = [];
    if (this.selectedType === 'trackers') {
      this.selectedGroups = [];
      this.filteredTrackerOptions = this.trackersOption;
    } else {
      this.selectedTrackers = [];
      this.filteredTrackerOptions = this.groupsOption;
    }
  }

  clearInput() {
    this.broadCastForm.setValue('');
    this.myControl.setValue('');
  }

    openDialogBox(template: TemplateRef<any>, width: string = '300px'): MatDialogRef<any> {
      const dialogRef = this.dialog.open(template, { width });
      this.dialogRefs.push(dialogRef);
      return dialogRef;
    }
  
    closeDialog(result: boolean = false, index: number = -1) {
      if (index >= 0 && index < this.dialogRefs.length) {
        this.dialogRefs[index].close(result);
        this.dialogRefs.splice(index, 1);
      } else if (this.dialogRefs.length > 0) {
        const lastDialog = this.dialogRefs.pop();
        lastDialog?.close(result);
      }
    }

    openBroadCastDialog(dialogTemplate: TemplateRef<any>) {
      this.openDialogBox(dialogTemplate, '350px');
    }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onPlay(): void {
    this.mapComponent?.play();
  }

  onShowFullRoute(): void {
    this.mapComponent?.showFullRoute();
  }

  onPause(): void {
    this.mapComponent?.pause();
  }

  onFastForward(speedValue?: number): void {    
    if(speedValue){
      this.mapComponent?.fastForward(speedValue);
    } else {
      this.mapComponent?.fastForward();
    }
  }

  onReverse(): void {
    this.mapComponent?.reverse();
  }

  onMoveMap(value: boolean): void {
    if (this.mapComponent) {
      this.mapComponent.setMoveMap(value); 
    }
  }

  get username(){
    return this.authService.user?.name
  }

  getCount(list: Tracker[], status: DeviceStatus): string{
    let count = list.filter(it => it.status === status ).length
    return count < 10 ? '0' + count : count.toString()
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    
    this.filteredOptions = this.options.filter(o => 
      o.id.toLowerCase().includes(filterValue) || o.id.toLowerCase().includes(filterValue)
    );       
  }

  broadCastSubmit() {
    if (this.needsConfirmation(this.selectedBroadCastMessage)) {
      const dialogTemplate = this.getConfirmationDialogTemplate(this.selectedBroadCastMessage);
      const confirmationDialogRef = this.openDialogBox(dialogTemplate, '350px');
  
      confirmationDialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.submitForm();
        }
        this.closeDialog(false, this.dialogRefs.indexOf(confirmationDialogRef));
      });
    } else {
      this.submitForm();
    }
  }

  private needsConfirmation(action: string): boolean {
    const actionsNeedingConfirmation = ['block', 'unblock', 'reset', 'battery', 'locationShare'];
    return actionsNeedingConfirmation.includes(action);
  }

  private getConfirmationDialogTemplate(action: string): TemplateRef<any> {
    switch (action) {
      case 'block':
        return this.blockDeviceDialog;
      case 'unblock':
        return this.unblockDeviceDialog;
      case 'locationShare':
        return this.locationSharingDialog;
      case 'reset':
        return this.resetDeviceDialog;
      case 'battery':
        return this.batteryInfoDialog;
      default:
        throw new Error(`No dialog template defined for action: ${action}`);
    }
  }

  submitForm() {
    const formData = {
      broadcastType: this.selectedBroadCastMessage,
      selectedItem: this.selectedType,
      selectedTracker: this.selectedTrackers ? this.selectedTrackers : null,
      selectedGroup: this.selectedGroups ? this.selectedGroups : null,
      messageType: this.selectedBroadCastMessage,
      otaMessage: this.selectedBroadCastMessage === 'ota' ? this.otaMessage : null,
      deviceInterval: this.selectedBroadCastMessage === 'interval' ? `${this.selectedInterval}` : null,
      locationSharing: this.selectedBroadCastMessage === 'locationShare' ? this.selectedLocationSharing : null
    };

    console.log('Submitted Data:', formData);
    this.closeDialog();
  }

  openGroupDialog(): void {
    this.dialog.open(GroupDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { groups: MOCK_MARKER_GROUPS, markers: MOCK_MARKERS }
    });
  }  

  isLoginPage(): boolean {
    return this.router.url === '/login'
  }

  logoClickToHome(){
      this.router.navigate(['/dashboard'])
      this.menuService.setMenu('Companies')
  }
}
