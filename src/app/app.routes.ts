import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Consulta } from './pages/consulta/consulta';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'consulta',
        component: Consulta,
    }
];
