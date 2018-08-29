import { Component, OnInit } from '@angular/core';

interface Profile {
  img: string;
  name: string;
  position: string;
  positionAlt?: string;
}

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
  profiles: Profile[] = [
    {
      img: 'https://farm2.staticflickr.com/1880/43621031224_9b119f2a7a_z.jpg',
      name: 'Owen Browne',
      position: 'President'
    },
    {
      img: 'https://farm2.staticflickr.com/1895/43621032204_85cedf812d_z.jpg',
      name: 'John Akinwole',
      position: 'Vice President'
    },
    {
      img: 'https://farm2.staticflickr.com/1844/43621032114_db33bb9985_z.jpg',
      name: 'John Wahhab',
      position: 'Treasurer'
    },
    {
      img: 'https://farm2.staticflickr.com/1845/43621031414_dae6424e4b_z.jpg',
      name: 'Kevin Norgaard',
      position: 'Corresponding Secretary'
    },
    {
      img: 'https://farm2.staticflickr.com/1874/44289233692_7491c33679_z.jpg',
      name: 'Charles Harris',
      position: 'Recording Secretary'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Brandon Nguyen',
      position: 'Historian'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Emilio Cruz',
      position: 'Historian',
      positionAlt: 'Social Chair'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Ara Nersesian',
      position: 'Sergeant at Arms'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Abhinav Mupparaju',
      position: 'Chaplain'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Niklas Hammon',
      position: 'Recruitment Chair'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Scholarship Chair',
      position: 'Mitchell Neal'
    },
    {
      img: 'https://farm5.staticflickr.com/4496/26326436649_ff5c568e00_k.jpg',
      name: 'Milad Goodarzi',
      position: 'Health & Wellness Chair',
      positionAlt: 'Risk Management Chair'
    }
  ];

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

}
