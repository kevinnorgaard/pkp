import { inject, Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';

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

const MEMBERSHIP_PAGE_QUERY = gql`
  {
    membershipPages {
      compositeImage {
        url
        fileName
      }
      compositeYear
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphCmsService {
  private apollo = inject(Apollo);

  getExecutives(): QueryRef<unknown> {
    return this.apollo.watchQuery({ query: EXECUTIVES_QUERY });
  }

  getLeaders(): QueryRef<unknown> {
    return this.apollo.watchQuery({ query: LEADERS_QUERY });
  }

  getMembershipPage(): QueryRef<unknown> {
    return this.apollo.watchQuery({ query: MEMBERSHIP_PAGE_QUERY });
  }
}
