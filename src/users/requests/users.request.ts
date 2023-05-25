import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class UserRequest {

    constructor( private readonly http: HttpService) {

    }


    async getUserInReqRes(id: number){

        return this.http.get(`https://reqres.in/api/users/${id}`).pipe(
          map(response => response.data)
        )
      }
}