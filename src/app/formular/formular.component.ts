import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatMenuTrigger} from "@angular/material/menu";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None
})

export class FormularComponent {

}

