import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuftragService} from "../../service/AuftragService";
import Swal from "sweetalert2";
import EventEmitter from "node:events";
import {Subject} from "rxjs";

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent {
  dialogClosed = new Subject<void>();

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private auftragService: AuftragService, private dialogRef: MatDialogRef<DetailsDialogComponent>,
  ) {
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

  confirmOrder() {
    // Dialog schließen
    this.dialogRef.close();

    const auftragsnummer = this.data.auftragsnummer;

    this.auftragService.Updatestatus('bestätigt', auftragsnummer).subscribe(
      response => {
        console.log('Status erfolgreich aktualisiert:', response);
        Swal.fire({
          title: "Bestätigt!",
          text: "Der Auftrag wurde erfolgreich bestätigt.",
          icon: "success"
        });
        this.dialogClosed.next();
      },
      error => {
        console.error('Fehler beim Aktualisieren des Status:', error);
        Swal.fire({
          title: "Fehler!",
          text: "Beim Aktualisieren des Auftragsstatus ist ein Fehler aufgetreten.",
          icon: "error"
        });
      }
    );
  }


  async declineOrder() {
    // Dialog schließen
    this.dialogRef.close();

    const { isConfirmed } = await Swal.fire({
      title: "Sind Sie sicher?",
      text: "Diese Aktion kann nicht rückgängig gemacht werden!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ja, ablehnen!"
    });

    if (isConfirmed) {
      const auftragsnummer = this.data.auftragsnummer;

      this.auftragService.Updatestatus('abgelehnt', auftragsnummer).subscribe(
        response => {
          console.log('Status erfolgreich aktualisiert:', response);
          Swal.fire({
            title: "Abgelehnt!",
            text: "Der Auftrag wurde abgelehnt.",
            icon: "success"
          });
        },
        error => {
          console.error('Fehler beim Aktualisieren des Status:', error);
          Swal.fire({
            title: "Fehler!",
            text: "Beim Aktualisieren des Auftragsstatus ist ein Fehler aufgetreten.",
            icon: "error"
          });
        }
      );
    } else {
      console.log('Auftrag wurde nicht abgelehnt.');
    }
    this.dialogClosed.next();
  }
}
