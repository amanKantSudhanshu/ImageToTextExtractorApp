import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto } from '../../../models/employeeDto';
import { LoginDto } from '../../../models/loginDto';
import { LoginResponseDto } from '../../../models/loginResponseDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModelComponent } from '../error-model/error-model.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  imageModelList: any[] = [];
  password: any;
  employeeName: any;
  phoneNumber: any;
  email: any;
  registerForm!: FormGroup;
  submitted = false;
  isLogIn: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   phoneNumber: ['', Validators.required],
    //   emailId: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(4)]],
    // });
    this.registerForm = this.formBuilder.group({
      name: ['', []],
      phoneNumber: ['', []],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.updateFormValidators();
  }

  updateFormValidators(): void {
    if (this.isLogIn) {
      this.registerForm.get('name')?.clearValidators();
      this.registerForm.get('phoneNumber')?.clearValidators();
    } else {
      this.registerForm.get('name')?.setValidators([Validators.required]);
      this.registerForm
        .get('phoneNumber')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{10}$'),
        ]);
    }

    this.registerForm.get('name')?.updateValueAndValidity();
    this.registerForm.get('phoneNumber')?.updateValueAndValidity();
  }

  goToLanding() {
    this.router.navigate(['/vitraya/landing-page']);
  }

  signUp() {
    this.isLogIn = false;
  }

  goToLoggingPage() {
    this.isLogIn = true;
  }

  loginUser(): void {
    const loginDto: LoginDto = {
      email: this.registerForm.controls['emailId'].value,
      password: this.registerForm.controls['password'].value,
    };
    if (this.isLogIn) {
      if (
        this.registerForm.get('emailId')?.invalid ||
        this.registerForm.get('password')?.invalid
      ) {
        return;
      } else {
        this.employeeService
          .loginEmployee(loginDto)
          .subscribe((res: LoginResponseDto) => {
            if (!res.status) {
              this.messageService.add({
                severity: 'contrast',
                summary: 'Error',
                detail: res.message,
              });
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });
              const userName = this.registerForm.controls['emailId'].value;
              this.router.navigate([
                '/vitraya/landing-page',
                { userName: userName },
              ]);
            }
          });
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    const employeeData: EmployeeDto = {
      employeeName: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['emailId'].value,
      password: this.registerForm.controls['password'].value,
      phoneNumber: this.registerForm.controls['phoneNumber'].value,
    };
    if (this.registerForm.invalid) {
      return;
    } else {
      this.employeeService.registerEmployee(employeeData).subscribe({
        next: (response: string) => {
          this.errorMessage = null;
          this.router.navigate([
            '/vitraya/landing-page',
            { userName: response },
          ]);
        },
        error: (error: string) => {
          console.log(error);
          this.errorMessage = error;
          this.openErrorModal();
        },
      });
    }
  }

  openErrorModal(): void {
    const modalRef = this.modalService.open(ErrorModelComponent);
    modalRef.componentInstance.errorMessage = this.errorMessage;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
