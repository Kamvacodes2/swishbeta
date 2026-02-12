// src/pages/public/PricingPage.tsx
import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import FadeInOnScroll from '../../components/effects/FadeInOnScroll';
import Card from '../../components/ui/Card';
import pricingHeroImg from '../../asset/pexels-rdne-7551387.jpg';
import { CheckIcon } from '@heroicons/react/24/solid';

const PRICING_TIERS = [
  {
    id: 'workshop',
    name: 'Single Workshop',
    subtitle: 'One-off team session',
    price: 'From R5 400',
    period: 'per session',
    description: 'Ideal for a focused half-day or full-day team-building session. One experience, one group.',
    features: [
      '1 facilitated session',
      'Up to 25 participants',
      'In-person or online',
      'Materials included',
      'Basic follow-up summary',
    ],
    cta: 'Request a quote',
    highlighted: false,
  },
  {
    id: 'programme',
    name: 'Programme Package',
    subtitle: 'Multiple sessions',
    price: 'From R27 000',
    period: 'per programme',
    description: 'A series of linked experiences for deeper impact. Customised to your outcomes and timeline.',
    features: [
      '3–6 sessions (your choice)',
      'Up to 50 participants',
      'Blended in-person & online',
      'Dedicated facilitator',
      'Progress insights & reports',
      'Ongoing support',
    ],
    cta: 'Get started',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'Organisation-wide',
    price: 'Custom',
    period: 'tailored to you',
    description: 'For large or multi-site organisations. Custom programmes, multiple teams, and strategic alignment.',
    features: [
      'Unlimited sessions (terms apply)',
      '100+ participants',
      'Multi-location support',
      'Account manager',
      'Custom content & branding',
      'Analytics & ROI reporting',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

const PricingPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <img
          src={pricingHeroImg}
          alt="Team building"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-green-900/75" />
        <div className="relative container mx-auto text-white max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pricing</h1>
          <p className="text-xl text-green-100">
            Clear, flexible pricing. From single workshops to organisation-wide programmes.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <FadeInOnScroll key={tier.id} delay={index * 100} yOffset="24px">
              <Card
                className={`relative h-full flex flex-col p-6 ${
                  tier.highlighted ? 'ring-2 ring-green-600 shadow-xl md:scale-105 z-10' : ''
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute top-0 left-0 right-0 py-1.5 bg-green-600 text-white text-sm font-semibold text-center rounded-t-lg">
                    Most popular
                  </span>
                )}
                <div className={tier.highlighted ? 'pt-8' : ''}>
                  <h2 className="text-xl font-bold text-gray-800">{tier.name}</h2>
                  <p className="text-sm text-green-600 font-medium mb-2">{tier.subtitle}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mb-1">{tier.price}</p>
                  <p className="text-sm text-gray-500 mb-4">{tier.period}</p>
                  <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-700 text-sm">
                        <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mr-2 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="block">
                    <Button
                      size="lg"
                      className="w-full"
                      variant={tier.highlighted ? 'primary' : 'ghost'}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            </FadeInOnScroll>
          ))}
        </div>
      </div>

      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Get a tailored quote</h2>
          <p className="text-gray-600 mb-6">
            Quotes are tailored to your group size, location, and chosen experiences. Contact us for an accurate estimate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg">Request a quote</Button>
            </Link>
            <Link to="/experiences">
              <Button size="lg" variant="ghost">Browse experiences</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PricingPage;
