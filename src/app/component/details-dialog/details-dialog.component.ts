import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  formatDate(date: string): string {
    if (!date) {
      return 'Kein Datum';
    }
    const parts = date.split(',');
    if (parts.length < 1) {
      return 'Ungültiges Datum';
    }
    return parts[0];
  }

  openLinkInNewTab() {
    const url = `https://www.google.com/maps/search/?api=1&query=${(this.data.kundeinformationen.adresse)}`;
    window.open(url, '_blank');
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${formattedDate}, ${hours}:${minutes}:${seconds}`;
  }
}
