import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clients } from '../model/clients';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientsService } from '../clients';
import { MatDialog } from '@angular/material/dialog';
import { ClientsEditPage } from '../clients-edit/clients-edit';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';


@Component({
    selector: 'app-clients-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './clients-list.page.html',
    styleUrl: './clients-list.page.scss'
})

export class ClientsListPage implements OnInit {

  dataSource = new MatTableDataSource<Clients>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  protected readonly clientsService = inject(ClientsService);
  protected readonly dialog = inject(MatDialog);

  loadData(): void {
    this.clientsService.getClients().subscribe(
      categories => this.dataSource.data = categories
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  createClients() {    
    const dialogRef = this.dialog.open(ClientsEditPage, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.loadData();
    });    
  }  

  editClients(clients: Clients) {
    const dialogRef = this.dialog.open(ClientsEditPage, {
      data: { clients }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.loadData();
    });
  }
    deleteClients(clients: Clients) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientsService.deleteClients(clients.id).subscribe(result => {
          this.loadData();
        }); 
      }
    });
  }
}


 

