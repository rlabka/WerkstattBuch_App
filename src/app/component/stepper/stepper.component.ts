import {Component, input, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../formular/formular.component";
import {StepperOrientation} from "@angular/cdk/stepper";
import {interval, map, Observable, Subscription, timestamp} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatChipListboxChange, MatChipSelectionChange} from "@angular/material/chips";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {style} from "@angular/animations";
import Swal from "sweetalert2";
import {AuftragService} from "../../service/AuftragService";
import {Auftrag} from "../../interface/Auftrag";
import {MatStepper} from "@angular/material/stepper";
import { WebSocketService } from '../../service/WebSocketService';



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
  autoinformationen!: FormGroup;
  termin!: FormGroup;

  stepperOrientation: any;
  isLinear= false;
  option1: any;
  option2: any;
  currentTime:Date;
  aktiveTermin=false;
  anzahlname: string;
  radwechsln=true;
  reifenwechsel=false;
  position: string='';


  private lat: number;
  private lng: number;

  protected readonly style = style;
  acceptTerms: boolean = false;
  isvisible: boolean=true;



  formGroup = this._formBuilder.group({
    acceptTerms: ['true', Validators.requiredTrue],
  });
  selected: any;
  @ViewChild(MatStepper) stepper!: MatStepper;
  private subscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder,  breakpointObserver: BreakpointObserver, private auftragservice: AuftragService ,private _formBuilder: FormBuilder
  ) {
    this.currentTime = new Date();
    this.anzahlname='Rädern';
    this.lat=0;
    this.lng=0;

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 900px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.kundeinformationen = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['',Validators.required],
      hausnummer: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      plz: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      stadt: ['',Validators.required],
      auswahl: ['', Validators.required]
    });
    this.autoinformationen = this.formBuilder.group({
      automarkeTeil1: ['',Validators.required],
      automarkeTeil2: ['',Validators.required],
      automarkeTeil3: ['',Validators.required],
      fahrzeugtyp: ['',Validators.required],
      reifengroesse: ['',Validators.required],
      radgroesse: ['',Validators.required],
      raederart: ['',Validators.required],
      lastindex: ['', Validators.required],
      anzahlreifen: [1]
    });

    this.termin = this.formBuilder.group({
      termindatum: ['',Validators.required],
      terminuhrzeit: ['',Validators.required],
    });
    this.termin.get('termindatum')?.disable();

    // @ts-ignore
    this.kundeinformationen.get('adresse').valueChanges.subscribe(value => {
      if (value==''){
        this.kundeinformationen.get('plz')?.enable();
        this.kundeinformationen.get('hausnummer')?.enable();
        this.kundeinformationen.get('stadt')?.enable();
      }
    });
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    this.aktiveTermin = true;
    this.fetchTermine(this.termin.get('termindatum')?.value);
    console.log('Ausgewähltes Datum:', event.value?.getFullYear());
  }

  onSelectionChange($event: any) {
    const selectedValue = $event.source.value;
    if (selectedValue=='Räderwechseln'){
      this.radwechsln=true;
      this.reifenwechsel=false;
      this.anzahlname='Rädern';
      this.autoinformationen.get('reifengroesse')?.disable();
      this.autoinformationen.get('radgroesse')?.enable();
      this.autoinformationen.get('raederart')?.enable();

    }
    if (selectedValue=='Reifenwechseln'){
      this.radwechsln=false;
      this.reifenwechsel=true;
      this.anzahlname='Reifen';
      this.autoinformationen.get('reifengroesse')?.enable();
      this.autoinformationen.get('radgroesse')?.disable();
      this.autoinformationen.get('raederart')?.disable();
    }
  }

  confirmed() {

    const auftrag: Auftrag = {
      kundeinformationen: this.kundeinformationen.value,
      autoinformationen: {
        automarke: `${this.autoinformationen.get('automarkeTeil1')?.value ?? ''} ${this.autoinformationen.get('automarkeTeil2')?.value ?? ''} ${this.autoinformationen.get('automarkeTeil3')?.value ?? ''}`,
        fahrzeugtyp: this.autoinformationen.get('fahrzeugtyp')?.value ?? '',
        reifengroesse: this.autoinformationen.get('reifengroesse')?.value ?? '',
        radgroesse: this.autoinformationen.get('radgroesse')?.value ?? '',
        raederart: this.autoinformationen.get('raederart')?.value ?? '',
        anzahlreifen: this.autoinformationen.get('anzahlreifen')?.value ?? 1
      },
      timestamp: new Date(),
      termin: {
        termindatum: this.termin.get('termindatum')?.value?.toLocaleString() ?? '',
        terminuhrzeit: this.termin.get('terminuhrzeit')?.value ?? '',
      }
    };
    // Auftrag an das Backend senden
    this.auftragservice.saveAuftrag(auftrag).subscribe((response) => {
      Swal.fire({
        title: 'Vielen Dank für Ihre Anfrage!',
        text: 'Wir haben Ihre Anfrage erhalten und werden uns innerhalb der nächsten 10 Minuten bei Ihnen melden, um Ihren Auftrag zu bestätigen. Wir freuen uns darauf, Ihnen weiterzuhelfen!',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.stepper.reset();
          this.autoinformationen.get('anzahlreifen')?.setValue(1);
        }
      });
      console.log(response)
    }, error => {
      console.error('Fehler beim Speichern des Auftrags:', error);
      Swal.fire({
        title: 'Fehler',
        text: 'Beim Speichern des Auftrags ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
  ngOnDestroy(): void {
    // Aufräumen und Beenden des periodischen Abonnements beim Verlassen des Components
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // @ts-ignore
  termine:any[];
  startFetchingDataPeriodically(date: string): void {
    // Periodisches Aufrufen der Methode alle 5 Sekunden
    this.subscription = interval(5000).subscribe(() => {
      this.fetchTermine(date);
    });
  }

  fetchTermine(date: string): void {
    this.auftragservice.getTermin(date).subscribe(
      newData => {
        // Tiefes Vergleichen der Daten
        if (!this.areEqual(newData, this.termine)) {
          this.termine = newData;
          console.log('Updated data: ', this.termine);
        }
      },
      error => {
        console.error('Error fetching termine:', error);
        // Handle error here
      }
    );
  }

  areEqual(newData: any, oldData: any): boolean {
    // Tiefes Vergleichen der Daten
    return JSON.stringify(newData) === JSON.stringify(oldData);
  }

  increase() {
    const currentValue = this.autoinformationen.get('anzahlreifen')?.value;
    this.autoinformationen.get('anzahlreifen')?.setValue(currentValue + 1);
  }

  decrease() {
    const currentValue = this.autoinformationen.get('anzahlreifen')?.value;
    if (currentValue > 1) {
      this.autoinformationen.get('anzahlreifen')?.setValue(currentValue - 1);
    }
  }

  getPosition() {
    return new Promise(async (resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;

            }
            this.position = `${this.lat}, ${this.lng}`;
            this.kundeinformationen.get('adresse')?.setValue(this.position);
            if(this.position!=null){
              this.kundeinformationen.get('plz')?.disable();
              this.kundeinformationen.get('hausnummer')?.disable();
              this.kundeinformationen.get('stadt')?.disable();
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  onSubmit() {

  }
}
