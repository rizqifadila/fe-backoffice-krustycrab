import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { RouterLink, Router, ActivatedRoute, Params } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { AlertErrorComponent } from "../../../../../shared/components/alert-error/alert-error.component";
import { BreadcrumbComponent } from "../../../../../shared/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "../../../../../shared/components/breadcrumb/model/breadcrumb.model";
import { DialogConfirmationComponent } from "../../../../../shared/components/dialogs/dialog-confirmation/dialog-confirmation.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { FilterSelectDto, Paging, ErrorAlertDto } from "../../../../../shared/interface/global.model";
import { EmployeeStatusOptions, EmployeeGroupOptions, itemsRowPerPage, selectedRowPerPage } from "../../../../../shared/types/constant";
import { EmployeeDto } from "../../model/employee.model";
import { EmployeeService } from "../../service/employee.service";

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    AlertErrorComponent,
    LoadingComponent,
    BreadcrumbComponent,
    NgSelectModule,
    DialogConfirmationComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {

  title = inject(Title);
  router = inject(Router);
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  @ViewChild(DialogConfirmationComponent, { static: false }) dialogConfirmation!: DialogConfirmationComponent;

  breadcrumbs: Breadcrumb[] = [
    {
      routerLink: '/master/employee',
      title: 'Employee Management',
      active: true,
    },
  ];

  isLoading: boolean = false;
  isShowFormFilter: boolean = false;
  
  params: Params = {};
  termFilter: FormControl = new FormControl('');
  sortFieldFilter: keyof EmployeeDto = 'firstName';
  sortOrderFilter: 'asc' | 'desc' = 'asc';

  employeeStatusOptions: Array<FilterSelectDto> = EmployeeStatusOptions;
  employeeStatusFilter: FormControl = new FormControl(null);
  isEmployeeStatusLoading: boolean = false;

  employeeGroupOptions: Array<FilterSelectDto> = EmployeeGroupOptions;
  employeeGroupFilter: FormControl = new FormControl(null);
  isEmployeeGroupLoading: boolean = false;
  
  stored: EmployeeDto[] = [];
  employees: EmployeeDto[] = [];
  selectedEmployee!: EmployeeDto;
  
  itemsRowPerPage = itemsRowPerPage;
  selectRowsPerPage: FormControl = new FormControl(selectedRowPerPage);
  startRow: number = 1;
  currentPage: number = 1;
  pagingData!: Paging;
  pages: number[] = [];
  errorAlert!: ErrorAlertDto;
  
  maskingGroupEmployee: { [key: string]: string } = {
    'FE': 'Frontend Team',
    'BE': 'Backend Team',
    'PM': 'Product Managers',
    'DA': 'Data Analysts',
  };

  // __________________________________________ onLoad Function
  ngOnInit(): void {
    this.title.setTitle(`BackOffice Krusty Crab - Employee Management`);
    this.activatedRoute.queryParams.subscribe({
      next: (params: Params) => {
        const { term, rowsPerPage, status, group, page } = params;
        if (term) this.termFilter.patchValue(term);
        if (rowsPerPage) this.selectRowsPerPage.patchValue(+rowsPerPage);
        if (status) this.employeeStatusFilter.patchValue(status);
        if (group) this.employeeGroupFilter.patchValue(group);
        if (page) this.currentPage = page;
        if (status || group) this.isShowFormFilter = true;
        
        this.params = this.payloadParams(params);
        this.loadData();
      }
    });

    this.watchTerm();
  }

  get employeeByPagination(): EmployeeDto[] {
    const startPage = (this.currentPage - 1) * (+this.params['rowsPerPage'] || selectedRowPerPage);
    return this.employees.slice(startPage, startPage + (+this.params['rowsPerPage'] || selectedRowPerPage));
  }

  loadData() {
    this.stored = this.employeeService.getAllEmployee();
    this.watchFilterList();  
  }

  watchFilterList(): void {
    this.filterQueryParam();
    this.applyFilterTerm();
    if (this.params['status']) this.applyFilterStatus();
    if (this.params['group']) this.applyFilterGroup();
    this.applySort();
    this.generatePages();
  }

  applyFilterTerm() {
    this.employees = this.stored.filter(employee =>
      Object.values(employee).some(item =>
        typeof item === 'string' && item.toLowerCase().includes(this.params['term'] || '')
      )
    );
  }

  applyFilterStatus(): void {
    this.employees = this.employees.filter(employee => employee.status === this.params['status']);
  }

  applyFilterGroup(): void {
    this.employees = this.employees.filter(employee => employee.group === this.params['group']);
  }

  applySort(): void {
    this.employees.sort((a, b) => {
      const valA = (a[this.sortFieldFilter] || '').toString().toLowerCase();
      const valB = (b[this.sortFieldFilter] || '').toString().toLowerCase();
      return this.sortOrderFilter === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }
  
  generatePages(): void {
    const totalPages = Math.ceil(this.employees.length / (+this.params['rowsPerPage'] || selectedRowPerPage));
    const current = +this.currentPage;
    const delta = 2;
    const range: number[] = [];
    
    for (let i = Math.max(2, current - delta); i <= Math.min(totalPages - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) range.unshift(-1);
    if (current + delta < totalPages - 1) range.push(-1);
    
    this.pages = [1, ...range, totalPages].filter((v, i, a) => v >= 1 && v <= totalPages && a.indexOf(v) === i);
    this.pagingData = {
      page: current,
      rowsPerPage: +this.params['rowsPerPage'] || selectedRowPerPage,
      totalRows: this.employees.length,
      totalPages: totalPages
    };
    
    this.startRow = (current - 1) * (+this.params['rowsPerPage'] || selectedRowPerPage) + 1;
  }

  watchTerm(): void {
    this.termFilter.valueChanges.pipe(debounceTime(750), distinctUntilChanged())
    .subscribe((term: string) => {
      if (term) {
        this.params['term'] = term;
        this.params['page'] = 1;
      } else {
        delete this.params['term'];
        this.params['page'] = 1;
      }
      this.navigate();
    });
  }

  onChangeEmployeeStatus(value: FilterSelectDto) {
    if (value) {
      this.params['status'] = value.value;
      this.params['page'] = 1;
    } else {
      delete this.params['status'];
      this.params['page'] = 1;
    }
    this.navigate();
  }

  onChangeEmployeeGroup(value: FilterSelectDto) {
    if (value) {
      this.params['group'] = value.value;
      this.params['page'] = 1;
    } else {
      delete this.params['group'];
      this.params['page'] = 1;
    }
    this.navigate();
  }

  // __________________________________________ onClick Function
  showFilter() {
    this.isShowFormFilter = !this.isShowFormFilter;
  }

  onChangeRowsData(value: number) {
    if (value) {
      this.params['rowsPerPage'] = value;
    } else {
      this.params['rowsPerPage'] = selectedRowPerPage;
      this.selectRowsPerPage.setValue(selectedRowPerPage);
    }
    
    this.params['page'] = 1;
    this.navigate();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pagingData.totalPages) {
      this.params['page'] = page;
      this.navigate();
    }
  }

  onDeleteRow(employee: EmployeeDto): void {
    this.selectedEmployee = employee;
    this.dialogConfirmation.title = `Confirmation`;
    this.dialogConfirmation.message = `Are you sure want to delete employee "${this.selectedEmployee.username}" ?`;
    this.dialogConfirmation.showCancelButton = true;
    this.dialogConfirmation.openDialogue();
  }

  onDeleteMenuConfirm(agree: boolean) {
    if (agree && this.selectedEmployee.id) {
      this.isLoading = true;
       setTimeout(() => {
        this.isLoading = false;
        this.employeeService.delete(this.selectedEmployee.id);
        this.loadData();
      }, 500);
    }
  }

  // __________________________________________ helper Function
  filterQueryParam() {
    const arrayParams = [
      'term',
      'page',
      'sort',
      'order',
      'rowsPerPage',
      'status',
      'group',
    ];
    for (let i = 0; i < arrayParams.length; i++) {
      const element = arrayParams[i];

      if (this.params[element] === '') {
        delete this.params[element];
      }
    }
  }

  navigate(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.params,
      replaceUrl: true,
    });
  }

  payloadParams(current: Params): Params {
    return {
      term: `${current['term'] ? current['term'] : ''}`,
      page: `${current['page'] ? current['page'] : 1}`,
      rowsPerPage: `${current['rowsPerPage'] ? current['rowsPerPage'] : selectedRowPerPage}`,
      order: `${current['order'] ? current['order'] : ''}`,
      sort: `${current['sort'] ? current['sort'] : ''}`,
      status: `${current['status'] ? current['status'] : ''}`,
      group: `${current['group'] ? current['group'] : ''}`,
    };
  }
}
