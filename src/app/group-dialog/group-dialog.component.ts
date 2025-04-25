import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MarkerPlayback } from '../mock-trackers';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // allows global styling without ::ng-deep
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.css',
})
export class GroupDialogComponent {
  groupName: string = '';
  groups = this.data.groups;
  markers: MarkerPlayback[] = this.data.markers;
  selectedGroup: any = null;
  selectedTrackers: Set<string> = new Set();

  constructor(
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getAssignedGroupName(tracker: MarkerPlayback): string | null {
    const group = this.groups.find((group:any) =>
      group.markers?.some((m: MarkerPlayback) => m.id === tracker.id)
    );
    return group ? group.name : null;
  }  

  get isDuplicateGroupName(): boolean {
    const trimmed = this.groupName.trim().toLowerCase();
    return this.groups.some((group:any) => group.name.toLowerCase() === trimmed);
  }

  addGroup() {
    const trimmed = this.groupName.trim();
    if (trimmed && !this.isDuplicateGroupName) {
      this.groups.push({
        id: `GROUP${this.groups.length + 1}`,
        name: trimmed,
        markers: [],
      });
      this.groupName = '';
    }
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
  }

  isTrackerEligible(tracker: MarkerPlayback): boolean {
    const assignedGroupName = this.getAssignedGroupName(tracker);
    // Only allow if tracker is not in any group or assigned to selectedGroup
    return !assignedGroupName || assignedGroupName !== this.selectedGroup?.name;
  }
  

  toggleTracker(tracker: MarkerPlayback) {
    const assignedGroup = this.groups.find((group:any) =>
      group.markers?.some((m: MarkerPlayback) => m.id === tracker.id)
    );
  
    // Prevent selection if tracker already assigned to another group
    if (assignedGroup && assignedGroup !== this.selectedGroup) return;
  
    if (this.selectedTrackers.has(tracker.id)) {
      this.selectedTrackers.delete(tracker.id);
    } else {
      this.selectedTrackers.add(tracker.id);
    }
  }
  

  assignTrackersToGroup() {
    const selectedMarkers = this.markers.filter(m => this.selectedTrackers.has(m.id));
    this.selectedGroup.markers = [...(this.selectedGroup.markers || []), ...selectedMarkers];
    this.selectedTrackers.clear();
    this.dialogRef.close(this.selectedGroup); // optionally return updated group
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
