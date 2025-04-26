import React, { useState, useEffect } from 'react'
import image1 from '@/public/images/image-1.png'
import image2 from '@/public/images/image-2.png'
import image3 from '@/public/images/image-3.png'
import image6 from '@/public/images/image-6.png'
import image7 from '@/public/images/image-7.png'
import image8 from '@/public/images/image-8.png'
import { FocusCards } from '@/components/ui/main-focus-cards'

const About = () => {
  const focusCards = [
    {
      title: "Foundational Flow",
      src: image1.src,
      description: "A seamless interface grounded in core principles, designed to guide processes effortlessly from the most essential level.."
    },
    {
      title: "Core Principles",
      src: image2.src,
      description: "At the heart of every function lies a set of truths, this space honors them with clarity, stability, and purpose."
    },
    {
      title: "First Truths",
      src: image3.src,
      description: "Before complexity, there are truths we trust without proof, this design begins exactly there, with confident simplicity."
    },
    {
      title: "Logic Base",
      src: image7.src,
      description: "A structural starting point where order is born, composed of clean logic and dependable form."
    },
    {
      title: "System Seed",
      src: image8.src,
      description: "The source code of function and clarity, this is where the logic grows, simple yet powerful."
    },
    {
      title: "Elemental Logic",
      src: image6.src, 
      description: "The purest form of system thinking, stripped to its essence, elegantly guiding all layers above."
    },
  ];
  
  const [animatedText, setAnimatedText] = useState<string[]>([]);
  const text = "Axiom can be used in many systematic fields.";

  useEffect(() => {
    const animateText = async () => {
      setAnimatedText([]);
      await new Promise(resolve => setTimeout(resolve, 400));

      for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setAnimatedText(prev => [...prev, text[i]]);
      }
    };
    animateText();
  }, []);

  return (
    <section
      style={{
        marginTop: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 20px' }}>
        <h1 className='text-white font-semibold text-center text-3xl md:text-6xl mb-8'>About</h1>

        <div className="text-center mb-16 overflow-hidden">
          <p className="text-gray-300 text-sm md:text-xl relative inline-block leading-relaxed tracking-wide">
            {animatedText.map((char, index) => (
              <span 
                key={index}
                className="inline-block text-neutral-400"
                style={{ 
                  opacity: 0,
                  animation: `fadeInUp 0.4s ease forwards`,
                  animationDelay: `${index * 30}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <span 
              className="inline-block w-0.5 h-5 bg-blue-400 ml-0.5 animate-pulse"
              style={{ 
                opacity: animatedText.length === text.length ? 0 : 1,
                transition: 'opacity 300ms ease'
              }}
            />
          </p>
        </div>

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px'
        }}>
          <FocusCards cards={focusCards} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default About
