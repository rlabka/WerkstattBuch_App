import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuftragService } from "../../service/AuftragService";

@Component({
  selector: 'app-rechnung',
  templateUrl: './rechnung.component.html',
  styleUrls: ['./rechnung.component.scss']
})
export class RechnungComponent {
  adresse: { strasse: string, hsnr: string, plz: string, stadt: string } = { strasse: '', hsnr: '', plz: '', stadt: '' };
  turnoff: boolean = false;
  saved: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auftragService: AuftragService,
    private dialogRef: MatDialogRef<RechnungComponent>
  ) {
    if (!data.kundeinformationen.plz)
      this.turnoff = true;
    this.data.artikelListe = [];
  }

  onFileChange(event: any, index: number) {
    // Code zum Hochladen der Datei und Speichern des Dateinamens
    const file = event.target.files[0];
    this.data.artikelListe[index].datei = file.name;
  }

  addArtikel() {
    this.data.artikelListe.push({
      leistung: '',
      mwst: 0,
      einzelpreis: 0,
      anzahl: 0,
      gesamtpreis: 0,
      datei: ''
    });
  }

  removeArtikel(index: number) {
    this.data.artikelListe.splice(index, 1);
  }
}
