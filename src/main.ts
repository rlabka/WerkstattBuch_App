import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/text-field/theme/lumo/vaadin-text-field.js';
import '@vaadin/text-field/theme/material/vaadin-text-field.js';
import '@vaadin/text-field/src/vaadin-text-field.js';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app/app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
