import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auftrag } from '../interface/Auftrag';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuftragService {

  private apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) { }


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

}
