import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterModule, Params } from '@angular/router';
import { Breadcrumb } from '../../../../../../shared/components/breadcrumb/model/breadcrumb.model';
import { DialogConfirmationComponent } from '../../../../../../shared/components/dialogs/dialog-confirmation/dialog-confirmation.component';
import { EmployeeDto } from '../../../model/employee.model';
import { EmployeeService } from '../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../../../shared/components/breadcrumb/breadcrumb.component';
import { LoadingComponent } from '../../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-employee-detail',
  imports: [
    CommonModule,  
    RouterModule,
    BreadcrumbComponent,
    LoadingComponent
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {

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
      routerLink: '/master/employee/detail',
      title: 'Detail',
      active: true,
    },
  ];

  id!: string;
  employee!: EmployeeDto | null;
  isLoading: boolean = false;
  avatar: string | ArrayBuffer | File | null = 'assets/images/user.png';
  backQueryParams: Params = {};

  maskingGroupEmployee: { [key: string]: string } = {
    'FE': 'Frontend Team',
    'BE': 'Backend Team',
    'PM': 'Product Managers',
    'DA': 'Data Analysts',
    'MB': 'Mobile Dev',
    'QAE': 'QA Engineers',
    'UI/UX': 'UI/UX Designers',
    'DS': 'DevOps Squad',
    'ST': 'Security Team',
    'IT': 'Infra Team',
  };


  // __________________________________________ onLoad Function
  ngOnInit() {
    this.title.setTitle(`Backoffice Krusty Crab - Employee Management`);
    this.isLoading = true;
    this.activatedRoute.params.subscribe({
      next: (params) => {
        setTimeout(() => {
          const id = params['id'] || '';
          if (id) {
            this.id = id;
            this.employee = this.employeeService.getById(id) || null;
          }
          this.isLoading = false;
        }, 500);
      },
    });

    this.backQueryParams = this.activatedRoute.snapshot.queryParams;
  }


}
