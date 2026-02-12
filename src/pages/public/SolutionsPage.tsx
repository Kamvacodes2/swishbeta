// src/pages/public/SolutionsPage.tsx
import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import FadeInOnScroll from '../../components/effects/FadeInOnScroll';
import corporateImg from '../../asset/pexels-rdne-7551754.jpg';
import churchImg from '../../asset/pexels-gabby-k-9489091.jpg';
import eventsImg from '../../asset/pexels-rdne-7551431.jpg';

const SOLUTIONS = [
  {
    id: 'corporate',
    title: 'Corporate Team Building',
    subtitle: 'Strengthen your teams, boost performance',
    description: 'Purpose-built programmes for businesses that want to improve communication, trust, and collaboration. From half-day workshops to multi-session leadership development, we deliver measurable outcomes aligned to your goals.',
    image: corporateImg,
    features: ['Custom workshops & simulations', 'In-person and online delivery', 'From 6 to 200+ participants', 'Post-session insights & follow-up'],
    ctaLabel: 'Explore corporate experiences',
    ctaPath: '/experiences',
  },
  {
    id: 'church',
    title: 'Churches & Ministries',
    subtitle: 'Unity, trust, and values-driven connection',
    description: 'Inclusive team-building designed for church staff, ministry teams, and volunteer groups. Build stronger relationships and shared purpose in an environment that honours your values and culture.',
    image: churchImg,
    features: ['Values-aligned activities', 'Staff and volunteer programmes', 'Retreats and away-days', 'Scalable for small and large groups'],
    ctaLabel: 'View ministry solutions',
    ctaPath: '/experiences',
  },
  {
    id: 'events',
    title: 'Large Groups & Events',
    subtitle: 'Scale team-building for conferences and communities',
    description: 'Engage big audiences with structured, fun, and impactful team-building. Ideal for conferences, company events, community gatherings, and anywhere you need to connect people at scale.',
    image: eventsImg,
    features: ['50 to 500+ participants', 'Conference breakouts & keynotes', 'Community and NGO events', 'Flexible formats and venues'],
    ctaLabel: 'See large-group options',
    ctaPath: '/experiences',
  },
];

const SolutionsPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="relative py-16 px-4 bg-green-800 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Solutions</h1>
          <p className="text-xl text-green-100">
            Team-building solutions for corporates, churches, and large groups across South Africa.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {SOLUTIONS.map((solution, index) => (
          <FadeInOnScroll key={solution.id} delay={index * 100} yOffset="30px">
            <section className="mb-20">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{solution.title}</h2>
                  <p className="text-green-600 font-medium mb-4">{solution.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={solution.ctaPath}>
                    <Button size="lg">{solution.ctaLabel}</Button>
                  </Link>
                </div>
              </div>
            </section>
          </FadeInOnScroll>
        ))}
      </div>

      <section className="bg-gray-50 py-16 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not sure which solution fits?</h2>
          <p className="text-gray-600 mb-6">Tell us about your group and goals—we’ll recommend the right experiences and format.</p>
          <Link to="/contact">
            <Button size="lg">Get in touch</Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default SolutionsPage;
