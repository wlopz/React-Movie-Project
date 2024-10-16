import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import Lottie from 'lottie-react';
import movieAnimation from '../assets/movie_stuff.json';
import { gsap } from 'gsap';

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation after search is submitted
  const lottieRef = useRef(null); // Ref for the Lottie animation instance
  const lottieWrapperRef = useRef(null); // Ref for the Lottie container (wrapper)
  const searchBarRef = useRef(null); // Ref for the SearchBar container
  const [searchSubmitted, setSearchSubmitted] = useState(false); // State to track if a search has been submitted

  // useEffect hook to handle animations when the component loads
  useEffect(() => {
    const lottieInstance = lottieRef.current; // Get the Lottie animation instance
    // console.log('Lottie instance loaded:', lottieInstance);

    // GSAP animation to slide in the Lottie container from the bottom
    gsap.fromTo(
      lottieWrapperRef.current, // Reference the Lottie container (wrapper)
      { y: '100%', opacity: 0 }, // Initial state (offscreen, invisible)
      { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' } // Final state (onscreen, visible)
    );
    // console.log('Lottie container animation started');

    // GSAP animation to slide in the SearchBar from the top
    gsap.fromTo(
      searchBarRef.current, // Reference the SearchBar container
      { y: '-100%', opacity: 0 }, // Initial state (offscreen, invisible)
      { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' } // Final state (onscreen, visible)
    );
    // console.log('SearchBar animation started');

    // Start looping the Lottie animation between frames when the component loads
    if (lottieInstance) {
      const totalFrames = 95; // Define the total number of frames to loop
      // console.log('Starting Lottie animation loop between frames 90 and 95');

      // GSAP animation to loop between specific frames (90-95) in a forward and backward motion
      const tween = gsap.to(lottieInstance, {
        duration: 3, // Duration for one complete cycle (forward and backward)
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse animation on each cycle
        ease: 'none', // No easing, linear motion
        onUpdate: () => {
          const progress = tween.progress(); // Get the progress of the tween (0 to 1)
          const currentFrame = 90 + (totalFrames - 9) * progress; // Calculate the current frame
          lottieInstance.goToAndStop(currentFrame, true); // Manually control Lottie to display the specific frame
          // console.log('Lottie animation frame:', currentFrame); // Log the current frame being played
        },
      });

      return () => {
        tween.kill(); // Clean up the GSAP tween when the component unmounts
        // console.log('Lottie animation tween killed on unmount');
      };
    }
  }, []);

  // Function to handle when the user submits a search
  const handleSearch = (query) => {
    if (query) {
      // console.log('Search submitted with query:', query);
      setSearchSubmitted(true); // Set the searchSubmitted state to true to indicate a search was made
      const lottieInstance = lottieRef.current; // Get the Lottie animation instance
      // console.log('Lottie instance during search:', lottieInstance);

      // Reverse the Lottie animation frames when search is submitted
      if (lottieInstance) {
        gsap.to(lottieInstance, {
          duration: 1, // Reverse the frames over 1 second
          onUpdate: () => {
            const progress = 1 - gsap.getProperty(lottieInstance, 'progress'); // Reverse the progress
            const currentFrame = 95 - (95 - 90) * progress; // Calculate the reversed frame
            lottieInstance.goToAndStop(currentFrame, true); // Display the reversed frame
            // console.log('Reversed Lottie frame:', currentFrame); // Log the current frame during reversal
          },
          onComplete: () => {
            // After reversing the frames, slide down the Lottie container
            gsap.to(lottieWrapperRef.current, {
              y: '100%', // Move the Lottie container down (offscreen)
              opacity: 0, // Fade out the Lottie container
              duration: 1, // Duration for sliding down
              ease: 'power2.in', // Easing effect for smooth animation
              onComplete: () => {
                // Once the animation completes, navigate to the search results page
                // console.log('Navigating to search results page with query:', query);
                navigate(`/search?q=${query}`);
              },
            });
          },
        });
      }

      // Slide up the SearchBar after the search is submitted
      gsap.to(searchBarRef.current, {
        y: '-100%', // Move the SearchBar up (offscreen)
        opacity: 0, // Fade out the SearchBar
        duration: 1, // Duration for sliding up
        ease: 'power2.in', // Easing effect for smooth animation
      });
      // console.log('SearchBar slide-up animation triggered');
    }
  };

  return (
    <>
      {/* Render the SearchBar and attach the ref for animations */}
      <div ref={searchBarRef}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Render the Lottie animation and attach the ref for control and animations */}
      <div className="home__img-wrapper" ref={lottieWrapperRef}>
        <Lottie
          lottieRef={lottieRef} // Attach the Lottie instance ref
          className="home__img" // Class for styling
          animationData={movieAnimation} // Lottie animation data (JSON file)
          autoplay={true} // Automatically play the animation
          loop={false} // Disable default looping (handled manually with GSAP)
        />
      </div>
    </>
  );
};

export default Home;