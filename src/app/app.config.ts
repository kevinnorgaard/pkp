import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      MatDialogModule,
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink).create({
        uri: 'https://us-west-2.cdn.hygraph.com/content/cmmc8mesh02q407w7yhokqicl/master',
      });
      const auth = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${environment.hygraphToken}`,
          ),
        });
        return forward(operation);
      });
      return {
        cache: new InMemoryCache(),
        link: auth.concat(httpLink),
      };
    }),
  ],
};
