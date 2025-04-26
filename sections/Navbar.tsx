import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Updated breakpoint logic for iPad
  const isIPad = typeof navigator !== 'undefined' ? /iPad|Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document : false;
  const isDesktop = isIPad ? windowWidth >= 1024 : windowWidth >= 768;

  const navbarStyle = {
    margin: isScrolled ? '0.5rem auto' : '1rem auto',
    width: '85%',
    maxWidth: '1400px',
    background: 'rgba(85, 82, 82, 0.11)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(11.2px)',
    WebkitBackdropFilter: 'blur(11.2px)',
    border: '1px solid rgba(85, 82, 82, 0.31)',
    padding: isScrolled ? '0 2rem' : '0 3rem',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  };

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -5 },
    open: { opacity: 1, y: 0 }
  };

  const navbarContainerVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0,
      x: -30,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }
    }
  };

  const navItemsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const navItemVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const buttonsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.5,
        when: "beforeChildren"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      x: 30,
      scale: 0.9,
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const glowVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        delay: 0.7,
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4">
      <motion.div 
        style={navbarStyle}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={navbarContainerVariants}
      >
        {isDesktop ? (
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-10">
              <motion.h1 
                variants={logoVariants}
                style={{
                  fontSize: isScrolled ? '1.25rem' : '1.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
                  marginRight: '2rem',
                  transition: 'all 0.3s ease',
                }}
              >
                AXIOM
              </motion.h1>
              <motion.nav 
                className="flex items-center space-x-8" 
                style={{ marginLeft: '1rem' }}
                variants={navItemsContainerVariants}
              >
                {['Home', 'About', 'Sample', 'FAQs'].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    onMouseEnter={() => setActiveLink(item)}
                    onMouseLeave={() => setActiveLink(null)}
                    style={{ position: 'relative' }}
                    variants={navItemVariants}
                  >
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      className="relative z-10"
                      style={{
                        display: 'block',
                        color: activeLink === item ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.85)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        letterSpacing: '0.03em',
                        padding: '0.5rem 1rem',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item}
                    </motion.a>
                    
                    <AnimatePresence>
                      {activeLink === item && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.95,
                            backdropFilter: 'blur(0px)',
                          }}
                          animate={{
                            opacity: 0.9,
                            scale: 1,
                            backdropFilter: 'blur(20px)',
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95,
                            backdropFilter: 'blur(0px)',
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.4,
                          }}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '-12px',
                            width: 'calc(100% + 24px)',
                            height: 'calc(100% + 16px)',
                            background: 'rgba(0, 0, 0, 0.4)',
                            borderRadius: '12px',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            zIndex: 0,
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              borderRadius: '12px',
                              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 80%)',
                              zIndex: -1,
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
            <motion.div 
              className="flex items-center space-x-4"
              variants={buttonsContainerVariants}
            >
              <motion.button
                variants={buttonVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.25), -3px -3px 8px rgba(255, 255, 255, 0.15), inset 0 0 0 rgba(255, 255, 255, 0.2), inset 0 0 0 rgba(0, 0, 0, 0.2)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  color: '#1a1a1a',
                  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                  boxShadow:
                    '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.1), inset 0 0 0 rgba(255, 255, 255, 0.2), inset 0 0 0 rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  marginRight: '1rem',
                  cursor: 'pointer',
                }}
              >
                Explore More!
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.35), -3px -3px 8px rgba(255, 255, 255, 0.07), inset 0 0 0 rgba(255, 255, 255, 0.05), inset 0 0 0 rgba(0, 0, 0, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
                  boxShadow:
                    '5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.05), inset 0 0 0 rgba(255, 255, 255, 0.05), inset 0 0 0 rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(0, 0, 0, 0.8)',
                  cursor: 'pointer',
                }}
              >
                Have a Question?
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between h-14">
              <motion.h1
                variants={logoVariants}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AXIOM
              </motion.h1>
              <motion.button
                variants={buttonVariants}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <motion.svg
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ 
                    duration: 0.25,
                    ease: "easeInOut"
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    stroke: 'white',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                  )}
                </motion.svg>
              </motion.button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  style={{ 
                    overflow: 'hidden',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    willChange: 'height, opacity',
                  }}
                >
                  <nav className="flex flex-col items-center py-6 space-y-5">
                    {['Home', 'About', 'Sample', 'FAQs'].map((item, index) => (
                      <motion.a
                        key={index}
                        href={`#${item.toLowerCase()}`}
                        variants={itemVariants}
                        transition={{ 
                          duration: 0.2,
                          delay: index * 0.08
                        }}
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '1rem',
                          padding: '0.5rem 1rem',
                          width: '100%',
                          textAlign: 'center',
                        }}
                        className="hover:text-white"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </nav>

                  <div className="flex flex-col items-center pb-6 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      variants={itemVariants}
                      transition={{ 
                        duration: 0.15, 
                        delay: 0.4
                      }}
                      style={{
                        padding: '0.75rem 0',
                        width: '80%',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: '#1a1a1a',
                        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                        boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -2px -2px 6px rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                      }}
                    >
                      Explore More!
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      variants={itemVariants}
                      transition={{ 
                        duration: 0.15, 
                        delay: 0.5
                      }}
                      style={{
                        marginTop: '1rem',
                        marginBottom: '1.5rem',
                        padding: '0.75rem 0',
                        width: '80%',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: '#ffffff',
                        background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
                        boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                      }}
                    >
                      Have a Question?
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        variants={glowVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        style={{
          position: 'absolute',
          top: '0',
          left: '5%',
          width: '90%',
          height: '100%',
          borderRadius: '16px',
          background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
          filter: 'blur(20px)',
          opacity: '0',
          zIndex: '-1',
          pointerEvents: 'none'
        }}
      />

      <motion.div 
        variants={glowVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        style={{
          position: 'absolute',
          top: '-20px',
          left: '15%',
          width: '70%',
          height: '50px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(15px)',
          opacity: '0',
          zIndex: '-1',
          pointerEvents: 'none'
        }}
      />
    </header>
  );
};

export default Navbar;
