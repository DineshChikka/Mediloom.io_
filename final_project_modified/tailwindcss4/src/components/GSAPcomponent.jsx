// GSAPcomponent.jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const GSAPcomponent = () => {
  const RESPONSIVE_WIDTH = 1024;

  useGSAP(() => {
    // Reveal-up animation
    gsap.to(".reveal-up", {
        opacity: 0,
        y: "100%",
    })

gsap.to("#dashboard", {
   boxShadow: "0px 15px 25px -5px #7e22ceaa",
   duration: 0.3,
   scrollTrigger: {
       trigger: "#hero-section",
       start: "60% 60%",
       end: "80% 80%",
       //markers: true
   }
})

gsap.to("#dashboard", {
   scale: 1,
   translateY: 0,
   // translateY: "0%",
   rotateX: "0deg",
   scrollTrigger: {
       trigger: "#hero-section",
       start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
       end: "bottom bottom",
       scrub: 1,
      // markers: true,
   }
})


const sections = gsap.utils.toArray("section")
sections.forEach((sec) => {
const revealUptimeline = gsap.timeline({paused: true, 
                                       scrollTrigger: {
                                                       trigger: sec,
                                                       start: "10% 80%", // top of trigger hits the top of viewport
                                                       end: "20% 90%",
                                                       // markers: true,
                                                       //scrub: 1
                                                   }})

revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
   opacity: 1,
   duration: 0.8,
   y: "0%",
   stagger: 0.2,
})
})
  }, []); // Only run once

  return null; // No UI needed, this is just for animations
};

export default GSAPcomponent;
