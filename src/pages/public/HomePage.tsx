// src/pages/public/HomePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import ExperienceCard from '../../components/feature/ExperienceCard';
import { api } from '../../services/api';
import gsap from 'gsap';
import teambuildingImage from '../../asset/teambuilding.jpeg';
import FadeInOnScroll from '../../components/effects/FadeInOnScroll';
import { BuildingOffice2Icon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline';

const CAROUSEL_SPEED = 0.04; // pixels per millisecond

const HomePage: React.FC = () => {
  const [featuredExperiences, setFeaturedExperiences] = useState<Experience[]>([]);
  const swishCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFeaturedExperiences = async () => {
      const allExperiences = await api.experiences.getAll();
      setFeaturedExperiences(allExperiences); // Load all experiences, not just slice(0,3)
    };
    loadFeaturedExperiences();
  }, []);

  useEffect(() => {
    const charsToAnimate = swishCharsRef.current.filter(Boolean) as HTMLSpanElement[];

    if (charsToAnimate.length > 0) {
      gsap.killTweensOf(charsToAnimate);
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });
      tl.fromTo(charsToAnimate,
        { rotationX: 0, opacity: 1 },
        {
          rotationX: 360,
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "center center -50px",
          stagger: {
            each: 0.1,
            from: "start"
          }
        }
      );
    }
  }, []); // Run only once on mount


  // Transform-based carousel: no scrollLeft, no layout — smooth from frame 1
  useEffect(() => {
    const track = carouselTrackRef.current;
    const viewport = carouselViewportRef.current;
    if (!track || !viewport || featuredExperiences.length === 0) return;

    let rafId: number;
    let position = 0;
    let lastTime: DOMHighResTimeStamp = 0;
    let segmentWidth = 0;
    let paused = false;

    const run = (timestamp: DOMHighResTimeStamp) => {
      rafId = requestAnimationFrame(run);
      if (paused) return;
      if (segmentWidth <= 0) return;

      if (lastTime === 0) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      position += CAROUSEL_SPEED * delta;
      if (position >= segmentWidth) position -= segmentWidth;
      track.style.transform = `translate3d(-${position}px,0,0)`;
    };

    const measureAndStart = () => {
      segmentWidth = track.offsetWidth / 2; // we render 2 copies
      if (segmentWidth > 0) {
        lastTime = 0;
        rafId = requestAnimationFrame(run);
      }
    };

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; lastTime = 0; };

    viewport.addEventListener('mouseenter', onEnter);
    viewport.addEventListener('mouseleave', onLeave);

    // Measure after layout (next frame) so dimensions are final
    const measureId = requestAnimationFrame(measureAndStart);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(measureId);
      viewport.removeEventListener('mouseenter', onEnter);
      viewport.removeEventListener('mouseleave', onLeave);
    };
  }, [featuredExperiences]);


  const swishWord = "SWISH";

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${teambuildingImage})` }}
      >
        <div className="absolute inset-0 bg-green-900 opacity-70"></div> {/* Overlay */}
        <div className="relative container mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInUp">
            {swishWord.split('').map((char, index) => (
              <span
                key={index}
                ref={el => swishCharsRef.current[index] = el}
                style={{ display: 'inline-block', perspective: '1000px' }} // Apply necessary styles for 3D transform
              >
                {char}
              </span>
            ))}: Switch on Stronger Teams
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeInUp animation-delay-200">
            Purpose-built team building for organisations that matter.
          </p>
          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:gap-4 animate-fadeInUp animation-delay-400">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-gray-100">Get Started</Button>
            </Link>
            <Link to="/experiences">
              <Button size="lg" variant="ghost" className="border-2 border-white text-white hover:bg-white hover:text-green-700">Explore Experiences</Button>
            </Link>
          </div>
        </div>
      </section>
            {/* Who SWISH is For Section */}
            <FadeInOnScroll delay={100} yOffset="30px">
              <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-10">Who SWISH is For</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <BuildingOffice2Icon className="h-10 w-10 text-gray-800 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold text-green-700 mb-3">Corporate Teams</h3>
                      <p className="text-gray-600">Enhance cohesion, communication, and productivity with structured team-building solutions.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <HeartIcon className="h-10 w-10 text-gray-800 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold text-green-700 mb-3">Churches & Ministries</h3>
                      <p className="text-gray-600">Build unity, foster trust, and align activities with your values in an inclusive environment.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <UsersIcon className="h-10 w-10 text-gray-800 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold text-green-700 mb-3">Large Groups & Events</h3>
                      <p className="text-gray-600">Scale team-building effortlessly for conferences, large gatherings, and community events.</p>
                    </div>
                  </div>
                </div>
              </section>
            </FadeInOnScroll>
      {/* Featured Experiences — transform-based carousel (smooth, no scroll jitter) */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Featured Experiences</h2>
          <div
            ref={carouselViewportRef}
            className="relative overflow-hidden w-full"
            style={{ overflow: 'hidden' }}
          >
            <div
              ref={carouselTrackRef}
              className="flex flex-nowrap gap-8 pb-4 w-max"
              style={{ willChange: 'transform' }}
            >
              {[...featuredExperiences, ...featuredExperiences].map((exp: Experience, index) => (
                <div key={`${exp.id}-${index}`} className="flex-none w-[300px]">
                  <ExperienceCard experience={exp} />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/experiences">
              <Button size="lg">View All Experiences</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <FadeInOnScroll delay={100} yOffset="30px">
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-green-600 text-5xl mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Explore & Choose</h3>
                <p className="text-gray-600">Browse our curated library of team-building experiences.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-green-600 text-5xl mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Book Your Session</h3>
                <p className="text-gray-600">Select a date, time, and group size, then submit an enquiry.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-green-600 text-5xl mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Strengthen Your Team</h3>
                <p className="text-gray-600">Experience a fun, engaging, and impactful team-building event.</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Call to Action Section */}
            <FadeInOnScroll delay={200} yOffset="40px">
              <section className="bg-green-700 text-white py-16 px-4 text-center">
                <div className="container mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build a Stronger Team?</h2>
                  <p className="text-lg md:text-xl mb-8">Connect, grow, and move together with SWISH.</p>
                  <Link to="/contact">
                    <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-gray-100">Contact Us</Button>
                  </Link>
                </div>
              </section>
            </FadeInOnScroll>    </PublicLayout>
  );
};

export default HomePage;