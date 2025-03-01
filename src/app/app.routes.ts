import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
      path: "bottom",
      loadComponent: () => import("./pages/bottom-page/bottom-page.component").then((m) => m.BottomPageComponent),
    },
    {
      path: "mid",
      loadComponent: () => import("./pages/mid-page/mid-page.component").then((m) => m.MidPageComponent),
    },
    { path: "**", redirectTo: "" },

];

