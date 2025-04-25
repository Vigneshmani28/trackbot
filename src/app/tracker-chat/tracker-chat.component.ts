import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Tracker } from '../model/tracker';
import { MarkerPlayback } from '../mock-trackers';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-tracker-chat',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, CommonModule, FormsModule, MatMenuModule],
  templateUrl: './tracker-chat.component.html',
  styleUrl: './tracker-chat.component.css'
})
export class TrackerChatComponent {
  @Input() tracker!: Tracker
  @Input() mockTracker! : MarkerPlayback;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @Output() goBack = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<string>();

  messages: any[] = [
    { text: "Hey, how are you?", sender: "Receiver", timestamp: "27/03/2025 10:30 AM", type: "received" },
    { text: "I'm good! What about you?", sender: "Sender", timestamp: "27/03/2025 10:31 AM", type: "sent" },
    { text: "I'm doing great. Let's catch up later.", sender: "Receiver", timestamp: "27/03/2025 10:35 AM", type: "received" }
  ];

  newMessage: string = "";
  recognition: any;
  isListening: boolean = false;
  interimText: string = "";

  constructor(private ngZone: NgZone) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN';

      this.recognition.onstart = () => {
        this.ngZone.run(() => {
          this.interimText = "Recording...";
        });
      };

      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        this.ngZone.run(() => {
          if (finalTranscript) {
            this.newMessage += finalTranscript + " ";
            this.interimText = "";
          } else if (interimTranscript) {
            this.interimText = interimTranscript;
          }
          this.setCursorToEnd(); // Keep cursor at the end
        });
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.ngZone.run(() => {
          this.interimText = "";
          this.isListening = false;
        });
      };

      this.recognition.onend = () => {
        this.ngZone.run(() => {
          if (this.interimText === "Recording..." || this.interimText) {
            this.newMessage += this.interimText + " ";
          }
          this.interimText = "";
          this.isListening = false;
          this.setCursorToEnd();
        });
      };
    } else {
      console.warn('Speech Recognition API is not supported in this browser.');
    }
  }

  startListening() {
    if (this.recognition) {
      const dingOn = new Audio('assets/mic_on.mp3');
      dingOn.play();

      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening() {
    if (this.recognition) {
      const dingOff = new Audio('assets/mic_off.mp3');
      dingOff.play();

      this.recognition.stop();
    }
  }

  sendMessage() {
    const messageToSend = this.newMessage.trim();
    if (messageToSend) {
      this.messages.push({
        text: messageToSend,
        sender: 'Sender',
        timestamp: new Date().toLocaleString(),
        type: 'sent'
      });
      this.newMessage = "";
      this.interimText = "";
      this.setCursorToEnd();
    }
  }

  exportChat() {
    const headers = ['Timestamp', 'Sender', 'Message'];
    const rows = this.messages.map(msg => [
      `"${msg.timestamp}"`,
      `"${msg.sender}"`,
      `"${msg.text.replace(/"/g, '""')}"` // escape double quotes
    ]);
  
    const csvContent =
      headers.join(',') + '\n' +
      rows.map(row => row.join(',')).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Chat-${this.tracker.deviceName || 'Device'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  

  setCursorToEnd() {
    setTimeout(() => {
      if (this.messageInput?.nativeElement) {
        const input = this.messageInput.nativeElement;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }, 0);
  }

  close() {
    this.closeDrawer.emit('close');
  }
}
