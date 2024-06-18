import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { EmployeeDto } from '../models/employeeDto';
import { LoginDto } from '../models/loginDto';
import { LoginResponseDto } from '../models/loginResponseDto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  private usersUrl: string = 'http://localhost:9090/';

  getAllEmployee(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(
      this.usersUrl + 'employee' + '/' + 'getAllEmployee'
    );
  }

  /**This can be implemented like this when u want to have a proper message from the BE and need to show to
  Fe like "Registered SuccessFul" but */

  // registerEmployee(employeeData: EmployeeDto): Observable<string> {
  //   return this.http
  //     .post<string>(
  //       this.usersUrl + 'employee' + '/' + 'saveEmployee',
  //       employeeData
  //     )
  //     .pipe(catchError(this.handleError));
  // }
  /** If you don't want to change the BE then U need to do like this so that first u will convert
   * resposeType into text and then u can have employee name that has been resigtered successfully
   */
  registerEmployee(employeeData: EmployeeDto): Observable<string> {
    return this.http
      .post(this.usersUrl + 'employee/saveEmployee', employeeData, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Please Check if the Backend is Running or Not';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      if (error.status === 400 && typeof error.error === 'string') {
        try {
          const backendError = JSON.parse(error.error);
          if (backendError.message) {
            const match = backendError.message.match(
              /Key \(email\)=\((.*)\) already exists/
            );
            if (match) {
              errorMessage = `${match[1]} already exists.`;
            } else {
              errorMessage = backendError.message;
            }
          }
        } catch (e) {
          errorMessage = `Error: ${error.error}`;
        }
      }
    }

    return throwError(errorMessage);
  }

  loginEmployee(loginData: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      this.usersUrl + 'employee' + '/' + 'login',
      loginData
    );
  }
}
