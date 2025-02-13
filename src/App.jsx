import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import SkillSection from './components/SkillSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ReactLenis from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import AnimatedBackground from './components/BackgroundAnimation'



gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 




function App() {

  useGSAP(()=>{
    const elements = gsap.utils.toArray('.reveal-up');

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-200 bottom',
          end: 'bottom 80%',
          scrub: true,

        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })
    });
  })

  return (
    <ReactLenis root>
    
      <Header />

      <AnimatedBackground />
      <main>
        <Hero />
        <About />
        <SkillSection />
        <Projects />
        <Contact />
      </main>

      <Footer/>


    
    </ReactLenis>
  )
}

export default App
