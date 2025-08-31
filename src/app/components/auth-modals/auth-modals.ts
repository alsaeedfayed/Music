import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User_Model } from '@app/core/models/core.models';

@Component({
  selector: 'app-auth-modals',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modals.html',
  styleUrl: './auth-modals.scss',
})
export class AuthModals {
  private fb = inject(FormBuilder);
  submitted = false;

  // Typed form
  userRegisterForm = this.fb.nonNullable.group<User_Model>({
    firstName: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    middleName: this.fb.nonNullable.control(''),
    lastName: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    mobileNo: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
    emailId: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
    }),
    altMobileNo: this.fb.nonNullable.control(''),
    password: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    city: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    state: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    pincode: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    addressLine: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  isSignInVisible = false;
  isSignUpVisible = false;
  openSignInModal() {
    this.isSignInVisible = true;
  }

  closeSignInModal() {
    this.isSignInVisible = false;
    this.submitted = false;
    // this.userRegisterForm.reset();
  }

  openSignUpModal() {
    this.isSignUpVisible = true;
  }

  closeSignUpModal() {
    this.isSignUpVisible = false;
    this.submitted = false;
    this.userRegisterForm.reset();
  }

  register(): void {
    this.submitted = true;

    if (this.userRegisterForm.invalid) {
      this.userRegisterForm.markAllAsTouched();
      return;
    }
  }

  // Helper to check validity in template
  hasError(
    controlName: keyof typeof this.userRegisterForm.controls,
    error: string
  ): boolean {
    const control = this.userRegisterForm.get(controlName);
    return !!control && control.hasError(error) && this.submitted;
  }
}
