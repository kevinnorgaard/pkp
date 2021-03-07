import { Component, OnInit } from '@angular/core';
import { GraphCmsService } from 'src/app/graphcms.service';
import { ScrollService } from 'src/app/scroll.service';
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
  executives: Executive[] = [];
  leaders: Leader[] = [];
  brotherhoods: string[];
  compositeImageUrl: string;
  compositeYear: number;

  showAllOnCampus = false;
  showAllOnCampusText = 'Show More';

  constructor(
    scrollService: ScrollService,
    private graphCmsService: GraphCmsService,
  ) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadExecutives();
    this.loadLeaders();
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
      .valueChanges.subscribe(
        (executives) => (this.executives = this.jsonToExecutives(executives)),
      );
  }

  loadLeaders(): void {
    this.graphCmsService
      .getLeaders()
      .valueChanges.subscribe(
        (leaders) => (this.leaders = this.jsonToLeaders(leaders)),
      );
  }

  loadMembershipPage(): void {
    this.graphCmsService
      .getMembershipPage()
      .valueChanges.subscribe((membershipPage) =>
        this.jsonToMembershipPage(membershipPage),
      );
  }

  jsonToExecutives(data: any): Executive[] {
    const executives: Executive[] = [];
    for (const exec of data.data.executives) {
      executives.push({
        name: exec.name,
        position: exec.position,
        img: exec.image.url,
        url: exec.url,
      });
    }
    return executives;
  }

  jsonToLeaders(data: any): Leader[] {
    const leaders: Leader[] = [];
    for (const leader of data.data.leaders) {
      leaders.push({
        name: leader.name,
        year: leader.year,
        title: leader.title,
      });
    }
    return leaders;
  }

  jsonToMembershipPage(data: any): any {
    const membershipPage = data.data.membershipPages[0];
    this.compositeYear = membershipPage.compositeYear;
    this.compositeImageUrl = membershipPage.compositeImage.url;
    this.brotherhoods = membershipPage.brotherhoodEvent;
    console.log(this.brotherhoods);
  }

  toggleShowAllOnCampus(): void {
    this.showAllOnCampus = !this.showAllOnCampus;
    if (this.showAllOnCampus) {
      this.showAllOnCampusText = 'Show Less';
    } else {
      this.showAllOnCampusText = 'Show More';
    }
  }

  getYear(): number {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dateStringList = dateString.split('/');
    const year = dateStringList[2];
    return Number(year);
  }
}
