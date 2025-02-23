import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BottomPageComponent } from './pages/bottom-page/bottom-page.component';
import { MidPageComponent } from './pages/mid-page/mid-page.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bottom', component: BottomPageComponent },
    { path: 'mid', component: MidPageComponent },

];

