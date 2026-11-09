import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoansService } from '../loans';
import { Loans } from '../model/Loans';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game';
import { Clients } from '../../clients/model/clients';
import { ClientsService } from '../../clients/clients';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateFields } from '../../core/helpers/validation.helper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
    selector: 'app-loans-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './loans-edit.html',
    styleUrl: './loans-edit.scss',
})
export class LoansEdit implements OnInit {
    protected readonly loansService = inject(LoansService);
    protected readonly dialogRef = inject(MatDialogRef<LoansEdit>);
    protected readonly data = inject(MAT_DIALOG_DATA);
    protected readonly dialog = inject(MatDialog);

    protected readonly id = signal<number | null>(null);
    protected readonly gameId = signal<number | null>(null);
    protected readonly clientId = signal<number | null>(null);
    protected readonly iniDate = signal<Date | null>(null);
    protected readonly devDate = signal<Date | null>(null);
    protected readonly gameList = signal<Game[]>([]);
    protected readonly clientList = signal<Clients[]>([]);

    protected readonly gameService = inject(GameService);
    protected readonly clientService = inject(ClientsService);

    ngOnInit(): void {
        this.loadFormData(this.data.loans ?? null);
       
    }

    loadFormData(initialData: Loans | null) {
        if(initialData){
            this.id.set(initialData.id ?? null);

            this.iniDate.set(initialData.iniDate ? new Date(initialData.iniDate + 'T00:00:00') : null);
            this.devDate.set(initialData.devDate ? new Date(initialData.devDate + 'T00:00:00') : null);
        }
       

        this.gameService.getGames().subscribe((g) => {
            this.gameList.set(g);
            this.gameId.set(initialData?.game?.id ?? null);
           
        });

        this.clientService.getClients().subscribe((cli) => {
            this.clientList.set(cli);
            this.clientId.set(initialData?.client?.id ?? null);
        
        });
    }

    onSave() {
        const id = this.id();
        const gameId = this.gameId();
        const clientId = this.clientId();
        const iniDate = this.iniDate();
        const devDate = this.devDate();
        
        const iniFormatDate = iniDate ? `${iniDate.getFullYear()}-${String(iniDate.getMonth() + 1).padStart(2, '0')}-${String(iniDate.getDate()).padStart(2, '0')}` : null;
        const devFormatDate = devDate ? `${devDate.getFullYear()}-${String(devDate.getMonth() + 1).padStart(2, '0')}-${String(devDate.getDate()).padStart(2, '0')}` : null
        const requiredFields = ["gameId", "clientId", "iniFormatDate", "devFormatDate"] as const
        const data = { gameId, clientId, iniFormatDate, devFormatDate }


        if (!validateFields(data, requiredFields)) {
            return;
        }
        
        const start = new Date(iniFormatDate);
        const end = new Date(devFormatDate);

        if(end < start){
            alert("La fecha de devolución no puede ser anterior a la fecha de préstamo.");
            return;
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if(diffDays > 14){
            alert("El préstamo no puede ser superior a 14 días.");
            return;
        }

        const loans = {
            id,
            game: this.gameList().find(g => g.id === gameId) ?? null,
            client: this.clientList().find(cli => cli.id === clientId) ?? null,
            iniDate: iniFormatDate,
            devDate: devFormatDate,
        } as Loans;

        this.loansService.saveLoans(loans).subscribe({
            next: () => {
                this.dialogRef.close(true);
            },
            error: (err) =>{
                if(err.status === 400) {
                    alert("No se puede realizar el préstamo, ya que el juego está prestado o el cliente tiene 2 préstamos en activo")
                }else{
                    alert("Error al guardar")
                }

                console.log(err);
            }
        });
    }

    onClose() {
        this.dialogRef.close(false);
    }
}
