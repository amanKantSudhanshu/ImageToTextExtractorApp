export class EmployeeDto {
  employeeName: string;
  email: string;
  password: string;
  phoneNumber: string;

  constructor(
    employeeName: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    (this.employeeName = employeeName),
      (this.email = email),
      (this.password = password),
      (this.phoneNumber = phoneNumber);
  }
}
