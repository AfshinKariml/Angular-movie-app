import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/login/login.component'),
        title: 'Login'
    },
    {
        path:'browse',
        loadComponent: () => import('./pages/browse/browse.component'),
        title: 'browse'
    },
    {
        path: "movie/:id", loadComponent: () => import('./pages/movie-detail/movie-detail.component')
    },
    {
        path:"movie-list/:genre",loadComponent:()=> import('./pages/movie-list/movie-list.component'),
    }
];
