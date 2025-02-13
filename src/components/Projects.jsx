import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    imgSrc: '/images/project-1.jpg',
    title: 'Full stack music app',
    tags: ['API', 'MVC', 'Development'],
    projectLink: 'https://musify-5al0.onrender.com/'
  },
  {
    imgSrc: '/images/project-2.jpg',
    title: 'Free stock photo app',
    tags: ['API', 'SPA'],
    projectLink: 'https://pixstock-official.vercel.app/'
  },
  {
    imgSrc: '/images/project-3.jpg',
    title: 'Recipe app',
    tags: ['Development', 'API'],
    projectLink: ''
  },
  {
    imgSrc: '/images/project-4.jpg',
    title: 'Real state website',
    tags: ['Web-design', 'Development'],
    projectLink: 'https://github.com/codewithsadee-org/wealthome'
  },
  {
    imgSrc: '/images/project-5.jpg',
    title: 'eCommerce website',
    tags: ['eCommerce', 'Development'],
    projectLink: 'https://github.com/codewithsadee/anon-ecommerce-website'
  },
  {
    imgSrc: '/images/project-6.jpg',
    title: 'vCard Personal portfolio',
    tags: ['Web-design', 'Development'],
    projectLink: 'https://github.com/codewithsadee/vcard-personal-portfolio'
  },
  // Add more projects if needed...
];

const Work = () => {
  // Number of rows to display (each "load" adds 2 rows)
  const [visibleRows, setVisibleRows] = useState(2);
  // Number of projects per row (we set a default; this may be updated on mount/resize)
  const [projectsPerRow, setProjectsPerRow] = useState(3);
  // The projects to display (based on visibleRows * projectsPerRow)
  const [visibleProjects, setVisibleProjects] = useState([]);

  // Function to update the number of projects per row based on window width.
  const updateProjectsPerRow = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      let cols = 3; // default for large screens
      if (width < 640) {
        cols = 1;
      } else if (width < 1024) {
        cols = 2;
      }
      setProjectsPerRow(cols);
    }
  };

  // Run on mount and add a resize listener
  useEffect(() => {
    updateProjectsPerRow();
    window.addEventListener('resize', updateProjectsPerRow);
    return () => window.removeEventListener('resize', updateProjectsPerRow);
  }, []);

  // Whenever visibleRows or projectsPerRow changes, update the visible projects.
  useEffect(() => {
    const count = visibleRows * projectsPerRow;
    setVisibleProjects(projects.slice(0, count));
  }, [visibleRows, projectsPerRow]);

  // Handler to load two more rows
  const handleViewMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  return (
    <section id="work" className="section">
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">My portfolio highlights</h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] reveal-up">
          {visibleProjects.map(({ imgSrc, title, tags, projectLink }, index) => (
            <ProjectCard 
              key={index}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              projectLink={projectLink}
            />
          ))}
        </div>

        {/* Only show the "View More" button if there are more projects to display */}
        {visibleProjects.length < projects.length && (
          <div className='flex items-center justify-center'>
            <div className="mt-8 text-center">
              <button onClick={handleViewMore} className="btn">
                View More
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
