import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Clients } from './model/clients';

@Injectable({
providedIn: 'root'
})
export class ClientsService { 

    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/client';

    getClients(): Observable<Clients[]> {
        return this.http.get<Clients[]>(this.baseUrl);
    }

    saveClients(client: Clients): Observable<Clients> {
        const { id } = client;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Clients>(url, client);
    }

    deleteClients(idClient : number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${idClient}`);
    }  
}
