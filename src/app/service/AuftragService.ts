import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, interval, map, observable, Observable, Subject, switchMap, tap} from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auftrag } from '../interface/Auftrag';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuftragService {
  private _refresh$ = new Subject<void>();

  private apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) {
  }

  get refresh$(){
    return this._refresh$;
  }

  saveAuftrag(auftrag: any): Observable<any> {
    return this.http.post<Auftrag>(this.apiUrl+'/auftrag/neu', auftrag);
  }

  getAll(): Observable<any> {
    return this.http.get<Auftrag>(this.apiUrl+'/auftrag/all');
  }

  getTermin(date: any): Observable<any[]> {
    let x= this.formatDate(date)
    console.log('x',x);
    return this.http.get<any[]>(`${this.apiUrl}/terminverwaltung/get?date=${x}`);
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  getOutstandingAuftrags(): Observable<any[]> {
    this.changeNumberEmitter();
    return this.getAll().pipe(
      map(auftrags => auftrags.filter((auftrag: { status: string; }) => auftrag.status === 'Ausstehend'))
    );
  }
  changeNumberEmitter(): Observable<number> {
    return interval(1000).pipe(
      switchMap(() => this.getOutstandingAuftrags()),
      map(auftrags => {
        return auftrags.length;
      }),
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  Updatestatus(status: string, auftragsnummer: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { status: status };

    return this.http.put<any>(`${this.apiUrl}/auftrag/${auftragsnummer}/status`, body, { headers: headers });
  }

}
