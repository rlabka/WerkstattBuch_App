import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { AuftragService } from "../../service/AuftragService";
import { Subscription, interval, Subject, catchError, switchMap, tap } from "rxjs";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  totalanzahl: number | undefined;
  private updateSubscription$: Subscription | undefined;
  private intervalId: any;
  parentData: any;

  constructor(
    private auftragservice: AuftragService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {
    this.parentData=null;
  }

  ngOnInit(): void {
    // Navigieren Sie zur Admin-Seite und starten Sie dann das Polling
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    // Stellen Sie sicher, dass das Intervall und das Abonnement beim Verlassen der Komponente gestoppt werden
    this.stopInterval();
    this.stopPolling();
  }

  startInterval(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.loadInitialData();
      }, 1000);
    }
  }

  stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startPolling(): void {
   // const data: []
    this.updateSubscription$ = interval(5000).pipe(
      switchMap(() => this.auftragservice.getOutstandingAuftrags()),
      tap(auftrags => {
        this.totalanzahl = auftrags.length;
        this.parentData=auftrags;
        //console.log(this.totalanzahl);
      }),
      catchError(error => {
        console.error('Polling error:', error);
        return [];
      })
    ).subscribe();
  }

  stopPollingAndInterval(): void {
    this.stopInterval();
    this.stopPolling();
  }

  stopPolling(): void {
    if (this.updateSubscription$) {
      this.updateSubscription$.unsubscribe();
    }
  }

  loadInitialData(): void {
    this.auftragservice.getOutstandingAuftrags().subscribe(
      auftrags => {
        this.totalanzahl = auftrags.length;
      },
      error => {
        console.error('Error loading initial data:', error);
      }
    );
  }

  w3_close(): void {
    const sidebar = this.el.nativeElement.querySelector('#mySidebar');
    const overlay = this.el.nativeElement.querySelector('#myOverlay');

    this.renderer.setStyle(sidebar, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }

  w3_open(): void {
    const sidebar = this.el.nativeElement.querySelector('#mySidebar');
    const overlay = this.el.nativeElement.querySelector('#myOverlay');

    this.renderer.setStyle(sidebar, 'display', 'block');
    this.renderer.setStyle(overlay, 'display', 'block');
  }
}
