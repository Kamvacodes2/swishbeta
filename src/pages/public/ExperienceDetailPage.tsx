// src/pages/public/ExperienceDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import { api } from '../../services/api';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import BookingEnquiryForm from '../../components/feature/BookingEnquiryForm';

const ExperienceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      if (id) {
        try {
          const fetchedExperience = await api.experiences.getById(id);
          if (fetchedExperience) {
            setExperience(fetchedExperience);
          } else {
            setError('Experience not found.');
          }
        } catch (err) {
          setError('Failed to fetch experience details.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Experience ID is missing.');
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center h-screen-minus-header">
          <Spinner size="lg" />
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </PublicLayout>
    );
  }

  if (!experience) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
          <p>The experience you are looking for does not exist.</p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{experience.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{experience.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Details</h2>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">Duration:</span> {experience.duration}</li>
              <li><span className="font-medium">Group Size:</span> {experience.groupSize}</li>
              <li><span className="font-medium">Delivery Type:</span> <span className="capitalize">{experience.deliveryType}</span></li>
              {experience.pricing && <li><span className="font-medium">Pricing:</span> {experience.pricing}</li>}
            </ul>
          </div>
          <div>
            {experience.outcomes && experience.outcomes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Outcomes</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {experience.outcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
                </ul>
              </div>
            )}
            {experience.agenda && experience.agenda.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Agenda</h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-1">
                  {experience.agenda.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
            {experience.requirements && experience.requirements.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Requirements</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {experience.requirements.map((req, index) => <li key={index}>{req}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button size="lg" onClick={() => setIsBookingFormOpen(true)}>
            Book an Enquiry
          </Button>
        </div>

        <BookingEnquiryForm
          open={isBookingFormOpen}
          onOpenChange={setIsBookingFormOpen}
          experienceId={experience.id}
        />
      </div>
    </PublicLayout>
  );
};

export default ExperienceDetailPage;
