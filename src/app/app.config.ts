import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Configuración de detección de cambios
    provideRouter(routes), // Configuración de rutas
    provideHttpClient(), // Agrega el proveedor de HttpClient aquí
  ],
};
