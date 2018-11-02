import { Component, OnInit } from '@angular/core';

interface Profile {
  current: boolean;
  img: string;
  name: string;
  position?: string;
  positionAlt?: string;
  prevPosition?: string;
  prevPositionAlt?: string;
  url?: string;
}

interface Leadership {
  year: number;
  title: string;
  recipient: string;
}

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
  profiles: Profile[] = [
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1844/43621032114_db33bb9985_z.jpg',
      name: 'John Wahhab',
      position: 'President',
      prevPosition: 'Former Treasurer',
      url: 'https://www.linkedin.com/in/johnwahhab/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1957/44913606744_bc4ccbc216_m.jpg',
      name: 'Kevin Norgaard',
      position: 'Vice President',
      prevPosition: 'Former Corresponding Secretary',
      url: 'https://www.linkedin.com/in/kevinnorgaard/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1956/45640665651_537e557cd5_m.jpg',
      name: 'Batisse Kasanchi',
      position: 'Treasurer',
      url: 'https://www.linkedin.com/in/batisse-kashanchi-810268173/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1872/42628261940_c10f4e4cef.jpg',
      name: 'Niklas Hammon',
      position: 'Head Rush Chair',
      url: 'https://www.linkedin.com/in/niklas-hammon-9b0459155/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1975/44726692525_2b0375b04a_m.jpg',
      name: 'Jarod Robinson',
      position: 'Rush Chair',
      prevPosition: 'Former Sports Chair',
      url: 'https://www.linkedin.com/in/jarod-robinson-6b8926126/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1852/30589115718_65946015b8.jpg',
      name: 'Kyle Yinger',
      position: 'Rush Chair',
      url: 'https://www.linkedin.com/in/kyle-yinger/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1869/44389728292_3b0b228994.jpg',
      name: 'Brandon Nguyen',
      position: 'Historian'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1869/42628355120_2197e08dbd.jpg',
      name: 'Emilio Cruz',
      position: 'Messenger,',
      positionAlt: 'Social Chair'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1922/44932357611_1cd1146206.jpg',
      name: 'Jackson Wickman',
      position: 'Brotherhood Chair',
      url: 'https://www.linkedin.com/in/jacksonwickman/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1894/44387963792_2859eba916.jpg',
      name: 'Ara Nersesian',
      position: 'Sergeant at Arms',
      url: 'https://www.linkedin.com/in/ara-n-183aa393/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1863/42628262250_72d3493d34.jpg',
      name: 'Abhinav Mupparaju',
      position: 'Chaplain',
      url: 'https://www.linkedin.com/in/abhinav-mupparaju-931869141/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1894/29520553957_8d5ae8f878.jpg',
      name: 'Mitchell Neal',
      position: 'Scholarship Chair'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1868/44387963562_fd2261f945.jpg',
      name: 'Milad Goodarzi',
      position: 'Health & Wellness Chair,',
      positionAlt: 'Risk Management Chair',
      url: 'https://www.linkedin.com/in/milad-goodarzi-a81894156/'
    },
    {
      current: true,
      img: 'https://farm2.staticflickr.com/1953/43826212250_65d080bc67_m.jpg',
      name: 'Aaron Shaffer',
      position: 'Chapter Advisor',
      url: 'https://www.linkedin.com/in/aarons3/'
    },
    // Previous leaders who are still active members only
    {
      current: false,
      img: 'https://farm2.staticflickr.com/1885/43660107444_41f39ba10e_m.jpg',
      name: 'Owen Browne',
      prevPosition: 'Former President',
      prevPositionAlt: 'Former Treasurer'
    },
    {
      current: false,
      img: 'https://farm2.staticflickr.com/1895/43621032204_85cedf812d_m.jpg',
      name: 'John Akinwole',
      prevPosition: 'Former Vice President'
    },
    {
      current: false,
      img: 'https://farm2.staticflickr.com/1860/43660235354_d2f202309a_m.jpg',
      name: 'Charles Harris',
      prevPosition: 'Former Recording Secretary'
    }
  ];

  previousLeadership: Leadership[] = [
    {
      year: 2018,
      title: 'IFC President',
      recipient: 'John Akinwole'
    },
    {
      year: 2018,
      title: 'IFC VP of Fraternity Relations',
      recipient: 'Charles Harris'
    },
    {
      year: 2018,
      title: 'ASUCI Associate Justice',
      recipient: 'John Akinwole'
    },
    {
      year: 2018,
      title: 'Club Basketball Treasurer',
      recipient: 'Michael Molen'
    },
    {
      year: 2018,
      title: 'Irvine 500 Investments Collective President',
      recipient: 'Branden Schwaebe'
    },
    {
      year: 2017,
      title: 'IFC VP of Fraternity Relations',
      recipient: 'John Akinwole'
    },
    {
      year: 2016,
      title: 'Greek Week President',
      recipient: 'Ryan Krause'
    },
    {
      year: 2016,
      title: 'Mesa Court RA',
      recipient: 'Tej Vuligonda'
    },
    {
      year: 2015,
      title: 'Greek Week President',
      recipient: 'Pasha Shenasan'
    },
    {
      year: 2015,
      title: 'Greek Week Finance Chair',
      recipient: 'Alex Gutierrez'
    },
    {
      year: 2015,
      title: 'ISU President',
      recipient: 'Mahan Naeim'
    },
    {
      year: 2015,
      title: 'Club Volleyball Treasurer',
      recipient: 'Ryan Buck'
    },
    {
      year: 2015,
      title: 'Club Baseball President',
      recipient: 'Kenny Barbara'
    },
    {
      year: 2015,
      title: 'ASUCI Legislative Council ICS Rep',
      recipient: 'Tej Vuligonda'
    },
    {
      year: 2015,
      title: 'SPOP Staffer',
      recipient: 'Brandon Daryani'
    },
    {
      year: 2014,
      title: 'Greek Week Finance Chair',
      recipient: 'Brandon Conrad'
    },
    {
      year: 2013,
      title: 'Greek Week Finance Chair',
      recipient: 'Bryan Rodriguez'
    },
    {
      year: 2013,
      title: 'Greek Week Marketing Chair',
      recipient: 'Parker Laba'
    },
    {
      year: 2012,
      title: 'Greek Week Executive Chairman',
      recipient: 'Will Zimmer'
    },
    {
      year: 2011,
      title: 'AIPAC Scholarship Coordinator',
      recipient: 'Justin Hakim'
    },
    {
      year: 2011,
      title: 'Greek Week Executive Chairman',
      recipient: 'Alexander Kim'
    },
    {
      year: 2011,
      title: 'Greek Week Finance Chair',
      recipient: 'Justin Montis'
    },
    {
      year: 2011,
      title: 'IFC Executive Vice President',
      recipient: 'Alexander Kim'
    },
    {
      year: 2011,
      title: 'IFC Vice President of Recruitment',
      recipient: 'Ian Rogers'
    },
    {
      year: 2010,
      title: 'Greek Week Executive Chairman',
      recipient: 'Paul Riscalla'
    },
    {
      year: 2010,
      title: 'Greek Week Finance Chair',
      recipient: 'Phil Murphy'
    },
    {
      year: 2010,
      title: 'IFC VP Public Relations',
      recipient: 'Jared Dunn'
    },
    {
      year: 2009,
      title: 'IFC VP Programming',
      recipient: 'Tom Lerner'
    },
    {
      year: 2009,
      title: 'Greek Week Executive Chair',
      recipient: 'Samir Quarashi'
    },
    {
      year: 2008,
      title: 'ASUCI President',
      recipient: 'Mo Eldessouky'
    },
    {
      year: 2008,
      title: 'Greek Week VP Programming',
      recipient: 'Michael Sene'
    },
    {
      year: 2008,
      title: 'Greek Week VP Marketing',
      recipient: 'Samir Quarashi'
    },
    {
      year: 2006,
      title: 'ASUCI President',
      recipient: 'Carlos Feleciano'
    },
    {
      year: 2006,
      title: 'ASUCI Vice President',
      recipient: 'Zach Avalon'
    },
    {
      year: 2005,
      title: 'ASUCI President',
      recipient: 'Gabe Ayass'
    },
    {
      year: 2004,
      title: 'ASUCI President',
      recipient: 'Sammi Shaaya'
    }
  ]

  brotherhoods: string[] = [
    'Thanksgiving Brotherhood Dinner',
    'Annual Camping Trips',
    'Annual Paintballing Trips',
    'Angels & Lakers Game Brotherhood Events',
    'The ORIGINAL Fight Night',
    'Annual BP Tournament',
    'Brotherhood Poker Night',
    'Fruit Smash Brotherhood',
    'Duck\'s Hockey Game',
    'Big Bear Cabin Trip'
  ];

  showAllLeaders = false;
  showAllLeadersText = 'Show Previous Positions';
  showAllOnCampus = false;
  showAllOnCampusText = 'Show All Positions';

  constructor() { }

  ngOnInit() {
  }

  openUrl(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  toggleShowAllLeaders() {
    this.showAllLeaders = !this.showAllLeaders;
    if (this.showAllLeaders) {
      this.showAllLeadersText = 'Hide Previous Positions';
    } else {
      this.showAllLeadersText = 'Show Previous Positions';
    }
  }

  toggleShowAllOnCampus() {
    this.showAllOnCampus = !this.showAllOnCampus;
    if (this.showAllOnCampus) {
      this.showAllOnCampusText = 'Hide All Positions';
    } else {
      this.showAllOnCampusText = 'Show All Positions';
    }
  }

  getYear() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dateStringList = dateString.split('/');
    const year = dateStringList[2];
    return Number(year);
  }
}
