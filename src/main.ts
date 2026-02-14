/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { Game } from './app/game';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(Game, {
    providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)]})
    .catch((err) => console.error(err));
