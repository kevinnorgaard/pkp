import { Component, OnInit } from '@angular/core';

interface Profile {
  img: string;
  name: string;
  position: string;
  positionAlt?: string;
  url?: string;
}

interface Leadership {
  year: string;
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
      img: 'https://farm2.staticflickr.com/1885/43660107444_41f39ba10e.jpg',
      name: 'Owen Browne',
      position: 'President',
      url: 'https://www.linkedin.com/in/owen-browne-05b571124/'
    },
    {
      img: 'https://farm2.staticflickr.com/1895/43621032204_85cedf812d_z.jpg',
      name: 'John Akinwole',
      position: 'Vice President',
      url: 'https://www.linkedin.com/in/john-akinwole-70253a124/'
    },
    {
      img: 'https://farm2.staticflickr.com/1844/43621032114_db33bb9985_z.jpg',
      name: 'John Wahhab',
      position: 'Treasurer',
      url: 'https://www.linkedin.com/in/johnwahhab/'
    },
    {
      img: 'https://farm2.staticflickr.com/1878/44328616812_073f3d427a.jpg',
      name: 'Kevin Norgaard',
      position: 'Corresponding Secretary',
      url: 'https://www.linkedin.com/in/kevinnorgaard/'
    },
    {
      img: 'https://farm2.staticflickr.com/1860/43660235354_d2f202309a.jpg',
      name: 'Charles Harris',
      position: 'Recording Secretary',
      url: 'https://www.linkedin.com/in/charles-harris-636488159/'
    },
    {
      img: 'https://farm2.staticflickr.com/1872/42628261940_c10f4e4cef.jpg',
      name: 'Niklas Hammon',
      position: 'Head Rush Chair',
      url: 'https://www.linkedin.com/in/niklas-hammon-9b0459155/'
    },
    {
      img: 'https://farm2.staticflickr.com/1852/44585651841_96f182e709.jpg',
      name: 'Jarod Robinson',
      position: 'Rush Chair',
      url: 'https://www.linkedin.com/in/jarod-robinson-6b8926126/'
    },
    {
      img: 'https://farm2.staticflickr.com/1852/30589115718_65946015b8.jpg',
      name: 'Kyle Yinger',
      position: 'Rush Chair',
      url: 'https://www.linkedin.com/in/kyle-yinger/'
    },
    {
      img: 'https://farm2.staticflickr.com/1869/44389728292_3b0b228994.jpg',
      name: 'Brandon Nguyen',
      position: 'Historian'
    },
    {
      img: 'https://farm2.staticflickr.com/1869/42628355120_2197e08dbd.jpg',
      name: 'Emilio Cruz',
      position: 'Messenger,',
      positionAlt: 'Social Chair'
    },
    {
      img: 'https://farm2.staticflickr.com/1894/44387963792_2859eba916.jpg',
      name: 'Ara Nersesian',
      position: 'Sergeant at Arms',
      url: 'https://www.linkedin.com/in/ara-n-183aa393/'
    },
    {
      img: 'https://farm2.staticflickr.com/1863/42628262250_72d3493d34.jpg',
      name: 'Abhinav Mupparaju',
      position: 'Chaplain',
      url: 'https://www.linkedin.com/in/abhinav-mupparaju-931869141/'
    },
    {
      img: 'https://farm2.staticflickr.com/1894/29520553957_8d5ae8f878.jpg',
      name: 'Mitchell Neal',
      position: 'Scholarship Chair'
    },
    {
      img: 'https://farm2.staticflickr.com/1868/44387963562_fd2261f945.jpg',
      name: 'Milad Goodarzi',
      position: 'Health & Wellness Chair,',
      positionAlt: 'Risk Management Chair',
      url: 'https://www.linkedin.com/in/milad-goodarzi-a81894156/'
    }
  ];

  previousLeadership: Leadership[] = [
    {
      year: '2018',
      title: 'IFC President',
      recipient: 'John Akinwole'
    },
    {
      year: '2018',
      title: 'IFC VP of Fraternity Relations',
      recipient: 'Charles Harris'
    },
    {
      year: '2018',
      title: 'ASUCI Associate Justice',
      recipient: 'John Akinwole'
    },
    {
      year: '2018',
      title: 'Club Basketball Treasurer',
      recipient: 'Michael Molen'
    },
    {
      year: '2018',
      title: 'Irvine 500 Investments Collective President',
      recipient: 'Branden Schwaebe'
    },
    {
      year: '2017',
      title: 'IFC VP of Fraternity Relations',
      recipient: 'John Akinwole'
    },
    {
      year: '2016',
      title: 'Greek Week President',
      recipient: 'Ryan Krause'
    },
    {
      year: '2016',
      title: 'Mesa Court RA',
      recipient: 'Tej Vuligonda'
    },
    {
      year: '2015',
      title: 'Greek Week President',
      recipient: 'Pasha Shenasan'
    },
    {
      year: '2015',
      title: 'Greek Week Finance Chair',
      recipient: 'Alex Gutierrez'
    },
    {
      year: '2015',
      title: 'ISU President',
      recipient: 'Mahan Naeim'
    },
    {
      year: '2015',
      title: 'Club Volleyball Treasurer',
      recipient: 'Ryan Buck'
    },
    {
      year: '2015',
      title: 'Club Baseball President',
      recipient: 'Kenny Barbara'
    },
    {
      year: '2015',
      title: 'ASUCI Legislative Council ICS Rep',
      recipient: 'Tej Vuligonda'
    },
    {
      year: '2015',
      title: 'SPOP Staffer',
      recipient: 'Brandon Daryani'
    },
    {
      year: '2014',
      title: 'Greek Week Finance Chair',
      recipient: 'Brandon Conrad'
    },
    {
      year: '2013',
      title: 'Greek Week Finance Chair',
      recipient: 'Bryan Rodriguez'
    },
    {
      year: '2013',
      title: 'Greek Week Marketing Chair',
      recipient: 'Parker Laba'
    },
    {
      year: '2012',
      title: 'Greek Week Executive Chairman',
      recipient: 'Will Zimmer'
    },
    {
      year: '2011',
      title: 'AIPAC Scholarship Coordinator',
      recipient: 'Justin Hakim'
    },
    {
      year: '2011',
      title: 'Greek Week Executive Chairman',
      recipient: 'Alexander Kim'
    },
    {
      year: '2011',
      title: 'Greek Week Finance Chair',
      recipient: 'Justin Montis'
    },
    {
      year: '2011',
      title: 'IFC Executive Vice President',
      recipient: 'Alexander Kim'
    },
    {
      year: '2011',
      title: 'IFC Vice President of Recruitment',
      recipient: 'Ian Rogers'
    },
    {
      year: '2010',
      title: 'Greek Week Executive Chairman',
      recipient: 'Paul Riscalla'
    },
    {
      year: '2010',
      title: 'Greek Week Finance Chair',
      recipient: 'Phil Murphy'
    },
    {
      year: '2010',
      title: 'IFC VP Public Relations',
      recipient: 'Jared Dunn'
    },
    {
      year: '2009',
      title: 'IFC VP Programming',
      recipient: 'Tom Lerner'
    },
    {
      year: '2009',
      title: 'Greek Week Executive Chair',
      recipient: 'Samir Quarashi'
    },
    {
      year: '2008',
      title: 'ASUCI President',
      recipient: 'Mo Eldessouky'
    },
    {
      year: '2008',
      title: 'Greek Week VP Programming',
      recipient: 'Michael Sene'
    },
    {
      year: '2008',
      title: 'Greek Week VP Marketing',
      recipient: 'Samir Quarashi'
    },
    {
      year: '2006',
      title: 'ASUCI President',
      recipient: 'Carlos Feleciano'
    },
    {
      year: '2006',
      title: 'ASUCI Vice President',
      recipient: 'Zach Avalon'
    },
    {
      year: '2005',
      title: 'ASUCI President',
      recipient: 'Gabe Ayass'
    },
    {
      year: '2004',
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

  constructor() { }

  ngOnInit() {
  }

  openUrl(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

}
