import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-attachments',
  standalone : true,
  imports : [MatIconModule, CommonModule],
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent {
  files: { url: string, file: File }[] = [];

  onFileSelected(event: any) {
    if (event.target.files) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {          
          this.files.push({ url: e.target.result, file });
          console.log(this.files);
          
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
