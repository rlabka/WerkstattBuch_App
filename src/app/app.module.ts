import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularComponent } from './component/formular/formular.component';
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
import {HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOption, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import { StepperComponent } from './component/stepper/stepper.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
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
import { AuftreageComponent } from './component/auftreage/auftreage.component';
import {MatTooltip} from "@angular/material/tooltip";
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { DetailsDialogComponent } from './component/details-dialog/details-dialog.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatBadge} from "@angular/material/badge";
import { HistoryComponent } from './component/history/history.component';
import { RechnungComponent } from './component/rechnung/rechnung.component';

@NgModule({

  declarations: [
    AppComponent,FormularComponent, StepperComponent, AdminPageComponent, AuftreageComponent, DetailsDialogComponent, HistoryComponent, RechnungComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatOption,
    MatTooltip,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    MatPaginator,
    MatBadge
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de' },
    provideHttpClient(withFetch()), provideClientHydration()
  ],
  bootstrap: [AppComponent],

})
export class AppModule {

}
