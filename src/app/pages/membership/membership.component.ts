import { Component, OnInit } from '@angular/core';
import { GraphcmsService } from 'src/app/graphcms.service';
import { ScrollService } from 'src/scroll.service';
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
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent extends PageComponent implements OnInit {
  executives: Executive[] = [];
  leaders: Leader[] = [];

  brotherhoods: string[] = [
    'Thanksgiving Brotherhood Dinner',
    'Annual Camping Trips',
    'Observatory OC Concerts',
    'Angels & Lakers Game Brotherhood Events',
    'The ORIGINAL Fight Night',
    'Annual BP Tournament',
    'Brotherhood Poker Night',
    'Fruit Smash Brotherhood',
    'Big Bear Cabin Trip'
  ];

  showAllOnCampus = false;
  showAllOnCampusText = 'Show More';

  constructor(scrollService: ScrollService, private graphcmsService: GraphcmsService) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadExecutives();
    this.loadLeaders();
  }

  openUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  loadExecutives(): void {
    this.graphcmsService.getExecutives().valueChanges
      .subscribe(executives =>
        this.executives = this.jsonToExecutives(executives)
      );
  }

  loadLeaders(): void {
    this.graphcmsService.getLeaders().valueChanges
      .subscribe(leaders =>
        this.leaders = this.jsonToLeaders(leaders)
      );
  }

  jsonToExecutives(data: any): Executive[] {
    const executives: Executive[] = [];
    for (const exec of data.data.executives) {
      executives.push({
        name: exec.name,
        position: exec.position,
        img: exec.image.url,
        url: exec.url
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
        title: leader.title
      });
    }
    return leaders;
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
