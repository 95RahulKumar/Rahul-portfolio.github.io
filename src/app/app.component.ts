import { trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeInterval } from 'rxjs';
import LocomotiveScroll from 'locomotive-scroll';
import Scrollbar from 'smooth-scrollbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Gsap';
  scroll!: LocomotiveScroll;

  @ViewChild('square') square!: ElementRef;
  @ViewChild('scrollContent') scrollContent!: ElementRef;
  showCloseBtn: boolean = false;
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    // gsap.registerPlugin(CSSRulePlugin);
  }
  ngOnInit(): void {
    // this.something();
    this.animate();
    this.applyBg();
    this.slids();
  }

  animate() {
    const scroller = document.querySelector('.scroller') as any;
    const bodyScrollBar = Scrollbar.init(scroller, {
      damping: 0.1,
      // delegateTo: document,
      renderByPixels: true,
      delegateTo: document,
    });

    ScrollTrigger.scrollerProxy('.scroller', {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value as number;
        }
        return bodyScrollBar.scrollTop;
      },
    });

    bodyScrollBar.addListener(ScrollTrigger.update);

    ScrollTrigger.defaults({ scroller: scroller });

    let tl = gsap.timeline();
    let photos = gsap.utils.toArray('.photo');
    gsap.set('.photo:not(:first-child)', { y: '100%' });
    tl.to('.background', {
      '--path': '15%',
      duration: 2,
      ease: 'power2',
      scrollTrigger: {
        trigger: '.main',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: '.main',
      },
    }).to('.photo:not(:first-child)', {
      y: 0,
      ease: 'power2', // Use 'none' easing for linear animation
      scrollTrigger: {
        trigger: '.gallery',
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'restart none reverse none',
        pin: '.right',
        pinType: 'transform',
        snap: 1 / (photos.length - 1),
        scrub: true, // Use true instead of a value for automatic scrubbing optimization
      },
    });

    // Start the cards off-screen (adjust the value as needed)
  }
  applyBg() {
    let tl = gsap.timeline();
    // Section one
    gsap.to('.gallery', {
      immediateRender: false,
      scrollTrigger: {
        trigger: '.section-one',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'restart none restart none',
        onEnter: () => {
          gsap.to('.gallery', {
            duration: 1, // Adjust duration as needed
            backgroundColor: '#FAE1EE',
            ease: 'power1.inOut',
          });
        },
        onLeaveBack: () => {
          gsap.to('.gallery', {
            duration: 1, // Adjust duration as needed
            ease: 'power1.inOut',
            backgroundColor: '#FFFFFF',
          });
        },
      },
    });

    // Section two
    gsap.to('.gallery', {
      immediateRender: false,
      scrollTrigger: {
        trigger: '.section-two',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'restart none restart none',
        onEnter: () => {
          gsap.to('.gallery', {
            duration: 1, // Adjust duration as needed
            ease: 'power1.inOut',
            backgroundColor: '#E0F0FF',
          });
        },
        onLeaveBack: () => {
          gsap.to('.gallery', {
            duration: 1, // Adjust duration as needed
            ease: 'power1.inOut',
            backgroundColor: '#FAE1EE',
          });
        },
      },
    });

    // Section three
    gsap.to('.gallery', {
      immediateRender: false,
      scrollTrigger: {
        trigger: '.section-three',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'restart none restart none',
        onEnter: () => {
          gsap.to('.gallery', {
            duration: 1, // Adjust duration as needed
            ease: 'power1.inOut',
            backgroundColor: '#FFEDE0',
          });
        },
        onLeaveBack: () => {
          gsap.to('.gallery', {
            duration: 1, // Adjust duration as needed
            ease: 'power1.inOut',
            backgroundColor: '#E0F0FF',
          });
        },
      },
    });
  }
  something() {
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
  //sliding technoligy section
  slids() {
    let sections = gsap.utils.toArray('.slid');

    gsap.to(sections, {
      xPercent: -80 * (sections.length - 1),
      ease: 'power2',
      scrollTrigger: {
        trigger: '.slids',
        pin: '.slid',
        scrub: true,
        // snap: 1 / (sections.length - 1),
        start: 'top center',
        end: 'bottom center',
      },
    });
  }
  // Animation function for showing the overlay menu
  showMenu() {
    this.showCloseBtn = true;
    gsap.to('.overlay-menu', {
      duration: 0.5,
      // opacity: 1,
      '--clip': '150%',
      pointerEvents: 'auto',
      ease: 'power2.inOut',
    });
  }

  // Animation function for hiding the overlay menu
  async hideMenu() {
    const done = await this.hideAnimationbtn();
    if (done) this.showCloseBtn = false;
  }

  hideAnimationbtn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      gsap.to('.overlay-menu', {
        duration: 0.5,
        // opacity: 0,
        '--clip': '0%',
        pointerEvents: 'none',
        ease: 'power2.inOut',
        onComplete: () => resolve(true),
      });
    });
  }
}
