import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoansEdit } from '../loans-edit/loans-edit';
import { LoansService } from '../loans';
import { Loans } from '../model/Loans';
import { Game } from '../../game/model/Game';
import { Clients } from '../../clients/model/clients';
import { ClientsService } from '../../clients/clients';
import { GameService } from '../../game/game';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-loans-list',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatTableModule, CommonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,],
    templateUrl: './loans-list.page.html',
    styleUrl: './loans-list.page.scss',
})
export class LoansListPage implements OnInit {
    protected readonly gamesList = signal<Game[]>([]);
    protected readonly clientsList = signal<Clients[]>([]);
    protected readonly datesList = signal<string[]>([]);
    protected readonly filterGame = signal<Game | null>(null);
    protected readonly filterClient = signal<Clients | null>(null);
    protected readonly filterDate = signal<Date | null>(null);
    protected readonly loans = signal<Loans[]>([]);

    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Loans>();
    displayedColumns: string[] = ['id', 'game', 'client', 'iniDate', 'devDate', 'action'];

    constructor(private loansService: LoansService, private gamesService: GameService, private clientService: ClientsService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadPage();

        this.gamesService.getGames().subscribe(games => {
            this.gamesList.set(games);
        });
        this.clientService.getClients().subscribe(clients => {
            this.clientsList.set(clients);
        });
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        this.loansService.getLoans(pageable).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }


    onCleanFilter(): void {
        this.filterGame.set(null);
        this.filterClient.set(null);
        this.filterDate.set(null);
        this.onSearch();
    }

    onSearch(): void {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };
        const gameId =
            this.filterGame() != null ? this.filterGame()!.id : null;
        const clientId =
            this.filterClient() != null ? this.filterClient()!.id : null;

        const initialDate = this.filterDate();   
        
        const date = initialDate ? `${initialDate.getFullYear()}-${String(initialDate.getMonth() + 1).padStart(2, '0')}-${String(initialDate.getDate()).padStart(2, '0')}` : null;


        this.loansService
            .getLoans(pageable, gameId, clientId, date)
            .subscribe((loans) => {
                this.dataSource.data = loans.content;
                this.totalElements = loans.totalElements;
            });
    }

    createLoans() {
        const dialogRef = this.dialog.open(LoansEdit, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

     editAuthor(loan: Loans) {
        const dialogRef = this.dialog.open(LoansEdit, {
            data: { loans: loan },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deleteLoans(loans: Loans) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar prestamo',
                description:
                    'Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loansService.deleteLoans(loans.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}
