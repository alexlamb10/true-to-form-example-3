import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public form: FormGroup = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required, this.validLastName]],
    email: ['', [Validators.required, Validators.email]],
  });

  validLastName(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return {
        validLastName: true,
      };
    }
    return control.value === 'Johnson' ? null : { validLastName: true };
  }

  get firstNameErrors() {
    return (
      this.form.controls.firstName.touched &&
      this.form.controls.firstName.errors
    );
  }

  public formUpdates$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    map((values) => {
      return {
        ...values,
        invalid: this.form.invalid,
      };
    })
  );

  constructor(private _fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
