import { PaginatedData } from '../../core/model/page/PaginatedData';
import { Loans } from './Loans';

export const LOANS_DATA: PaginatedData<Loans> = {
    content: [
    { id: 1, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 1, name: 'Cliente 1' }, iniDate: "2026, 9, 26", devDate: "2026, 10, 7" },
    { id: 2, game: { id: 2, title: 'Juego 2', age: 5, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 1, name: 'Cliente 2' }, iniDate: "2026, 10, 1", devDate:  "2026, 10, 14" },
    { id: 3, game: { id: 3, title: 'Juego 3', age: 12, category: { id: 3, name: 'Categoría 3' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, client: { id: 1, name: 'Cliente 3' }, iniDate: "2026, 10, 14", devDate: "2026, 10, 28" },
    { id: 4, game: { id: 4, title: 'Juego 4', age: 10, category: { id: 4, name: 'Categoría 4' }, author: { id: 4, name: 'Autor 4', nationality: 'Nacionalidad 4' } }, client: { id: 1, name: 'Cliente 4' }, iniDate: "2026, 10, 7", devDate: "2026, 10, 21" },
    { id: 5, game: { id: 5, title: 'Juego 5', age: 9, category: { id: 5, name: 'Categoría 5' }, author: { id: 5, name: 'Autor 5', nationality: 'Nacionalidad 5' } }, client: { id: 1, name: 'Cliente 5' }, iniDate: "2026, 9, 1", devDate: "2026, 9, 14" },
    { id: 6, game: { id: 6, title: 'Juego 6', age: 3, category: { id: 6,  name: 'Categoría 6' }, author: { id: 6, name: 'Autor 6', nationality: 'Nacionalidad 6' } }, client: { id: 1, name: 'Cliente 6' }, iniDate: "2026, 10, 26", devDate: "2026, 11, 7" },
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 6,
};
