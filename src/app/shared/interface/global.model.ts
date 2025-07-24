export interface MenuDto {
  id: string;
  code: string;
  name: string;
  order: number;
  path: string;
  icon?: string;
  parentMenu?: MenuDto | null;
  children?: MenuDto[];
}

export interface UserDto {
  username: string,
  password: string,
  position: string;
  photo: string;
}

export interface ErrorAlertDto {
  statusCode: number;
  message: string;
}

export interface Paging {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  totalPages: number;
}

export interface FilterSelectDto {
  value: string;
  label: string;
}