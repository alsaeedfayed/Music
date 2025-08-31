import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Register_Payload_Model,
  User_Model,
} from '@app/core/models/core.models';
import { Auth } from '@app/core/services/auth/auth';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-auth-modals',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modals.html',
  styleUrl: './auth-modals.scss',
})
export class AuthModals {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private toast = inject(HotToastService);
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
    const payload: Register_Payload_Model = {
      userId: 0,
      firstName: this.userRegisterForm.controls.firstName.value,
      lastName: this.userRegisterForm.controls.lastName.value,
      middleName: this.userRegisterForm.controls.middleName.value,
      mobileNo: this.userRegisterForm.controls.mobileNo.value,
      altMobileNo: this.userRegisterForm.controls.altMobileNo.value,
      emailId: this.userRegisterForm.controls.emailId.value,
      password: this.userRegisterForm.controls.password.value,

      userAddress: {
        city: this.userRegisterForm.controls.city.value,
        state: this.userRegisterForm.controls.state.value,
        pincode: this.userRegisterForm.controls.pincode.value,
        addressLine: this.userRegisterForm.controls.addressLine.value,
      },
      userSocialDetails: {
        facebookProfileUrl: 'string',
        instagramHandle: 'string',
        linkdinProfileUrl: 'string',
        twitterHandle: 'string',
      },
    };

    this.authService.registerNewUser(payload).subscribe({
      next: (res: { message: string; result: boolean; data: string }) => {
        if (res.result) {
          this.toast.success('User registered success, please log in');
        } else {
          this.toast.error(res.message);
        }
      },
      error: (err) => {
        this.toast.error("This didn't work.");
      },
    });
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
