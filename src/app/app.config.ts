<<<<<<< HEAD
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

=======
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
>>>>>>> temp-fix
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
<<<<<<< HEAD
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
=======
    provideRouter(routes),
    provideHttpClient()
  ]
};
>>>>>>> temp-fix
