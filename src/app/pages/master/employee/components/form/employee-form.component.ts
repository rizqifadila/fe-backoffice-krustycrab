import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCurrencyDirective } from "ngx-currency";
import { EmployeeDto } from '../../model/employee.model';
import { customCurrencyMask, EmployeeGroupOptions, EmployeeStatusOptions } from '../../../../../shared/types/constant';
import { FilterSelectDto } from '../../../../../shared/interface/global.model';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from '../../service/employee.service';
import { DialogConfirmationComponent } from '../../../../../shared/components/dialogs/dialog-confirmation/dialog-confirmation.component';
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/model/breadcrumb.model';
import { RulesInputComponent } from '../../../../../shared/components/rules-input/rules-input.component';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-employee-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    NgxCurrencyDirective,
    NgSelectModule,
    DialogConfirmationComponent,
    BreadcrumbComponent,
    RulesInputComponent,
    LoadingComponent
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  
  title = inject(Title);
  router = inject(Router);
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  @ViewChild(DialogConfirmationComponent, { static: false }) dialogConfirmation!: DialogConfirmationComponent;

  breadcrumbs: Breadcrumb[] = [
    {
      routerLink: '/master/employee',
      title: 'Employee Management',
      active: false,
    },
    {
      routerLink: '/master/employee/form',
      title: 'Form',
      active: true,
    },
  ];
  
  employeeForm!: FormGroup;
  id!: string;
  employee!: EmployeeDto;
  params: Params = {};
  today: string = new Date().toISOString().split('T')[0];
  isLoading: boolean = false;

  customCurrencyMaskConfig = {
    ...customCurrencyMask,
    allowNegative: false,
  };
  
  employeeStatusOptions: Array<FilterSelectDto> = EmployeeStatusOptions;
  isEmployeeStatusLoading: boolean = false;

  employeeGroupOptions: Array<FilterSelectDto> = EmployeeGroupOptions;
  isEmployeeGroupLoading: boolean = false;

  // __________________________________________ onLoad Function
  ngOnInit() {
    this.title.setTitle(`Backoffice Krusty Crab - Employee Management`);
    this.buildForm();
    this.isLoading = true;
    this.activatedRoute.params.subscribe({
      next: (params) => {
        setTimeout(() => {
          const id = params['id'] || '';
          if (id) {
            this.id = id;
            const employee = this.employeeService.getById(id);
            if (employee) {
              this.employeeForm.patchValue(employee);
            }
          }
          this.isLoading = false;
        }, 500);
      },
    });
  }

  buildForm(): void {
    this.employeeForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [Validators.required, this.maxDateValidator(this.today)]),
      basicSalary: new FormControl(0),
      status: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }


  // __________________________________________ onChange / onClick Function
  submitForm() {
    if (!this.employeeForm.valid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    let formValue = this.employeeForm.value;
    this.isLoading = true;
    if (this.id) {
      setTimeout(() => {
        formValue = {
          ...formValue,
          id: this.id,
        };

        this.employeeService.update(formValue, this.id);
        this.isLoading = false;
        this.showModalSuccess();
      }, 1000);
    } else {
      setTimeout(() => {
        formValue = {
          ...formValue,
          id: this.generateUUID(),
        };

        this.employeeService.create(formValue);
        this.isLoading = false;
        this.showModalSuccess();
      }, 1000);
    }

  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  showModalSuccess() {
    this.dialogConfirmation.title = `Success`;
    this.dialogConfirmation.message = `Employee has been successfully ${this.id ? 'updated' : 'created'}.`;
    this.dialogConfirmation.showCancelButton = false;
    this.dialogConfirmation.openDialogue();
  }

  onModalSuccessConfirm(agree: boolean) {
    this.router.navigate(['/master/employee']);
  }
  
  // __________________________________________ helper Function
  maxDateValidator(max: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value > max ? { max: true } : null;
    };
  }
}
