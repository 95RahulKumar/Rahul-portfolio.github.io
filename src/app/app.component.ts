import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Gsap';
  @ViewChild('square') square!: ElementRef;
  @ViewChild('scrollContent') scrollContent!: ElementRef;

  scroll!: LocomotiveScroll;
  showCloseBtn: boolean = false;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.animate();
    this.applyBg();
    this.slids();
  }

  animate() {
    const scroller = document.querySelector('.scroller') as any;
    const bodyScrollBar = Scrollbar.init(scroller, {
      damping: 0.1,
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
      ease: 'power2',
      scrollTrigger: {
        trigger: '.gallery',
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'restart none reverse none',
        pin: '.right',
        pinType: 'transform',
        snap: 1 / (photos.length - 1),
        scrub: true,
      },
    });
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
            duration: 1,
            backgroundColor: '#FAE1EE',
            ease: 'power1.inOut',
          });
        },
        onLeaveBack: () => {
          gsap.to('.gallery', {
            duration: 1,
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
            duration: 1,
            ease: 'power1.inOut',
            backgroundColor: '#E0F0FF',
          });
        },
        onLeaveBack: () => {
          gsap.to('.gallery', {
            duration: 1,
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
        '--clip': '0%',
        pointerEvents: 'none',
        ease: 'power2.inOut',
        onComplete: () => resolve(true),
      });
    });
  }
}
