import React from 'react'
import Skills from './Skills'

const SkillSection = () => {
  return (
    <section className='section' id='skills'>
        <div className="container">
          <div className="reveal-up">
            <div className='flex flex-col flex-wrap items-center justify-center'>
              <h2 className='headline-2 text-center'>
                Essential Tools I use
              </h2>

              <p className="text-zinc-400 mt-3  max-w-[50ch] text-center">
                Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
              </p>
            </div>
            <div className="">
              <Skills />
            </div>
          </div>
        </div>
    </section>
  )
}

export default SkillSection