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

  jsonToExecutives(data: any): Executive[] {
    return data.data.executives.map((exec: any) => ({
      name: exec.name,
      position: exec.position,
      img: exec.image.url,
      url: exec.url,
    }));
  }

  jsonToLeaders(data: any): Leader[] {
    return data.data.leaders.map((leader: any) => ({
      name: leader.name,
      year: leader.year,
      title: leader.title,
    }));
  }

  jsonToMembershipPage(data: any): void {
    const membershipPage = data.data.membershipPages[0];
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
