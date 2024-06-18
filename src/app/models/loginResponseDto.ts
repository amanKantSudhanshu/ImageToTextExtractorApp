export class LoginResponseDto {
  message: string;
  status: boolean;

  constructor(message: string, status: boolean) {
    (this.message = message), (this.status = status);
  }
}
