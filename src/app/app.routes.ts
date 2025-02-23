import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BottomPageComponent } from './pages/bottom-page/bottom-page.component';


export const routes: Routes = [
    { path: '', component: HomeComponent }, // Ruta principal
    { path: 'bottom', component: BottomPageComponent }
];

