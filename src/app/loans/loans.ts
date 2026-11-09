import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loans } from './model/Loans';
import { PaginatedData } from '../core/model/page/PaginatedData';
import { LOANS_DATA } from './model/mock-loans';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoansService {
    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/loan';

    getLoans(pageable: Pageable, gameId?: number | null, clientId?: number | null, date?: string | null): Observable<PaginatedData<Loans>> {
       const body = {
        pageable,
        game: gameId,
        client: clientId,
        date,
       } 
       return this.http.post<PaginatedData<Loans>>(this.baseUrl, body);
    }

    saveLoans(loans: Loans): Observable<void> {
        const id = loans.id;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<void>(url, loans);
    }

    deleteLoans(idLoans: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idLoans}`);
    }
}
