import Index from '@/components/ui/cards-hover-effect';
import React from 'react';

const Sample = () => {
  return (
    <>
      <div className="w-full h-20 sm:h-24 md:h-32 lg:h-40"></div>
      
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-white" 
            style={{transform: "translateY(calc(-1vw - 4px))"}}>
          Samples of Axiom
        </h1>
        <div className="flex justify-center w-full">
          <p className='text-center text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 md:mb-10'>
            Axiom can be used in these techy logical fields
          </p>
        </div>
        
        {/* Fully responsive card spacing that adapts to all device sizes */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 
                      pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-8
                      relative top-4 sm:top-6 md:top-8 lg:top-10">
          <Index />
        </div>
      </div>
    </>
  );
};

export default Sample;