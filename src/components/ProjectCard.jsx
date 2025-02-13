import React from 'react'

// node modules
import PropTypes from 'prop-types'

const ProjectCard = ({
    imgSrc,
    title,
    tags,
    projectLink,
    classes
}) => {
  return (
    <div  className={`${classes } relative rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 duration-300 ring-1 ring-inset ring-zinc-50/5 transition-colors p-10`}>
        <figure className='img-box aspect-sqaure rounded-lg mb-4'>
            <img 
            src={imgSrc} 
            alt={title}
            loading='lazy'
            className='img-cover'           
            />
        </figure>

        <div className="flex items-center justify-between gap-4">
            <div className="">
                <h3 className="title-1 mb-3">
                    {title}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                    {tags.map((label, key)=> (
                        <span
                            key={key}
                            className='h-8 text-sm text-zinc-400 bg-zinc-50/5 grid items-center rounded-lg px-3'
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-11 h-11 rounded-lg grid place-items-center bg-purple-400 text-zinc-950 shrink-0">
                <span 
                className="material-symbols-rounded"
                aria-hidden='true'
                >
                    arrow_outward
                </span>
            </div>
        </div>
        <a 
            href={projectLink}
            target='_blank'
            className="absolute inset-0">
            </a>
    </div>
  )
}

ProjectCard.propTypes = {
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    projectLink: PropTypes.string,
    classes: PropTypes.string
}

export default ProjectCard