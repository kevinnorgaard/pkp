import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
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

  constructor(private apollo: Apollo) { }

  getExecutives() {
    return this.apollo.watchQuery({query: EXECUTIVES_QUERY});
  }
}
