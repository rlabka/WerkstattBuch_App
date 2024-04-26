import {Component, Inject, input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuftragService } from "../../service/AuftragService";
import jspdf from "jspdf";
import html2canvas from "html2canvas";


@Component({
  selector: 'app-rechnung',
  templateUrl: './rechnung.component.html',
  styleUrls: ['./rechnung.component.scss']
})
export class RechnungComponent {
  adresse: { strasse: string, hsnr: string, plz: string, stadt: string } = { strasse: '', hsnr: '', plz: '', stadt: '' };
  turnoff: boolean = false;
  protected isSaved: boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auftragService: AuftragService,
    private dialogRef: MatDialogRef<RechnungComponent>
  ) {
    if (!data.kundeinformationen.plz)
      this.turnoff = true;
    this.data.artikelListe = [];
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
  onSave() {
    this.isSaved = true;
    // Hier können Sie festlegen, welche Werte Sie für die Eingabefelder setzen möchten
    if(!this.data.kundeinformationen.plz){
      this.data.kundeinformationen.plz=this.adresse.plz;
      this.data.kundeinformationen.adresse = this.adresse.strasse;
      this.data.kundeinformationen.stadt=this.adresse.stadt;
      this.data.kundeinformationen.hausnummer=this.adresse.hsnr;
      this.turnoff=false;
    }

  }

  removeArtikel(index: number) {
    this.data.artikelListe.splice(index, 1);
  }

  change() {
    this.isSaved=false;
  }

  getNettoBetrag(): number {
    return this.data.artikelListe.reduce((sum: number, artikel: any) => sum + (artikel.einzelpreis * artikel.anzahl), 0);
  }

// Berechnung der MwSt
  getMwSt(): number {
    return this.getNettoBetrag() * 0.19; // 19% MwSt
  }

// Berechnung des Gesamtbetrags
  getGesamtBetrag(): number {
    return this.getNettoBetrag() + this.getMwSt();
  }

// Formatierung des Betrags
  formatBetrag(betrag: number): string {
    return betrag.toFixed(2);  // Auf zwei Dezimalstellen runden
  }

  print( ) {
    var element = document.getElementById('rechnungDiv');

    if (element) {
      html2canvas(element).then(canvas => {
// Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('Rechnung: '+this.data.kundeinformationen.lastName+this.data.kundeinformationen.firstName+'.pdf'); // Generated PDF
      });
    } else {
      console.error("Element not found!");
    }
  }

  send() {

  }

  protected readonly input = input;
}
