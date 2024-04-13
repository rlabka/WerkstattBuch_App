import {Component, Inject, ViewChild} from '@angular/core';
import {AuftragService} from "../../service/AuftragService";
import {Auftrag} from "../../interface/Auftrag";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DetailsDialogComponent} from "../details-dialog/details-dialog.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-auftreage',
  templateUrl: './auftreage.component.html',
  styleUrl: './auftreage.component.scss'
})

export class AuftreageComponent {

  auftragsListe: any[] = [];
  filteredAuftragsListe: any[] = [];
  searchTerm: string = '';
  //@ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private auftragService: AuftragService, public dialog: MatDialog) {
    this.getAllAusstehendeAuftrags();


  }

  ngOnInit(): void {


  }

  getAllAusstehendeAuftrags() {
    this.auftragService.getAll().subscribe(
      (data: any[]) => {
        this.auftragsListe = data.filter(auftrag => auftrag.status === 'Ausstehend');
      },
      error => {
        console.log('Fehler beim Abrufen der ausstehenden Aufträge:', error);
      }
    );
  }

  openLinkInNewTab(link: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${(link)}`;
    window.open(url, '_blank');
  }

  filterAuftragsListe() {
    if (!this.searchTerm) {
      this.filteredAuftragsListe = [...this.auftragsListe];  // Setze filteredAuftragsListe auf alle Aufträge zurück
      return;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredAuftragsListe = this.auftragsListe.filter(auftrag =>
      auftrag.auftragsnummer.toString().toLowerCase().includes(searchTermLower) ||
      auftrag.kundeinformationen.firstName.toLowerCase().includes(searchTermLower) ||
      auftrag.kundeinformationen.lastName.toLowerCase().includes(searchTermLower)
    );
  }

  openDetailsDialog(auftrag:any): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '550px',
      maxHeight: '700px',
      data: auftrag
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog wurde geschlossen', result);
    });
  }


  currentPage = 0;
  pageSize = 1;

  get paginatedAuftragsListe() {
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    return this.filteredAuftragsListe.slice(start, end);
  }

  changePage($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }
}
