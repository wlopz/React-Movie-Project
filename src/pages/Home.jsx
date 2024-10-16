import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import Lottie from 'lottie-react';
import movieAnimation from '../assets/movie_stuff.json';
import { gsap } from 'gsap';

const Home = () => {
  const navigate = useNavigate();
  const lottieRef = useRef(null); // Ref for the Lottie animation
  const lottieWrapperRef = useRef(null); // Ref for the Lottie container
  const searchBarRef = useRef(null); // Ref for the SearchBar container
  const [searchSubmitted, setSearchSubmitted] = useState(false); // State to track search

  useEffect(() => {
    const lottieInstance = lottieRef.current;

    // Slide in animation for the Lottie container using GSAP
    gsap.fromTo(
      lottieWrapperRef.current, // Target the Lottie wrapper using ref
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Slide in animation for the SearchBar using GSAP
    gsap.fromTo(
      searchBarRef.current, // Target the SearchBar wrapper using ref
      { y: '-100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Start looping the Lottie animation when the component loads
    if (lottieInstance) {
      const totalFrames = 95;

      // GSAP to loop forward and backward between frames
      const tween = gsap.to(lottieInstance, {
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        onUpdate: () => {
          const progress = tween.progress();
          const currentFrame = 90 + (totalFrames - 9) * progress;
          lottieInstance.goToAndStop(currentFrame, true);
        },
      });

      return () => {
        tween.kill(); // Kill the tween when the component unmounts
      };
    }
  }, []);

  // Handle search submit (enter key or click)
  const handleSearch = (query) => {
    if (query) {
      setSearchSubmitted(true); // Trigger the search submission state
      const lottieInstance = lottieRef.current;

      // First reverse the Lottie animation frames
      if (lottieInstance) {
        gsap.to(lottieInstance, {
          duration: 1, // Reverse the frames over 1 second
          onUpdate: () => {
            const progress = 1 - gsap.getProperty(lottieInstance, 'progress'); // Reverse progress
            const currentFrame = 95 - (95 - 90) * progress; // Reverse the frames
            lottieInstance.goToAndStop(currentFrame, true);
          },
          onComplete: () => {
            // After reversing frames, slide down the Lottie container
            gsap.to(lottieWrapperRef.current, {
              y: '100%', // Slide down
              opacity: 0,
              duration: 1,
              ease: 'power2.in',
              onComplete: () => {
                // Once both animations are done, navigate
                navigate(`/search?q=${query}`);
              },
            });
          },
        });
      }

      // Slide the SearchBar back up after the search is submitted
      gsap.to(searchBarRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.in',
      });
    }
  };

  return (
    <>
      {/* Add a ref to the SearchBar wrapper */}
      <div ref={searchBarRef}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Add a ref to the Lottie animation wrapper */}
      <div className="home__img-wrapper" ref={lottieWrapperRef}>
        <Lottie
          lottieRef={lottieRef} // Attach the Lottie instance ref
          className="home__img"
          animationData={movieAnimation}
          autoplay={true}
          loop={false} // Disable automatic looping (handled manually with GSAP)
        />
      </div>
    </>
  );
};

export default Home;
