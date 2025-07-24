import { ValidationErrors } from "@angular/forms";
import { MenuDto, UserDto } from "../interface/global.model";

export const DummyMenus: MenuDto[] = [
  {
    "id": "menu-01",
    "code": "HOME",
    "name": "Home",
    "order": 0,
    "path": "/dashboard",
    "icon": "bi bi-house-door",
    "parentMenu": null,
    "children": []
  },
  {
    "id": "menu-02",
    "code": "MST",
    "name": "Master Data",
    "order": 1,
    "icon": "bi bi-database",
    "path": "/master",
    "parentMenu": null,
    "children": [
      {
          "id": "menu-03",
          "name": "Employee Management",
          "code": "MST_EMPLOYEE",
          "path": "/master/employee",
          "icon": "-",
          "order": 0
      },
      {
          "id": "menu-03",
          "name": "Contract Management",
          "code": "MST_CONTRACT",
          "path": "/master/contract",
          "icon": "-",
          "order": 1
      }
    ]
  }
]

export const DummyUsers: UserDto[] = [
  {
    username: 'frets',
    password: '123456',
    position: 'Staff',
    photo: 'assets/images/user.png',
  },
  {
    username: 'rizqi',
    password: 'P@ssw0rd!!',
    position: 'Manager',
    photo: 'assets/images/user.png',
  },
  {
    username: 'edi',
    password: 'P@ssw0rd',
    position: 'Staff',
    photo: 'assets/images/user.png',
  },
];

export const messagesValidation: ValidationErrors = {
  required: 'Kolom %s tidak boleh kosong.',
  requiredtrue: 'Kolom %s harus dicentang.',
  numericonly: 'Kolom %s harus berisi angka.',
  alphabetonly: 'Kolom %s harus berisi huruf.',
  minlength: 'Kolom %s harus memiliki setidaknya %s karakter.',
  maxlength: 'Kolom %s tidak boleh melebihi %s karakter.',
  maxitems: 'Kolom %s tidak boleh memiliki lebih dari %s item.',
  min: 'Kolom %s tidak boleh kurang dari %s.',
  max: 'Kolom %s tidak boleh lebih dari %s.',
  email: 'Kolom %s harus berupa alamat email yang valid.',
  requiredin: 'Kolom %s harus dalam salah satu format berikut: %s.',
  mustmatch: 'Kolom %s harus sama dengan field %s.',
  already: 'Kolom %s tidak boleh sama.',
  invalidCompare: 'Data %s tidak valid.',
  uppercase: 'Kolom %s harus menggunakan huruf kapital.',
  regex: 'Kolom %s hanya boleh dipisahkan oleh titik.',
  integer: 'Kolom %s harus berisi angka.',
  twodigitnumber: 'Kolom %s hanya boleh memiliki maksimal dua digit.',
  usernamepattern:
    'Kolom %s harus berisi huruf kecil, angka, dan karakter _ . -.',
  phonepattern: 'Kolom %s harus berisi 9 hingga 14 digit.',
  regexurl: 'Kolom %s harus berupa URL yang valid.',
  regexfullname: 'Kolom %s harus berisi huruf dan karakter titik (.)',
  regexpath: 'Kolom %s harus berupa URL yang valid.',
  appnamepattern:
    'Kolom %s harus berisi huruf atau kombinasi huruf dan angka.',
  pattern:
    'Kolom %s harus memiliki setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter spesial.',
  confirmpassword: 'Kata sandi tidak cocok.'
};

export const itemsRowPerPage = [5, 10, 15, 20];
export const selectedRowPerPage = 10;

export const EmployeeStatusOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' }
];

export const EmployeeGroupOptions = [
  { value: 'FE', label: 'Frontend Team' },
  { value: 'BE', label: 'Backend Team' },
  { value: 'PM', label: 'Product Managers' },
  { value: 'DA', label: 'Data Analysts' }
];
