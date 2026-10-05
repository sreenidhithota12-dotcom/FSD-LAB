import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contactForm: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {

    this.contactForm = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+$')
        ]
      ],

      middleName: [
        '',
        [
          Validators.pattern('^[A-Za-z]*$')
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+$')
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
        ]
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      subject: [
        '',
        [
          Validators.required
        ]
      ],

      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]

    });
  }

  onSubmit() {
  this.submitted = true;

  if (this.contactForm.valid) {
    this.successMessage = 'Form Submitted Successfully';
    this.contactForm.reset();
    this.submitted = false;
  }
}

fillAnotherForm() {
  this.successMessage = '';
  this.contactForm.reset();
  this.submitted = false;
}

}