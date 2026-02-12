// src/pages/public/ExperiencesPage.tsx
import React, { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import ExperienceCard from '../../components/feature/ExperienceCard';
import ExperienceFilterPanel from '../../components/feature/ExperienceFilterPanel';
import { api } from '../../services/api';
import Spinner from '../../components/ui/Spinner';

const ExperiencesPage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({}); // State to hold current filters

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      const allExperiences = await api.experiences.getAll();
      setExperiences(allExperiences);
      setFilteredExperiences(allExperiences); // Initialize with all experiences
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    // Apply filters whenever experiences or filters change
    const applyFilters = () => {
      let tempExperiences = [...experiences];

      if (filters.search) {
        const q = filters.search.toLowerCase();
        tempExperiences = tempExperiences.filter(exp =>
          exp.title.toLowerCase().includes(q) ||
          exp.description.toLowerCase().includes(q)
        );
      }
      if (filters.deliveryType) {
        tempExperiences = tempExperiences.filter(exp => exp.deliveryType === filters.deliveryType);
      }
      if (filters.groupType) {
        tempExperiences = tempExperiences.filter(exp =>
          exp.description.toLowerCase().includes(filters.groupType!) ||
          exp.title.toLowerCase().includes(filters.groupType!)
        );
      }
      if (filters.groupSize) {
        tempExperiences = tempExperiences.filter(exp => exp.groupSize.toLowerCase().includes(filters.groupSize!));
      }
      if (filters.duration) {
        tempExperiences = tempExperiences.filter(exp => exp.duration.toLowerCase().includes(filters.duration!));
      }

      setFilteredExperiences(tempExperiences);
    };
    applyFilters();
  }, [filters, experiences]);


  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Experiences</h1>
        <ExperienceFilterPanel onFilterChange={handleFilterChange} />
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Spinner size="lg" />
          </div>
        ) : filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No experiences match your filters.</p>
        )}
      </div>
    </PublicLayout>
  );
};

export default ExperiencesPage;
