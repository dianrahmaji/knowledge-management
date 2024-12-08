import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): Observable<{ message: string }> {
    return of({
      message: 'Hello, World!',
    });
  }
}
