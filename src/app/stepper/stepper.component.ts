import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../formular/formular.component";
import {StepperOrientation} from "@angular/cdk/stepper";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatChipSelectionChange} from "@angular/material/chips";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  kundeinformationen!: FormGroup;
  stepperOrientation: any;
  isLinear= false;
  autoinformationen!: FormGroup;
  option1: any;
  option2: any;
  currentTime:Date;
  aktiveTermin=false;

  constructor(private formBuilder: FormBuilder,    breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder
  ) {
    this.currentTime = new Date();

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 900px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.kundeinformationen = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tel: ['', Validators.required],
      email: this.emailFormControl,
      adresse: ['',Validators.required],
      hausnummer: ['', Validators.required],
      plz: ['',Validators.required],
      stadt: ['',Validators.required],
    });
    this.autoinformationen = this.formBuilder.group({
      automarke: ['',Validators.required],
      fahrzeugtyp: ['',Validators.required],
      rad: ['',Validators.required],
      reifen: ['',Validators.required],
    });
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    this.aktiveTermin=true;
    console.log('Ausgewähltes Datum:', event.value);
    // Hier können Sie event.value verwenden, um das ausgewählte Datum zu erhalten
  }

  onSelectionChange($event: any) {
    const selectedValue = $event.source.value;
    console.log('Selected value:', selectedValue);
  }

}
