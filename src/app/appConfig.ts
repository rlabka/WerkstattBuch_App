import { provideHttpClient, withFetch } from '@angular/common/http';
import {provideClientHydration} from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import {ApplicationConfig} from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers : [provideHttpClient(withFetch()), provideClientHydration()]
};
