import React, { useState, useEffect } from 'react'

const Hero = () => {
  // State to track which elements are visible
  const [visibleMobileLines, setVisibleMobileLines] = useState(0);
  const [visibleDesktopLines, setVisibleDesktopLines] = useState(0);
  const [visibleParagraphChars, setVisibleParagraphChars] = useState(0);
  const [startParagraphAnimation, setStartParagraphAnimation] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  // Split the mobile text into separate lines to match desktop animation style
  const mobileLine1 = "Axiom";
  const mobileLine2 = "A Fundamental, Unproven Truth";
  const mobileLine3 = "Accepted as Logical System";
  
  const paragraphText = "Something we take as true without the need for proof. These foundational truths act as the starting points in logical reasoning and mathematical systems.";
  
  useEffect(() => {
    // Animate the mobile h1 lines appearing one by one
    const mobileTimer = setInterval(() => {
      setVisibleMobileLines(prev => {
        const nextValue = Math.min(prev + 1, 3);
        // If mobile animation is complete, trigger paragraph animation
        if (nextValue === 3) {
          setStartParagraphAnimation(true);
        }
        return nextValue;
      });
    }, 800);
    
    // Animate the desktop h1 lines appearing
    const desktopTimer = setInterval(() => {
      setVisibleDesktopLines(prev => {
        const nextValue = Math.min(prev + 1, 3);
        // If desktop animation is complete, trigger paragraph animation
        if (nextValue === 3) {
          setStartParagraphAnimation(true);
        }
        return nextValue;
      });
    }, 800);
    
    // Cleanup timers
    return () => {
      clearInterval(mobileTimer);
      clearInterval(desktopTimer);
    };
  }, []);
  
  // Only start paragraph animation after h1 is complete
  useEffect(() => {
    if (!startParagraphAnimation) return;
    
    // Add a small delay before starting paragraph animation
    const startDelay = setTimeout(() => {
      const paragraphTimer = setInterval(() => {
        setVisibleParagraphChars(prev => {
          if (prev >= paragraphText.length) {
            clearInterval(paragraphTimer);
            // When paragraph animation completes, start video fade-in
            setTimeout(() => {
              setShowVideo(true);
            }, 400);
            return prev;
          }
          return prev + 1; // Slow down to just 1 character at a time
        });
      }, 50); // Slow down to 50ms per character
      
      return () => clearInterval(paragraphTimer);
    }, 800); // Longer delay before starting paragraph animation
    
    return () => clearTimeout(startDelay);
  }, [startParagraphAnimation]);
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Empty div to create space at the top */}
      <div className="w-full h-48 md:h-64"></div>
      
      {/* Content Container with everything properly spaced */}
      <div className="flex flex-col items-center justify-center w-full px-10 sm:px-8 md:px-12 gap-y-10">
        {/* For mobile: matching the desktop line-by-line animation */}
        <div className="block md:hidden text-center flex flex-col gap-1">
          <h1 className={`text-2xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent transition-opacity duration-1000 ${visibleMobileLines >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            {mobileLine1}
          </h1>
          <h1 className={`text-2xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent transition-opacity duration-1000 ${visibleMobileLines >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            {mobileLine2}
          </h1>
          <h1 className={`text-2xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent transition-opacity duration-1000 ${visibleMobileLines >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            {mobileLine3}
          </h1>
        </div>
        
        {/* Only visible on md screens and up, with lines appearing one by one */}
        <div className="hidden md:flex flex-col gap-2 lg:gap-3 text-center">
          <h1 className={`text-5xl lg:text-6xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent transition-opacity duration-1000 ${visibleDesktopLines >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            Axiom
          </h1>
          <h1 className={`text-5xl lg:text-6xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent transition-opacity duration-1000 ${visibleDesktopLines >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            A Fundamental, Unproven Truth
          </h1>
          <h1 className={`text-5xl lg:text-6xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent transition-opacity duration-1000 ${visibleDesktopLines >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            Accepted as Logical System
          </h1>
        </div>

        {/* Paragraph text animation - same for both mobile and desktop */}
        <p className="text-sm md:text-base lg:text-lg text-neutral-500 max-w-2xl leading-relaxed text-center">
          {paragraphText.substring(0, visibleParagraphChars)}
          <span className="opacity-0">{paragraphText.substring(visibleParagraphChars)}</span>
        </p>
        
        {/* Video container placed below the paragraph with fade-in animation */}
        <div className={`w-full max-w-4xl mt-8 mb-16 px-8 sm:px-6 md:px-8 transition-all duration-2000 ease-in-out transform ${showVideo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="border border-neutral-200/25 rounded-lg overflow-hidden p-6">
            <video 
              className="w-full h-auto rounded-lg shadow-lg" 
              autoPlay 
              loop 
              muted 
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
            >
              <source src="/video-3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero