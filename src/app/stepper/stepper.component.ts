import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../formular/formular.component";
import {StepperOrientation} from "@angular/cdk/stepper";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent {


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  kundeinformationen!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;


  constructor(private formBuilder: FormBuilder,    breakpointObserver: BreakpointObserver,
  ) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.kundeinformationen = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['',Validators.required],
      hausnummer: ['', Validators.required],
      plz: ['',Validators.required]
    });


  }

}
