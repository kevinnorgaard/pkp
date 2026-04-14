import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GraphCmsService } from 'src/app/graphcms.service';
import { PageComponent } from '../page.component';

interface Executive {
  name: string;
  position: string;
  img: string;
  url?: string;
}

interface Leader {
  name: string;
  year: number;
  title: string;
}

interface ExecutivesResponse {
  data: {
    executives: Array<{
      name: string;
      position: string;
      image: { url: string };
      url?: string;
    }>;
  };
}

interface LeadersResponse {
  data: {
    leaders: Array<{
      name: string;
      year: number;
      title: string;
    }>;
  };
}

interface MembershipPageResponse {
  data: {
    membershipPages: Array<{
      compositeYear: number;
      compositeImage: { url: string };
      brotherhoodEvent: string[];
    }>;
  };
}

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
})
export class MembershipComponent extends PageComponent implements OnInit {
  private graphCmsService = inject(GraphCmsService);
  private destroyRef = inject(DestroyRef);

  executives: Executive[] = [];
  leaders: Leader[] = [];
  brotherhoods: string[];
  compositeImageUrl: string;
  compositeYear: number;

  showAllOnCampus = false;
  showAllOnCampusText = 'Show More';

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadExecutives();
    // this.loadLeaders();
    this.loadMembershipPage();
  }

  openUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  loadExecutives(): void {
    this.graphCmsService
      .getExecutives()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (executives) => (this.executives = this.jsonToExecutives(executives)),
      );
  }

  loadLeaders(): void {
    this.graphCmsService
      .getLeaders()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((leaders) => (this.leaders = this.jsonToLeaders(leaders)));
  }

  loadMembershipPage(): void {
    this.graphCmsService
      .getMembershipPage()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((membershipPage) => this.jsonToMembershipPage(membershipPage));
  }

  jsonToExecutives(data: unknown): Executive[] {
    const { executives } = (data as ExecutivesResponse).data;
    return executives.map((exec) => ({
      name: exec.name,
      position: exec.position,
      img: exec.image.url,
      url: exec.url,
    }));
  }

  jsonToLeaders(data: unknown): Leader[] {
    const { leaders } = (data as LeadersResponse).data;
    return leaders.map((leader) => ({
      name: leader.name,
      year: leader.year,
      title: leader.title,
    }));
  }

  jsonToMembershipPage(data: unknown): void {
    const membershipPage = (data as MembershipPageResponse).data
      .membershipPages[0];
    this.compositeYear = membershipPage.compositeYear;
    this.compositeImageUrl = membershipPage.compositeImage.url;
    this.brotherhoods = membershipPage.brotherhoodEvent;
  }

  toggleShowAllOnCampus(): void {
    this.showAllOnCampus = !this.showAllOnCampus;
    this.showAllOnCampusText = this.showAllOnCampus ? 'Show Less' : 'Show More';
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}
