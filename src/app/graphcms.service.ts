import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import {gql} from 'apollo-angular';

const EXECUTIVES_QUERY = gql`
{
  executives {
    name
    position
    image {
      url
      fileName
    }
    url
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GraphcmsService {

  configUrl = 'assets/graphcms.json';

  constructor(private http: HttpClient) { }

  getExecutives() {
    return this.http.get(this.configUrl);
  }
}
