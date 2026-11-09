import { Routes } from '@angular/router';

export const routes: Routes = [
     { path: '', redirectTo: '/games', pathMatch: 'full'},
     { path: 'categories', loadComponent: () => import('./category/category-list/category-list.page').then(m => m.CategoryListPage)},
     { path: 'authors', loadComponent: () => import('./author/author-list/author-list.page').then(m => m.AuthorListPage)},
     { path: 'games', loadComponent: () => import('./game/game-list/game-list.page').then(m => m.GameListPage)},
     { path: 'clients', loadComponent: () => import('./clients/clients-list/clients-list.page').then(m => m.ClientsListPage)},
     { path: 'loans', loadComponent: () => import('./loans/loans-list/loans-list.page').then(m => m.LoansListPage)}
     
];
