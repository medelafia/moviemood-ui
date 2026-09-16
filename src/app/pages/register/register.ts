import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { User } from '../../models/user';
import { UserServices } from '../../services/user-service/user-services';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse } from '../../models/auth-response';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    RouterModule,
    PasswordModule,
    CheckboxModule,
    DatePickerModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly router: Router = inject(Router);
  readonly userService: UserServices = inject(UserServices);

  maxDate: Date = new Date();
  isLoading: boolean = false;
  error: string | null = null;

  informationForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(8)]),
    firstName: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
    enableRecommendationByEmail: new FormControl(false),
    terms: new FormControl(false, [Validators.requiredTrue])
  });

  getFormControl(name: string) {
    return this.informationForm.get(name);
  }

  submitForm() {
    this.error = null;

    // 1. Mark all controls as touched so validation messages show up
    this.informationForm.markAllAsTouched();

    // 2. Check password match
    const password = this.getFormControl("password")?.value?.trim();
    const confirmPassword = this.getFormControl("confirmPassword")?.value?.trim();

    if (password !== confirmPassword) {
      this.error = "The passwords do not match.";
      return;
    }

    // 3. Check the whole form validity (covers username, terms, etc.)
    if (this.informationForm.invalid) {
      this.error = "Please make sure all fields are filled in correctly.";
      return;
    }

    this.isLoading = true;

    // 4. Build the user object safely
    const rawBirthDate: Date = this.getFormControl("birthDate")?.value;

    const user: User = {
      firstName: this.getFormControl("firstName")?.value?.trim(),
      lastName: this.getFormControl("lastName")?.value?.trim(),
      email: this.getFormControl("email")?.value?.trim(),
      password: password!,
      birthDate: rawBirthDate,  
      username: this.getFormControl("username")?.value?.trim(),
      enableRecommendationByEmail: this.getFormControl("enableRecommendationByEmail")?.value ?? false
    };

    console.log(user);

    this.userService.registerUser(user).subscribe({
      next: (response: AuthResponse) => {
        Swal.fire({
          title: "Success",
          timer: 2000,
          text: "Registration successful",
          icon: "success"
        });
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading = false;
        Swal.fire({
          title: "Error",
          timer: 2000,
          text: err.error?.message ?? "Something went wrong",
          icon: "error"
        });
      }
    });
  }

  /**
   * Converts a Date object to a "YYYY-MM-DD" string,
   * which is what most backends (Spring Boot, etc.) expect.
   */
  private formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}