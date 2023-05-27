import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext, // ArgumentsHost를 상속. 요청과 응답에 대한 정보를 갖고있음.
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  // 얻은 정보를 내부 규칙으로 평가
  private validateRequest(request: any) {
    const [type, token] = request.headers.authorization.split(' ');

    if (type === 'Bearer') {
      this.authService.verify(token);
      return true;
    } else {
      return false;
    }
  }
}
