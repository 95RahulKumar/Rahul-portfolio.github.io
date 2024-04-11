import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import Scrollbar from 'smooth-scrollbar';
import SplitType from 'split-type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Gsap';
  scroll!: LocomotiveScroll;
  showLoader = true;
  Myemail: string = 'mrrahulkumarvns@gmail.com';
  @ViewChild('square') square!: ElementRef;
  @ViewChild('scrollContent') scrollContent!: ElementRef;
  showCloseBtn: boolean = false;
  constructor(private cdref: ChangeDetectorRef) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  initLoader = async () => {
    await this.loader();
    this.cdref.detectChanges();
    this.cdref.markForCheck();
    this.Animatehome();
    this.initializeSmoothScroll();
    this.text();
    this.animate();
    this.applyBg();
    this.slids();
    this.splitText();
  };

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initLoader();
  }

  loader(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        this.showLoader = false;
        resolve(true);
      }, 4000);
    });
  }

  initializeSmoothScroll() {
    const scroller = document?.querySelector('.scroller') as any;
    const bodyScrollBar = Scrollbar?.init(scroller, {
      damping: 0.1,
      renderByPixels: true,
      delegateTo: document,
    });
    ScrollTrigger?.scrollerProxy('.scroller', {
      scrollTop(value) {
        if (arguments?.length) {
          bodyScrollBar.scrollTop = value as number;
        }
        return bodyScrollBar.scrollTop;
      },
    });
    bodyScrollBar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: scroller });
  }

  Animatehome() {
    gsap.fromTo(
      ['.main'],
      {
        opacity: 0,
        ease: 'power1.inOut',
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      }
    );
  }
  splitText() {
    const headtext = new SplitType('#split-head');
    let tl = gsap.timeline();
    tl.fromTo(
      '#split-head .word .char',
      {
        yPercent: 100,
        fontFamily: '"Dancing Script", cursiv52',
        opacity: 0,
      },
      {
        yPercent: 0,
        ease: 'power1.inOut',
        stagger: 0.1,
        repeat: -1, // Setting repeat to -1 for infinite repetition
        duration: 0.7, // Setting duration of animation to 8 seconds
        delay: 0.2,
        opacity: 1,
      }
    );
  }

  text() {
    gsap.fromTo(
      '.white',
      {
        xPercent: 0,
        ease: 'linear',
      },
      {
        xPercent: -105,
        ease: 'linear',
        repeat: -1, // Setting repeat to -1 for infinite repetition
        duration: 5, // Setting duration of animation to 8 seconds
      }
    );
    gsap.fromTo(
      '.scroll-text',
      {
        xPercent: 0,
        ease: 'linear',
      },
      {
        xPercent: -100,
        ease: 'linear',
        repeat: -1, // Setting repeat to -1 for infinite repetition
        duration: 4, // Setting duration of animation to 8 seconds
      }
    );
  }
  animate() {
    let tl = gsap.timeline();
    let photos = gsap.utils.toArray('.photo');
    gsap.set('.photo:not(:first-child)', { y: '100%' });
    tl.to('.background', {
      '--path': '17%',
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
  //sliding technoligy section
  slids() {
    let sections = gsap.utils.toArray('.slid');

    gsap.to(sections, {
      xPercent: -80 * (sections.length - 1),
      yPercent: 0,
      ease: 'power2',
      scrollTrigger: {
        trigger: '.slid-container',
        pin: '.slid',
        scrub: true,
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

  //writing a function to open a mail
  openMail() {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${this.Myemail}`,
      '_blank'
    );
  }
}
