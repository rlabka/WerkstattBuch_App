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

    return this.http.post<Auftrag>('http://localhost:8080/auftrag/neu', auftrag);
  }

}
