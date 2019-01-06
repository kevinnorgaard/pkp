import { Component, OnInit } from '@angular/core';

interface Profile {
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
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  profiles: Profile[] = [
    {
      img: 'https://farm2.staticflickr.com/1844/43621032114_db33bb9985_z.jpg',
      name: 'John Wahhab',
      position: 'President',
      prevPosition: 'Former Treasurer',
      url: 'https://www.linkedin.com/in/johnwahhab/'
    },
    {
      img: 'https://farm2.staticflickr.com/1878/44328616812_073f3d427a_m.jpg',
      name: 'Kevin Norgaard',
      position: 'Vice President',
      prevPosition: 'Former Corresponding Secretary',
      prevPositionAlt: 'Former Rush Chair',
      url: 'https://www.linkedin.com/in/kevinnorgaard/'
    },
    {
      img: 'https://farm2.staticflickr.com/1956/45640665651_537e557cd5_m.jpg',
      name: 'Batisse Kasanchi',
      position: 'Treasurer',
      prevPosition: 'Former Finance Chair',
      prevPositionAlt: 'Former Rush Chair',
      url: 'https://www.linkedin.com/in/batisse-kashanchi-810268173/'
    },
    {
      img: 'https://farm2.staticflickr.com/1868/44387963562_fd2261f945.jpg',
      name: 'Milad Goodarzi',
      position: 'Corresponding Secretary',
      prevPosition: 'Former Health & Wellness Chair',
      prevPositionAlt: 'Former Risk Management Chair',
      url: 'https://www.linkedin.com/in/miladgoodarzi/'
    },
    {
      img: 'https://farm5.staticflickr.com/4912/45787472611_e80ac55907_m.jpg',
      name: 'Brandon Brunckhorst',
      position: 'Recording Secretary',
      prevPosition: 'Former Rush Chair',
      url: 'https://www.linkedin.com/in/batisse-kashanchi-810268173/'
    },
    {
      img: 'https://farm2.staticflickr.com/1852/30589115718_65946015b8_m.jpg',
      name: 'Kyle Yinger',
      position: 'Head Rush Chair',
      positionAlt: 'Social Chair',
      prevPosition: 'Former Rush Chair',
      url: 'https://www.linkedin.com/in/kyle-yinger/'
    },
    {
      img: 'https://farm2.staticflickr.com/1860/43660235354_d2f202309a_m.jpg',
      name: 'Charles Harris',
      position: 'Rush Chair',
      positionAlt: 'Chaplain',
      prevPosition: 'Former Recording Secretary',
      url: 'https://www.linkedin.com/in/charles-harris-636488159/'
    },
    {
      img: 'https://farm5.staticflickr.com/4811/31608600397_ef3cd04c67_m.jpg',
      name: 'Jason Wilder',
      position: 'Rush Chair',
      positionAlt: 'Risk Management Chair',
    },
    {
      img: 'https://farm5.staticflickr.com/4884/45824923334_ab25f37de2_m.jpg',
      name: 'Ethan Joves',
      position: 'Historian',
    },
    {
      img: 'https://farm5.staticflickr.com/4839/32196784588_4e49ec62c4_m.jpg',
      name: 'Matthew Farfan',
      position: 'Sergeant at Arms'
    },
    {
      img: 'https://farm8.staticflickr.com/7837/31606058907_b58b0d670a_m.jpg',
      name: 'Andrew Dertli',
      position: 'Brotherhood Chair',
      url: 'https://www.linkedin.com/in/andrew-dertli-597452175/'
    },
    // {
    //   img: '',
    //   name: 'Elijah Munck',
    //   position: 'Messenger',
    //   url: ''
    // },
    {
      img: 'https://farm5.staticflickr.com/4842/32751579328_d2125dce9d_m.jpg',
      name: 'Nima Altafi',
      position: 'Philanthropy Chair',
      url: 'https://www.linkedin.com/in/nima-altafi-a2159a160/'
    },
    {
      img: 'https://farm5.staticflickr.com/4835/45704863515_8fa35f5d7b_m.jpg',
      name: 'Niklas Hammon',
      position: 'Community Service Chair',
      url: 'https://www.linkedin.com/in/niklas-hammon-9b0459155/'
    },
    {
      img: 'https://farm2.staticflickr.com/1894/29520553957_8d5ae8f878.jpg',
      name: 'Mitchell Neal',
      position: 'Scholarship Chair',
      url: 'https://www.linkedin.com/in/mitchell-neal-278a1516a/'
    },
    {
      img: 'https://farm5.staticflickr.com/4816/32196784518_c36a014569_m.jpg',
      name: 'Richard Chen',
      position: 'Alumni Relations Chair',
      url: 'https://www.linkedin.com/in/raybenchen/'
    },
    {
      img: 'https://farm8.staticflickr.com/7874/45886012724_6359acb82e_m.jpg',
      name: 'Rohan Hemrajani',
      position: 'Finance Chair',
      url: ''
    },
    {
      img: 'https://farm2.staticflickr.com/1975/44726692525_2b0375b04a_m.jpg',
      name: 'Jarod Robinson',
      position: 'Tech Chair',
      prevPosition: 'Sports Chair',
      url: 'https://www.linkedin.com/in/jarod-robinson-6b8926126/'
    },
    {
      img: 'https://farm2.staticflickr.com/1953/43826212250_65d080bc67_m.jpg',
      name: 'Aaron Shaffer',
      position: 'Chapter Advisor',
      url: 'https://www.linkedin.com/in/aarons3/'
    },
    {
      img: 'https://farm8.staticflickr.com/7924/45822469744_fffa13d527_m.jpg',
      name: 'Ian Delzer',
      position: 'Faculty Advisor',
      url: 'https://www.linkedin.com/in/ian-delzer-98000932/'
    }
  ];

  previousLeadership: Leadership[] = [
    {
      year: 2019,
      title: 'IFC President',
      recipient: 'Charles Harris'
    },
    {
      year: 2019,
      title: 'IFC VP Risk Management',
      recipient: 'Jason Wilder'
    },
    {
      year: 2019,
      title: 'IFC VP Fraternity Relations',
      recipient: 'Brandon Brunckhorst'
    },
    {
      year: 2019,
      title: 'Head of Chairs Board of Engineering Conference',
      recipient: 'Niklas Hammon'
    },
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
  ];

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

  showAllLeaders = false;
  showAllLeadersText = 'Show Previous Positions';
  showAllOnCampus = false;
  showAllOnCampusText = 'Show More';

  constructor() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('scroll-up-btn').style.visibility = 'hidden';
      } else {
        document.getElementById('scroll-up-btn').style.visibility = 'visible';
      }
      prevScrollpos = currentScrollPos;
    };
  }

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
      this.showAllOnCampusText = 'Show Less';
    } else {
      this.showAllOnCampusText = 'Show More';
    }
  }

  getYear() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dateStringList = dateString.split('/');
    const year = dateStringList[2];
    return Number(year);
  }

  scrollTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
