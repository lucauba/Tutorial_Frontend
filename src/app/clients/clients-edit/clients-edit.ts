import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../clients';
import { Clients } from '../model/clients';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-clients-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './clients-edit.html',
    styleUrl: './clients-edit.scss'
})
export class ClientsEditPage implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<ClientsEditPage>);
        protected readonly data = inject(MAT_DIALOG_DATA);
    protected readonly clientsService = inject(ClientsService);

    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);
  

    ngOnInit(): void {
        this.loadFormData(this.data.clients ?? null);
    }

    loadFormData(initialData: Clients | null): void {
        this.id.set(initialData?.id ?? null);
        this.name.set(initialData?.name ?? null);
    }

    onSave() {
        const id = this.id();
        const name = this.name();

        if(!name) {
            return;
        }

        const clients = { id, name } as Clients;
                this.clientsService.saveClients(clients).subscribe(() => {
                    this.dialogRef.close(true);
                });
    }

    onClose() {
        this.dialogRef.close();
    }
}
