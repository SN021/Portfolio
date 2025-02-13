import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ navOpen }) => {
  const lastActiveLink = useRef();
  const activeBox = useRef();

  // Initialize the active box position based on the currently active link
  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px';
      activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px';
      activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px';
      activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px';
    }
  };

  // Set up the initial active box position and update on window resize
  useEffect(() => {
    initActiveBox();
    window.addEventListener('resize', initActiveBox);
    return () => window.removeEventListener('resize', initActiveBox);
  }, []);

  // Update the active nav link as the user scrolls
  useEffect(() => {
    // Get all nav link elements
    const navLinks = document.querySelectorAll('.nav-link');
    // Create an array of section elements based on the nav links’ href attribute
    const sections = Array.from(navLinks).map(link => {
      const sectionId = link.getAttribute('href').replace('#', '');
      return document.getElementById(sectionId);
    });

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      let activeIndex = 0;

      // Loop through the sections to find which section is in view.
      sections.forEach((section, index) => {
        if (section) {
          // You can adjust the threshold here. In this example, we trigger the active state
          // when the scroll position is greater than section.top minus a third of its height.
          if (scrollPosition >= section.offsetTop - section.offsetHeight / 3) {
            activeIndex = index;
          }
        }
      });

      // Update nav links and activeBox if we found a matching section
      if (navLinks[activeIndex]) {
        // Remove the active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add the active class to the currently active nav link
        navLinks[activeIndex].classList.add('active');
        // Update the active box to match the active link
        activeBox.current.style.top = navLinks[activeIndex].offsetTop + 'px';
        activeBox.current.style.left = navLinks[activeIndex].offsetLeft + 'px';
        activeBox.current.style.width = navLinks[activeIndex].offsetWidth + 'px';
        activeBox.current.style.height = navLinks[activeIndex].offsetHeight + 'px';
        // Update lastActiveLink reference
        lastActiveLink.current = navLinks[activeIndex];
      }
    };

    // Attach the scroll listener
    window.addEventListener('scroll', handleScroll);
    // Call once on mount in case the page is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // (Optional) Still allow clicking to update the active link
  const activeCurrentLink = (event) => {
    lastActiveLink.current?.classList.remove('active');
    event.target.classList.add('active');
    lastActiveLink.current = event.target;

    activeBox.current.style.top = event.target.offsetTop + 'px';
    activeBox.current.style.left = event.target.offsetLeft + 'px';
    activeBox.current.style.width = event.target.offsetWidth + 'px';
    activeBox.current.style.height = event.target.offsetHeight + 'px';
  };

  const navItems = [
    {
      label: 'Home',
      link: '#home',
      className: 'nav-link active',
      ref: lastActiveLink
    },
    {
      label: 'About',
      link: '#about',
      className: 'nav-link'
    },
    {
      label: 'Skills',
      link: '#skills',
      className: 'nav-link'
    },
    {
      label: 'Projects',
      link: '#work',
      className: 'nav-link'
    },
    {
      label: 'Contact',
      link: '#contact',
      className: 'nav-link md:hidden'
    }
  ];

  return (
    <nav className={`navbar ${navOpen ? 'active' : ''}`}>
      {navItems.map(({ label, link, className, ref }, key) => (
        <a
          href={link}
          key={key}
          ref={ref}
          className={className}
          onClick={activeCurrentLink}
        >
          {label}
        </a>
      ))}

      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
