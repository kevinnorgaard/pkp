import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';

const EXECUTIVES_QUERY = gql`
  {
    executives(orderBy: order_ASC) {
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

const LEADERS_QUERY = gql`
  {
    leaders(orderBy: year_DESC) {
      name
      year
      title
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphcmsService {
  constructor(private apollo: Apollo) {}

  getExecutives(): QueryRef<unknown, EmptyObject> {
    return this.apollo.watchQuery({ query: EXECUTIVES_QUERY });
  }

  getLeaders(): QueryRef<unknown, EmptyObject> {
    return this.apollo.watchQuery({ query: LEADERS_QUERY });
  }
}
