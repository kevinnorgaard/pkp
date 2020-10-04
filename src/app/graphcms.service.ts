import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';

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

  getExecutives(): QueryRef<unknown, EmptyObject> {
    return this.apollo.watchQuery({query: EXECUTIVES_QUERY});
  }
}
