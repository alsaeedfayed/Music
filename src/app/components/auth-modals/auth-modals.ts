import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Register_Payload_Model,
  User_Model,
} from '@app/core/models/core.models';
import { Auth, Login } from '@app/core/services/auth/auth';
import { CookieService } from '@app/core/services/cookies/cookie';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
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
  private store = inject(RootStore);
  private cookies = inject(CookieService);
  submitted = false;

  userSignInForm = this.fb.nonNullable.group<{
    emailID: FormControl<string>;
    password: FormControl<string>;
  }>({
    emailID: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

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
    this.userSignInForm.reset();
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

  signIn(): void {
    this.submitted = true;
    if (this.userSignInForm.invalid) {
      this.userSignInForm.markAllAsTouched();
      return;
    }
    const payload: { emailId: string; password: string } = {
      emailId: this.userSignInForm.controls.emailID.value,
      password: this.userSignInForm.controls.password.value,
    };

    this.authService.login(payload).subscribe({
      next: (res: Login) => {
        this.closeSignInModal();
        this.toast.success(res.message);
        this.store.auth.setUserSession(res.data);
        this.cookies.set('token', this.store.auth.session()?.token!, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        console.log(this.cookies.get('token'));
      },
      error: (err) => {
        this.toast.error(err.message);
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

  hasErrorSignIn(
    controlName: keyof typeof this.userSignInForm.controls,
    error: string
  ): boolean {
    const control = this.userSignInForm.get(controlName);
    return !!control && control.hasError(error) && this.submitted;
  }
}
