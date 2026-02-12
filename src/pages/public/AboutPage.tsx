// src/pages/public/AboutPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import FadeInOnScroll from '../../components/effects/FadeInOnScroll';
import aboutHeroImage from '../../asset/pexels-rdne-7551235.jpg'; // Using one of the provided images

// Animated Counter Component (will be created separately, or inlined for MVP)
interface AnimatedCounterProps {
  end: number;
  duration?: number; // in seconds
  prefix?: string;
  suffix?: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2, prefix = '', suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          const startCount = 0;
          const increment = end / (duration * 60); // Assuming 60 frames per second
          let currentCount = startCount;

          const animation = setInterval(() => {
            currentCount += increment;
            if (currentCount >= end) {
              setCount(end);
              clearInterval(animation);
            } else {
              setCount(Math.floor(currentCount));
            }
          }, 1000 / 60); // ~60fps

          return () => clearInterval(animation);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasStarted]);


  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-extrabold text-green-600 mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-lg text-gray-700">{label}</p>
    </div>
  );
};


const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div> {/* Dark overlay */}
        <div className="relative container mx-auto text-white">
          <FadeInOnScroll delay={0} yOffset="20px">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About SWISH</h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200} yOffset="20px">
            <p className="text-xl md:text-2xl mb-8">
              Where teams connect, grow, and move together.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Our Vision Section */}
      <FadeInOnScroll delay={100} yOffset="30px">
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              SWISH is a team-building platform designed for corporates, churches, and large groups
              to design, manage, and experience structured team-building activities that strengthen
              connection, communication, and shared purpose. We envision a world where every team,
              regardless of its context, can effortlessly foster unity, trust, and alignment through engaging experiences.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Why Choose SWISH (Mission/Values) */}
      <FadeInOnScroll delay={100} yOffset="30px">
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose SWISH?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Professional & Inclusive</h3>
                <p className="text-gray-600">Credible for corporates, warm and values-driven for churches, and scalable for all large groups.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Structured & Engaging</h3>
                <p className="text-gray-600">Design, manage, and experience activities that genuinely strengthen connection and communication.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Effortless Management</h3>
                <p className="text-gray-600">From self-service booking to robust admin controls, we make team-building seamless.</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Animated Stats Section */}
      <FadeInOnScroll delay={200} yOffset="40px">
        <section className="py-16 px-4 bg-green-700 text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedCounter end={1200} suffix="+" label="Corporates Served" />
              <AnimatedCounter end={500} suffix="+" label="Church Groups Empowered" />
              <AnimatedCounter end={7500} suffix="+" label="Experiences Delivered" />
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Call to Action Section */}
      <FadeInOnScroll delay={100} yOffset="30px">
        <section className="py-16 px-4 bg-gray-50 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Build a Stronger Team?</h2>
            <p className="text-lg text-gray-700 mb-8">Join the SWISH community today and transform your team dynamics.</p>
            <Link to="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </section>
      </FadeInOnScroll>
    </PublicLayout>
  );
};

export default AboutPage;
