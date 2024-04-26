import { Component } from '@angular/core';
import {AuftragService} from "../../service/AuftragService";
import {MatDialog} from "@angular/material/dialog";
import {DetailsDialogComponent} from "../details-dialog/details-dialog.component";
import {PageEvent} from "@angular/material/paginator";
import {RechnungComponent} from "../rechnung/rechnung.component";
import {MatChipListboxChange} from "@angular/material/chips";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  auftragsListe: any[] = [];
  filteredAuftragsListe: any[] = [];
  search: string = '';
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  confirmedFilter: boolean = false;
  declinedFilter: boolean = false;

  constructor(private auftragService: AuftragService, public dialog: MatDialog) {
    this.getAllAusstehendeAuftrags();


  }

  ngOnInit(): void {
    this.filterAuftragsListe()
  }

  getAllAusstehendeAuftrags() {
    this.auftragService.getAll().subscribe(
      (data: any[]) => {
        this.auftragsListe = data.filter(auftrag => auftrag.status != 'Ausstehend');
        this.filterAuftragsListe(); // Filtern Sie die Liste nach dem Abrufen der Daten
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
    if (!this.search && !this.confirmedFilter && !this.declinedFilter) {
      // Wenn keine Filter ausgewählt sind, zeige die gesamte Liste an
      this.filteredAuftragsListe = [...this.auftragsListe];
      return;
    }

    const searchTermLower = this.search.toLowerCase();

    this.filteredAuftragsListe = this.auftragsListe.filter(auftrag => {
      // Filterbedingungen für die Suche
      const matchesSearch = !this.search || (
        auftrag.auftragsnummer.toString().toLowerCase().includes(searchTermLower) ||
        auftrag.kundeinformationen.firstName.toLowerCase().includes(searchTermLower) ||
        auftrag.kundeinformationen.lastName.toLowerCase().includes(searchTermLower) ||
        (auftrag.kundeinformationen.email && auftrag.kundeinformationen.email.toLowerCase().includes(searchTermLower))
      );
    });
  }




  currentPage = 0;
  pageSize = 5;
  selected: any;

  get paginatedAuftragsListe() {
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    return this.filteredAuftragsListe.slice(start, end);
  }

  changePage($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  OpenRechnung(auftrag: any) {
    const dialogRef = this.dialog.open(RechnungComponent, {
      width: '1000px',
      maxHeight: '700px',
      data: auftrag,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog wurde geschlossen', result);
    });
  }

  searchAuftragsListe() {
    if (!this.search) {
      this.filteredAuftragsListe = [...this.auftragsListe];
      return;
    }

    const searchTermLower = this.search.toLowerCase();

    this.filteredAuftragsListe = this.auftragsListe.filter(auftrag => {
      // Überprüfe, ob auftragsnummer vorhanden und nicht null/undefined ist
      // const auftragsnummer = auftrag.auftragsnummer ? auftrag.auftragsnummer.toString().toLowerCase() : '';

      const auftragsnummer = auftrag.auftragsnummer ? auftrag.auftragsnummer.toString().toLowerCase() : '';
      console.log('Aktuelle Auftragsnummer:', auftragsnummer);
      if (!auftragsnummer)
        return
      return  auftrag.auftragsnummer.toString().toLowerCase().includes(searchTermLower) ||
        auftrag.kundeinformationen.firstName.toLowerCase().includes(searchTermLower) ||
        auftrag.kundeinformationen.lastName.toLowerCase().includes(searchTermLower) ||
        (auftrag.kundeinformationen.email && auftrag.kundeinformationen.email.toLowerCase().includes(searchTermLower));
    });
  }

  openDetailsDialog(auftrag:any): void {

    const dialogRef = this.dialog.open(DetailsDialogComponent, {

      width: '550px',
      maxHeight: '700px',
      data: {auftrag: auftrag, button1Enabled: false},
      autoFocus: false
    });

  }

  onSelectionChange($event: MatChipListboxChange) {
    if ($event.value === 'confirmed') {
      this.filteredAuftragsListe = this.auftragsListe.filter(auftrag => {
        return auftrag.status==='bestätigt';
      });
    } else if ($event.value === 'declined') {
      this.filteredAuftragsListe = this.auftragsListe.filter(auftrag => {
        return auftrag.status==='abgelehnt';
      });
    }
    else {
      this.filterAuftragsListe();
    }
  }
}
