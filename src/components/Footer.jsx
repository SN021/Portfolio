import React from 'react'
import { ButtonPrimary } from './ButtonPrimary';

const sitemap = [
  {
    label: 'Home',
    href: '#home'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Work',
    href: '#work'
  },
  {
    label: 'Reviews',
    href: '#reviews'
  },
  {
    label: 'Contact me',
    href: '#contact'
  }
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://www.github.com/codewithsadee-org'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/codewithsadee'
  },
  {
    label: 'Twitter X',
    href: 'https://x.com/codewithsadee_'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/codewithsadee'
  },
  {
    label: 'CodePen',
    href: 'https://codepen.io/codewithsadee'
  }
];


const Footer = () => {
  return (
    <section className="section bg-zinc-800">
      <div className="container ">
        <div className="lg:grid lg:grid-cols-2 reveal-up ">
          <div className="">
            <h2 className="headline-1 mb-8 lg:max-w-[15ch]">
              Let&apos;s work together today!
            </h2>

            {/* <ButtonPrimary 
              href={'mailto:'+import.meta.env.VITE_PUBLIC_PERSONAL_EMAIL}
              label={'Start Project'}
              icon={'chevron_right'}
              classes={'mb-10 flex items-center gap-2'}
            /> */}
          </div>
        

          <div className="grid grid-cols-2 gap-4 lg:pl-20">
            <div className="mb-10">
              <p className='mb-2'>SiteMap</p>
              <ul>
                {sitemap.map(({label, href}, index) => (
                  <li 
                    key={index}
                    className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                  >
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <p className='mb-2'>Socials</p>
              <ul>
                {socials.map(({label, href}, index) => (
                  <li 
                    key={index}
                    className=""
                  >
                    <a href={href} target='_blank' className='block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200'>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-10 mb-8">
          <a 
            href=""
            className=''
          >
            <img 
              src="/images/logo.svg"
              width={40}
              height={40} 
              alt="logo"
              className='' 
            />
          </a>
          <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} <span className='text-zinc-200'>Sanduni Navodya</span>
            </p>
        </div>
      </div>
    </section>
  )
}

export default Footer