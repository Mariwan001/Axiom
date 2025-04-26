import image1 from '@/public/images/image-card/blue-card.webp'
import image2 from '@/public/images/image-card/red-card.webp'
import image3 from '@/public/images/image-card/second-card-num.webp'
import image4 from '@/public/images/image-card/second-card-unnum.webp'
import image5 from '@/public/images/image-card/third-card-unchart.webp'
import image6 from '@/public/images/image-card/third-card-withchart.webp'
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

function Index() {
  const card1DefaultTextRef = useRef<HTMLSpanElement>(null);
  const card1HoverTextRef = useRef<HTMLSpanElement>(null);
  const card2DefaultTextRef = useRef<HTMLSpanElement>(null);
  const card2HoverTextRef = useRef<HTMLSpanElement>(null);
  const card3DefaultTextRef = useRef<HTMLSpanElement>(null);
  const card3HoverTextRef = useRef<HTMLSpanElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Animation lock flags to prevent glitches
  const isAnimating = useRef({
    card1: false,
    card2: false,
    card3: false
  });

  useEffect(() => {
    // Import GSAP dynamically
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        // Try to import ScrollTrigger for more advanced animations
        let ScrollTrigger;
        try {
          const scrollTriggerModule = await import('gsap/ScrollTrigger');
          ScrollTrigger = scrollTriggerModule.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);
        } catch (err) {
          console.log("ScrollTrigger not available");
        }

        // Removed SplitText import that was causing errors

        // Setup initial states for all cards
        const initializeCards = () => {
          const cards = [
            { default: card1DefaultTextRef.current, hover: card1HoverTextRef.current },
            { default: card2DefaultTextRef.current, hover: card2HoverTextRef.current },
            { default: card3DefaultTextRef.current, hover: card3HoverTextRef.current }
          ];
          
          cards.forEach(({ default: defaultText, hover: hoverText }) => {
            if (defaultText && hoverText) {
              // Set initial states
              gsap.set(defaultText, { opacity: 1, y: 0 });
              gsap.set(hoverText, { opacity: 0, y: 20 });
            }
          });
          
          // Initialize entry animation states - set cards to be invisible initially
          const cardElements = [
            card1Ref.current,
            card2Ref.current,
            card3Ref.current
          ];
          
          // For each card, set initial state with transforms
          cardElements.forEach((card) => {
            if (card) {
              // Set initial state for advanced appearing animation
              gsap.set(card, { 
                opacity: 0,
                y: 80,
                scale: 0.92,
                rotationX: 10,
                transformOrigin: "center bottom"
              });
              
              // Also set initial state for card contents
              const cardText = card.querySelector('.card-text-content');
              const cardImage = card.querySelector('.card-image-container');
              
              if (cardText) {
                gsap.set(cardText, { opacity: 0, y: 30 });
              }
              
              if (cardImage) {
                gsap.set(cardImage, { opacity: 0, y: 40, scale: 0.95 });
              }
            }
          });
        };
        
        initializeCards();
        
        // Create advanced appearance animation sequence for cards
        const animateCardsIn = () => {
          const cardElements = [
            card1Ref.current,
            card2Ref.current,
            card3Ref.current
          ];
          
          // Create master timeline for coordinated animations
          const masterTl = gsap.timeline({
            defaults: {
              ease: "power3.out"
            }
          });
          
          // Animate each card with coordinated sub-animations
          cardElements.forEach((card, index) => {
            if (!card) return;
            
            // Find card contents
            const cardText = card.querySelector('.card-text-content');
            const cardImage = card.querySelector('.card-image-container');
            const cardBorder = card.querySelector('.card-border');
            
            // Create a timeline for this specific card
            const cardTl = gsap.timeline({
              defaults: { ease: "power2.out" }
            });
            
            // First animate the card container with a soft ease
            cardTl.to(card, {
              duration: 1.2,
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              ease: "elastic.out(0.6, 0.5)"
            }, 0);
            
            // Then animate the border if it exists (with a glow effect)
            if (cardBorder) {
              cardTl.fromTo(cardBorder, 
                { opacity: 0, scale: 1.05 },
                { 
                  duration: 0.8, 
                  opacity: 1, 
                  scale: 1,
                  ease: "power2.out" 
                }, 
                0.2
              );
            }
            
            // Then animate the text with a slight delay
            if (cardText) {
              cardTl.to(cardText, {
                duration: 0.7,
                opacity: 1,
                y: 0,
                ease: "back.out(1.4)",
                stagger: 0.1
              }, 0.3);
            }
            
            // Finally animate the image
            if (cardImage) {
              cardTl.to(cardImage, {
                duration: 0.9,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "back.out(1.2)"
              }, 0.4);
            }
            
            // Add the card's timeline to the master timeline with stagger
            masterTl.add(cardTl, index * 0.4); // Staggered timing between cards
          });
          
          return masterTl;
        };
        
        // Initialize scroll-based or viewport-based animation trigger
        if (ScrollTrigger && sectionRef.current) {
          // Create a more sophisticated scroll trigger
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom-=10%",
            end: "bottom bottom",
            toggleActions: "play none none none",
            onEnter: () => {
              const tl = animateCardsIn();
              // Add subtle background effect on section entry
              if (sectionRef.current) {
                gsap.fromTo(sectionRef.current, 
                  { backgroundColor: "rgba(0,0,0,0)" },
                  { 
                    backgroundColor: "rgba(0,0,0,0)",
                    duration: 1.5,
                    ease: "power2.inOut",
                    clearProps: "backgroundColor"
                  }
                );
              }
            },
            once: true
          });
        } else {
          // Fallback to delayed animation on component mount
          setTimeout(() => {
            animateCardsIn();
          }, 400);
        }
        
        // Card 1 hover animations with enhanced smoothness
        const setupCard1Animations = () => {
          const card = card1Ref.current;
          const defaultText = card1DefaultTextRef.current;
          const hoverText = card1HoverTextRef.current;
          
          if (!card || !defaultText || !hoverText) return;
          
          // Enhanced enter animation
          const enterAnimation = () => {
            if (isAnimating.current.card1) return;
            isAnimating.current.card1 = true;
            
            gsap.killTweensOf([defaultText, hoverText]);
            
            // Smoother text transition
            gsap.to(defaultText, { 
              y: -20, 
              opacity: 0, 
              duration: 0.4, 
              ease: 'power3.out' 
            });
            gsap.to(hoverText, { 
              y: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power3.out', 
              delay: 0.1,
              onComplete: () => {
                isAnimating.current.card1 = false;
              }
            });
            
            // Add subtle card tilt effect
            gsap.to(card, {
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              duration: 0.4,
              ease: "power2.out"
            });
          };
          
          // Enhanced leave animation
          const leaveAnimation = () => {
            if (isAnimating.current.card1) return;
            isAnimating.current.card1 = true;
            
            gsap.killTweensOf([defaultText, hoverText]);
            
            // Smoother text transition
            gsap.to(hoverText, { 
              y: 20, 
              opacity: 0, 
              duration: 0.4, 
              ease: 'power3.out' 
            });
            gsap.to(defaultText, { 
              y: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power3.out', 
              delay: 0.1,
              onComplete: () => {
                isAnimating.current.card1 = false;
              }
            });
            
            // Reset card tilt
            gsap.to(card, {
              scale: 1,
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.5,
              ease: "power2.out"
            });
          };
          
          card.addEventListener('mouseenter', enterAnimation);
          card.addEventListener('mouseleave', leaveAnimation);
          card.addEventListener('touchstart', enterAnimation);
          card.addEventListener('touchend', leaveAnimation);
          
          return () => {
            card.removeEventListener('mouseenter', enterAnimation);
            card.removeEventListener('mouseleave', leaveAnimation);
            card.removeEventListener('touchstart', enterAnimation);
            card.removeEventListener('touchend', leaveAnimation);
          };
        };

        // Card 2 animations
        const setupCard2Animations = () => {
          const card = card2Ref.current;
          const defaultText = card2DefaultTextRef.current;
          const hoverText = card2HoverTextRef.current;
          
          if (!card || !defaultText || !hoverText) return;
          
          // Enhanced enter animation
          const enterAnimation = () => {
            if (isAnimating.current.card2) return;
            isAnimating.current.card2 = true;
            
            gsap.killTweensOf([defaultText, hoverText]);
            
            gsap.to(defaultText, { 
              y: -20, 
              opacity: 0, 
              duration: 0.4, 
              ease: 'power3.out' 
            });
            gsap.to(hoverText, { 
              y: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power3.out', 
              delay: 0.1,
              onComplete: () => {
                isAnimating.current.card2 = false;
              }
            });
            
            // Add subtle card tilt effect
            gsap.to(card, {
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              duration: 0.4,
              ease: "power2.out"
            });
          };
          
          // Enhanced leave animation
          const leaveAnimation = () => {
            if (isAnimating.current.card2) return;
            isAnimating.current.card2 = true;
            
            gsap.killTweensOf([defaultText, hoverText]);
            
            gsap.to(hoverText, { 
              y: 20, 
              opacity: 0, 
              duration: 0.4, 
              ease: 'power3.out' 
            });
            gsap.to(defaultText, { 
              y: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power3.out', 
              delay: 0.1,
              onComplete: () => {
                isAnimating.current.card2 = false;
              }
            });
            
            // Reset card tilt
            gsap.to(card, {
              scale: 1,
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.5,
              ease: "power2.out"
            });
          };
          
          card.addEventListener('mouseenter', enterAnimation);
          card.addEventListener('mouseleave', leaveAnimation);
          card.addEventListener('touchstart', enterAnimation);
          card.addEventListener('touchend', leaveAnimation);
          
          return () => {
            card.removeEventListener('mouseenter', enterAnimation);
            card.removeEventListener('mouseleave', leaveAnimation);
            card.removeEventListener('touchstart', enterAnimation);
            card.removeEventListener('touchend', leaveAnimation);
          };
        };

        // Card 3 animations
        const setupCard3Animations = () => {
          const card = card3Ref.current;
          const defaultText = card3DefaultTextRef.current;
          const hoverText = card3HoverTextRef.current;
          
          if (!card || !defaultText || !hoverText) return;
          
          // Enhanced enter animation
          const enterAnimation = () => {
            if (isAnimating.current.card3) return;
            isAnimating.current.card3 = true;
            
            gsap.killTweensOf([defaultText, hoverText]);
            
            gsap.to(defaultText, { 
              y: -20, 
              opacity: 0, 
              duration: 0.4, 
              ease: 'power3.out' 
            });
            gsap.to(hoverText, { 
              y: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power3.out', 
              delay: 0.1,
              onComplete: () => {
                isAnimating.current.card3 = false;
              }
            });
            
            // Add subtle card tilt effect
            gsap.to(card, {
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              duration: 0.4,
              ease: "power2.out"
            });
          };
          
          // Enhanced leave animation
          const leaveAnimation = () => {
            if (isAnimating.current.card3) return;
            isAnimating.current.card3 = true;
            
            gsap.killTweensOf([defaultText, hoverText]);
            
            gsap.to(hoverText, { 
              y: 20, 
              opacity: 0, 
              duration: 0.4, 
              ease: 'power3.out' 
            });
            gsap.to(defaultText, { 
              y: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power3.out', 
              delay: 0.1,
              onComplete: () => {
                isAnimating.current.card3 = false;
              }
            });
            
            // Reset card tilt
            gsap.to(card, {
              scale: 1,
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.5,
              ease: "power2.out"
            });
          };
          
          card.addEventListener('mouseenter', enterAnimation);
          card.addEventListener('mouseleave', leaveAnimation);
          card.addEventListener('touchstart', enterAnimation);
          card.addEventListener('touchend', leaveAnimation);
          
          return () => {
            card.removeEventListener('mouseenter', enterAnimation);
            card.removeEventListener('mouseleave', leaveAnimation);
            card.removeEventListener('touchstart', enterAnimation);
            card.removeEventListener('touchend', leaveAnimation);
          };
        };

        const cleanup1 = setupCard1Animations();
        const cleanup2 = setupCard2Animations();
        const cleanup3 = setupCard3Animations();
        
        return () => {
          cleanup1 && cleanup1();
          cleanup2 && cleanup2();
          cleanup3 && cleanup3();
        };
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };

    loadGSAP();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <section ref={sectionRef} className='mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-6 md:px-8 max-w-6xl'>
        <div 
          ref={card1Ref} 
          className="group bg-gradient-to-t from-[#242424] to-[#020202] hover:from-[#182135] hover:to-[#080808] relative before:absolute before:inset-0 before:opacity-5 rounded-xl sm:rounded-2xl border transform transition-all duration-500 ease-out will-change-transform scale-75 sm:scale-100"
        >
          <span className="card-border absolute inset-0 rounded-xl sm:rounded-2xl border border-slate-700 opacity-0"></span>
          <div className='relative'>
            <div className='px-3 sm:px-6 md:px-10 lg:px-16 py-2 sm:py-5 card-text-content'>
              <div className="relative h-5 sm:h-8 mb-1">
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full">
                  <span ref={card1DefaultTextRef} className='text-sm sm:text-lg inline-block font-semibold pt-2 text-slate-200 mb-1 whitespace-nowrap'>
                    Subscriber Reports
                  </span>
                  <span ref={card1HoverTextRef} className='text-sm sm:text-lg inline-block font-semibold pt-2 text-slate-200 mb-1 absolute left-0 right-0 top-0 whitespace-nowrap'>
                    Subscriber Highlights
                  </span>
                </div>
                <p className='text-xs sm:text-sm text-slate-500'>
                  Building truly great products is both art and science. It's part
                  intuition and part data.
                </p>
              </div>
            </div>
            <div className='relative group-hover:-translate-y-2 transition-transform duration-500 ease-in-out card-image-container'>
              <Image
                className='group-hover:opacity-0 transition-opacity duration-500 object-cover w-full h-auto' 
                src={image5}
                width={350}
                height={240}
                alt='Card image 01'
              />
              <Image
                className='absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity object-cover duration-300 w-full h-auto'
                src={image6}
                width={350}
                height={240}
                alt='Card image 01 displaying on hover'
                aria-hidden='true'
              />
            </div>
          </div>
        </div>
        <div 
          ref={card2Ref} 
          className="group bg-gradient-to-t from-[#050a0a] to-[#051818] hover:from-[#05070a] hover:to-[#0b1a3b] relative before:absolute before:inset-0 before:opacity-5 rounded-xl sm:rounded-2xl border transform transition-all duration-500 ease-out will-change-transform scale-75 sm:scale-100"
        >
          <span className="card-border absolute inset-0 rounded-xl sm:rounded-2xl border border-slate-700 opacity-0"></span>
          <div className='relative'>
            <div className='px-3 sm:px-6 md:px-10 lg:px-16 py-2 sm:py-5 card-text-content'>
              <div className="relative h-5 sm:h-8 mb-1">
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full">
                  <span ref={card2DefaultTextRef} className='text-sm sm:text-lg inline-block font-semibold pt-2 text-slate-200 mb-1 whitespace-nowrap'>
                    Don't Show Your Password
                  </span>
                  <span ref={card2HoverTextRef} className='text-sm sm:text-lg inline-block font-semibold pt-2 text-slate-200 mb-1 absolute left-0 right-0 top-0 whitespace-nowrap'>
                    Hide Your Password
                  </span>
                </div>
                <p className='text-xs sm:text-sm text-slate-500'>
                  If you don't hide your password then we can see it and know it
                  and then can enter your account
                </p>
              </div>
            </div>
            <div className='relative group-hover:-translate-y-2 transition-transform duration-500 ease-in-out card-image-container'>
              <Image
                className='group-hover:opacity-0 transition-opacity duration-500 w-full h-auto'
                src={image3}
                width={350}
                height={240}
                alt='Card image 02'
              />
              <Image
                className='absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-auto'
                src={image4}
                width={350}
                height={240}
                alt='Card image 02 displaying on hover'
                aria-hidden='true'
              />
            </div>
          </div>
        </div>
        <div 
          ref={card3Ref} 
          className="group bg-gradient-to-t from-[#171c35] to-[#000000] hover:from-[#2b131e] hover:to-[#141414] relative before:absolute before:inset-0 before:opacity-5 rounded-xl sm:rounded-2xl border transform transition-all duration-500 ease-out will-change-transform scale-75 sm:scale-100"
        >
          <span className="card-border absolute inset-0 rounded-xl sm:rounded-2xl border border-slate-700 opacity-0"></span>
          <div className='relative'>
            <div className='px-3 sm:px-6 md:px-10 lg:px-16 py-2 sm:py-5 card-text-content'>
              <div className="relative h-5 sm:h-8 mb-1">
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full">
                  <span ref={card3DefaultTextRef} className='text-sm sm:text-lg inline-block font-semibold pt-2 text-slate-200 mb-1 whitespace-nowrap'>
                    Chatting Seemlessly
                  </span>
                  <span ref={card3HoverTextRef} className='text-sm sm:text-lg inline-block font-semibold pt-2 text-slate-200 mb-1 absolute left-0 right-0 top-0 whitespace-nowrap'>
                    Don't Hide Chat
                  </span>
                </div>
                <p className='text-xs sm:text-sm text-slate-500'>
                  Building truly great products is both art and science. It's part
                  intuition and part data.
                </p>
              </div>
            </div>
            <div className='relative group-hover:-translate-y-2 transition-transform duration-500 ease-in-out card-image-container'>
              <Image
                className='group-hover:opacity-0 transition-opacity duration-500 w-full h-auto'
                src={image1}
                width={350}
                height={240}
                alt='Card image 03'
              />
              <Image
                className='absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-auto'
                src={image2}
                width={350}
                height={240}
                alt='Card image 03 displaying on hover'
                aria-hidden='true'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;