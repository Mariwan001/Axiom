"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    isVisible,
    animationDelay,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    isVisible: boolean;
    animationDelay: number;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-500 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end py-8 px-6 transition-all duration-500",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white overflow-hidden">
          {card.title.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={cn(
                "inline-block transition-all duration-300",
                hovered === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{
                transitionDelay: hovered === index ? `${charIndex * 30}ms` : '0ms',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h3>
        <div className="mt-3 overflow-hidden">
          <p
            className={cn(
              "text-xs md:text-sm text-gray-300 transform transition-all duration-500 ease-out",
              hovered === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: hovered === index ? '200ms' : '0ms' }}
          >
            {card.description ||
              "Experience the beauty of this stunning visual presentation with advanced animations."}
          </p>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to detect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Reveal cards only when section is in view
  useEffect(() => {
    if (!sectionInView) {
      setVisibleCards([]);
      return;
    }

    const revealCards = async () => {
      for (let i = 0; i < cards.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 250));
        setVisibleCards(prev => [...prev, i]);
      }
    };

    const timer = setTimeout(() => {
      revealCards();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [cards, sectionInView]);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          isVisible={visibleCards.includes(index)}
          animationDelay={index * 200}
        />
      ))}
    </div>
  );
}