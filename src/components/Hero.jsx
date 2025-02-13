import React from 'react'
import {ButtonPrimary} from './ButtonPrimary'
import { ButtonOutline } from './ButtonOutline'

const Hero = () => {
  return (
    <section
    className='pt-36 6lg:pt-46 mb-10 lg:mb-20'
    id='home'
    >
      <div className="container lg:grid lg:grid-cols-2 items-center lg:gap-10 ">
        <div className='reveal-up'>
          <div className="flex items-center gap-3 h-9 rounded-lg">
            <figure className="img-box w-9">
              <img src="/images/avatar-1.jpg" alt="avatar" height={40} width={40} 
              className='img-cover'
              />
            </figure>

            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400 ">
                <span className="absolute w-2 h-2 inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <h2 
          className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10"
          >
            Building Scalable Modern Websites for the Future
          </h2>

          <div className="flex items-center gap-3">
            <ButtonPrimary 
              label = 'Download CV'
              icon = 'download'
            />

            <ButtonOutline
              href={'#about'}
              label = 'Scroll Down'
              icon = 'arrow_downward'
            />
          </div>
        </div>

        <div className="hidden lg:block reveal-up">
          <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-purple-400 via-25% via-purple-400/40 to-65% rounded-[60px] overflow-hidden">
            <img 
            src="/images/hero-banner.png" 
            alt="hero banner" 
            width={656}
            height={800}
            className="w-full" />
          </figure>
        </div>

      

      </div>

    </section>
  )
}

export default Hero