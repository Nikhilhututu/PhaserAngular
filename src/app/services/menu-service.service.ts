import { Injectable } from '@angular/core';
import { WheelItem } from '../models/wheelItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(){
    //Here I mimic what a menu could look like

    var arr: Array<WheelItem> = [
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/3 Ninjas Kick Back.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/7th Saga, The.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/90 Minutes - European Prime Goal.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/2020 Super Baseball.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/A.S.P. - Air Strike Patrol.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Aaahh!!! Real Monsters.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/ABC Monday Night Football.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Accele Brid.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Ace o Nerae!.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/ACME Animation Factory.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Acrobat Mission.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Action Pachio.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/ActRaiser 2.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/ActRaiser.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Addams Family Values.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Addams Family, The - Pugsley's Scavenger Hunt.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Addams Family, The.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Adventures of Batman & Robin, The.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Adventures of Dr. Franken, The.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Adventures of Kid Kleets, The.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Adventures of Rocky and Bullwinkle and Friends, The.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Adventures of Yogi Bear.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Aero Fighters.png",
        Id: "",
      },
      {
        Name: "Name Would be here", 
        WheelLocation: "assets/wheels/Aero the Acro-Bat 2.png",
        Id: "",
      },
    ];
    
    return arr;

  }
}
