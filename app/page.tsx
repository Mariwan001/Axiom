"use client";

import About from '@/sections/About';
import Faqs from '@/sections/Faqs';
import Hero from '@/sections/Hero';
import Navbar from '@/sections/Navbar'
import Sample from '@/sections/Sample';
import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    // Add subtle parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const gradients = document.querySelectorAll('.bg-gradient');
      gradients.forEach(gradient => {
        const offsetX = 20 * (mouseX - 0.5);
        const offsetY = 20 * (mouseY - 0.5);
        (gradient as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='h-[500vh] relative'>
      {/* Background Elements */}
      <div className="bg-wrapper">
        <div className="bg-gradient bg-gradient-1"></div>
        <div className="bg-gradient bg-gradient-2"></div>
      </div>
      
      {/* Your existing content */}
      <Navbar />
      <Hero />
      <About />
      <Sample />
      <Faqs />
    </div>
  )
}

export default page