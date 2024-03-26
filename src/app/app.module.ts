import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularComponent } from './formular/formular.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIcon, MatIconModule} from "@angular/material/icon";

import {
    MatStep,
    MatStepContent,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious
} from "@angular/material/stepper";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOption, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import { StepperComponent } from './stepper/stepper.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {NgOptimizedImage} from "@angular/common";
import {MatTabLabel} from "@angular/material/tabs";
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatDivider} from "@angular/material/divider";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@NgModule({

  declarations: [
    AppComponent,FormularComponent, StepperComponent, AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIcon,
    MatStep,
    MatStepper,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatStepLabel,
    MatStepperPrevious,
    MatStepperNext,
    MatRadioGroup,
    MatRadioButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatStepContent,
    NgOptimizedImage,
    MatTabLabel,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatSelectTrigger,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDivider,
    MatSlideToggle,
    MatSelect,
    MatOption
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de' }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {

}
