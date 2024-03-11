import { trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Gsap';
  @ViewChild('square') square!: ElementRef;
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }
  ngOnInit(): void {
    this.something();
  }
  something() {
    // gsap.to('.square', { x: 677, duration: 3, scrollTrigger: '.square' });
    // here scrollTrigger will take point when sroll trigger so in this case
    // when square will comes into viewport then scrollTrigger will trigger
    // but what if we want trigger scroll when  scrollTrigger point center of the viewport
    // or some pixel from viewport
    // so here scrollTrigger:start/end properties will be used
    // eg
    // scrollTrigger:{
    //   trigger:'.square'  // trigger element
    // }
    gsap.to('.square', {
      x: 700,
      duration: 3,

      scrollTrigger: {
        trigger: '.square',
        // now here we will trigger the ele on diff point of viewport
        //by default trigger point is starting point of ele coms into viewport
        // start: 400, // diff way to set value eg 400(400px)
        // another way to  give is string value "top center" when trigger element top will be
        // center of viewport
        start: 'top 80%', // scroll-start marker mesure  when ele top will remains 30% away from viewport
        markers: true, // a helper marker in browser
        // to see end commenting x and instead of changing x value
        // we eill change the class
        // toggleClass: 'red',
        end: 'top 30%',
        // toggleActions: 'restart pause resume reset',
        //              onEnter(play/restart) onLeave(pause/reverse)  onEntetBack(resume) onLeaveBack(reset/complete)
        // onEnter ↓
        //onEntetBack ↓
        // onLeave ↑
        // onLeaveBack ↑
        //deferenttoggleAction can be used::: play pause resume reverse restart reset complete none (any action can be triggered)
        // this is used to repeate animation
        // it will take a string value with four diff value default is
        // play none none none
        toggleActions: 'restart none none none',
        //scrub: true/number, // it titely cupled to scroll (means animation will move along with
        // scroller it can be given in number also for more smoothness)
        scrub: 2,
      },
    });
  }
}
9;
