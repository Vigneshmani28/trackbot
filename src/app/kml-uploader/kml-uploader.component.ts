import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

interface FileWithColor {
  file: File;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-kml-uploader',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  templateUrl: './kml-uploader.component.html',
  styleUrls: ['./kml-uploader.component.css']
})
export class KmlUploaderComponent {
  selectedFiles: FileWithColor[] = [];
  loading: boolean = false;
  confirmDialogVisible: boolean = false;
  confirmRemoveOneItemDialog: boolean = false;
  removeIndex: number | null = null;

  @Output() fileSelected = new EventEmitter<FileWithColor[] | null>();
  @Output() coordinatesExtracted = new EventEmitter<any[]>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  clearAllSelectedFiles() {
    this.confirmDialogVisible = true;
  }

  confirmAllClearFiles(confirmed: boolean) {
    if (confirmed) {
      this.selectedFiles = [];
      this.fileSelected.emit(null);

      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    }
    this.confirmDialogVisible = false;
  }

  clearSelectedItemRemove(index:number) {
    this.removeIndex = index;
    this.confirmRemoveOneItemDialog = true;
  }

  confirmClearItem(confirmed: boolean) {
    if (confirmed && this.removeIndex != null) {
      this.removeFile(this.removeIndex)
    }
    this.confirmRemoveOneItemDialog = false;
    this.removeIndex = null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const validFiles: FileWithColor[] = [];
      const invalidFiles: string[] = [];

      Array.from(files).forEach((file) => {
        if (file.name.endsWith('.kml')) {
          if (!this.selectedFiles.some(f => f.file.name === file.name)) {
            validFiles.push({ file, color: '#3f51b5' });
          }
        } else {
          invalidFiles.push(file.name);
        }
      });

      this.selectedFiles = [...this.selectedFiles, ...validFiles];

      if (invalidFiles.length > 0) {
        alert(`Invalid files: ${invalidFiles.join(', ')}`);
      }

      this.fileSelected.emit(this.selectedFiles);
    }
  }

  parseKMLFiles(filesWithColors: FileWithColor[]): void {
    const kmlData: any[] = [];

    filesWithColors.forEach(({ file }) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(e.target.result, 'application/xml');
        const placemarks = xmlDoc.getElementsByTagName('Placemark');

        Array.from(placemarks).forEach((placemark: any) => {
          const name = placemark.getElementsByTagName('name')[0]?.textContent;
          const coordinates = placemark.getElementsByTagName('coordinates')[0]?.textContent.trim();

          const placemarkData = {
            name,
            coordinates: this.parseCoordinates(coordinates),
          };
          kmlData.push(placemarkData);
        });

        this.coordinatesExtracted.emit(kmlData);
      };

      reader.readAsText(file);
    });

    this.fileSelected.emit(this.selectedFiles);
  }

  parseCoordinates(coordinates: string): any[] {
    return coordinates.split(/\s+/).map((coordStr: string) => {
      const values = coordStr.split(',');
      if (values.length >= 2) {
        return {
          lat: parseFloat(values[1]),
          lng: parseFloat(values[0]),
          alt: values[2] ? parseFloat(values[2]) : null
        };
      }
      return null;
    }).filter(coord => coord !== null);
  }

  onSubmit() {
    if (this.selectedFiles.length === 0) {
      alert('Please upload at least one KML file.');
      return;
    }

    this.loading = true;
    this.parseKMLFiles(this.selectedFiles);
    this.loading = false;
  }

  updateFileColor(index: number, color: string) {
    this.selectedFiles[index].color = color;
    this.fileSelected.emit(this.selectedFiles);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.fileSelected.emit(this.selectedFiles.length ? this.selectedFiles : null);

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFileIcon(): string {
    return this.selectedFiles.length > 0 ? 'attach_file' : 'warning';
  }
}
