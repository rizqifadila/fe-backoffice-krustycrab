import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeDto, EmployeeListDto } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees$ = new BehaviorSubject<EmployeeDto[]>([]);

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('BACKOFFICE_EMPLOYEES');
    
    if (!stored) {
      this.http.get<EmployeeListDto>('assets/data/dummy_employees.json').subscribe(data => {
        localStorage.setItem('BACKOFFICE_EMPLOYEES', JSON.stringify(data));
      });
    }
  }

  getAllEmployee(): EmployeeDto[] {
    return this.loadEmployee();
  }

  loadEmployee(): EmployeeDto[] {
    const raw = JSON.parse(localStorage.getItem('BACKOFFICE_EMPLOYEES') || '{}');
    return raw.employee || [];
  }

  private refreshStoreEmployee(data: EmployeeDto[]): void {
    const dto: EmployeeListDto = { employee: data };
    localStorage.setItem('BACKOFFICE_EMPLOYEES', JSON.stringify(dto));
  }

  delete(id: string) {
    const data = this.loadEmployee().filter(employee => employee.id !== id);
    this.refreshStoreEmployee(data);
  }

  getById(id: string): EmployeeDto | undefined {
    const all = this.getAllEmployee();
    return all.find(e => e.id === id);
  }

  create(data: EmployeeDto): void {
    const all = this.getAllEmployee();
    all.push(data);
    this.refreshStoreEmployee(all);
  }
  
  update(id: string, data: EmployeeDto): void {
    let all = this.getAllEmployee();
    const index = all.findIndex(e => e.id === id);
    if (index !== -1) {
      all[index] = { ...data };
      this.refreshStoreEmployee(all);
    }
  }
}
