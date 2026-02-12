// src/components/feature/ExperienceCard.tsx
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-200">
      {experience.imageUrl && (
        <div className="w-full h-48 rounded-t-lg mb-4 overflow-hidden bg-gray-100">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            width={300}
            height={192}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{experience.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{experience.description}</p>
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Duration:</span> {experience.duration}
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Group Size:</span> {experience.groupSize}
        </div>
      </div>
      <div className="mt-4">
        <Link to={`/experiences/${experience.id}`}>
          <Button variant="primary" className="w-full">View Details</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ExperienceCard;
