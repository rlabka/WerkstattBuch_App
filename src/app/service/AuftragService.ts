import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auftrag } from '../interface/Auftrag';

@Injectable({
  providedIn: 'root'
})
export class AuftragService {

  private apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  saveAuftrag(auftrag: Auftrag): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auftrag/neu`, auftrag);
  }

}
