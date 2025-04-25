import { Component, Inject, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChangeDetectorRef } from '@angular/core';
import { AcknowledgeBottomSheetService } from '../services/acknowledgeService/acknowledge-bottom-sheet.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-acknowledge-bottom-container',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSelectModule, CommonModule, FormsModule, MatCheckboxModule],
  templateUrl: './acknowledge-bottom-container.component.html',
  styleUrl: './acknowledge-bottom-container.component.css',
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class AcknowledgeBottomContainerComponent {
  isMeasureChecked = true;
  currentIndex = 0;

  data = [
    {
      latitude: '14.5678',
      longitude: '79.3456',
      speed: '45 km/h',
      altitude: '280m',
      heading: '90°',
      alertUTC: '2024-04-10 08:15:00',
      alertIST: '2024-04-10 13:45:00',
      serverUTC: '2024-04-10 08:15:00',
      serverIST: '2024-04-10 13:45:00'
    },
    {
      latitude: '15.6789',
      longitude: '80.4567',
      speed: '70 km/h',
      altitude: '400m',
      heading: '360°',
      alertUTC: '2024-04-11 09:30:00',
      alertIST: '2024-04-11 15:00:00',
      serverUTC: '2024-04-11 09:30:00',
      serverIST: '2024-04-11 15:00:00'
    }
  ];  

    private dialogRef?: MatDialogRef<any>;
  
    
  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private bottomSheetService: AcknowledgeBottomSheetService,
    private cdr: ChangeDetectorRef
  ){}

   openDialog(template: TemplateRef<any>, width: string = '300px') {
      this.dialogRef = this.dialog.open(template, { width });
    }
  
    acknowledgeCloseDialog() {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  
    openAcknowledgeDialog(dialogTemplate: TemplateRef<any>) {
      this.openDialog(dialogTemplate, '350px');
    }

  toggleMeasureDistance(event: any) {
    console.log('Before Update:', this.isMeasureChecked);
  
    this.isMeasureChecked = !this.isMeasureChecked;
    console.log('After Update:', this.isMeasureChecked);
  
    this.bottomSheetService.setMeasureDistance(this.isMeasureChecked);
  
    this.cdr.detectChanges();
  }
  

  closeAcknowledgementDialog(){
    this.bottomSheet.dismiss();
  }

  previousData() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextData() {
    if (this.currentIndex < this.data.length - 1) {
      this.currentIndex++;
    }
  }
}
