// src/components/feature/GlobalExperienceEditor.tsx
import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface GlobalExperienceEditorProps {
  experience?: Experience; // Optional: for editing an existing experience
  onSave: (experienceData: Experience) => void;
  onCancel: () => void;
}

const emptyExperience: Experience = {
  id: '',
  title: '',
  description: '',
  duration: '',
  groupSize: '',
  deliveryType: 'in-person',
  outcomes: [],
  agenda: [],
  requirements: [],
  pricing: '',
  published: false,
};

const GlobalExperienceEditor: React.FC<GlobalExperienceEditorProps> = ({ experience, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Experience>(experience || emptyExperience);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData(experience);
    } else {
      setFormData(emptyExperience);
    }
  }, [experience]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'outcomes' | 'agenda' | 'requirements') => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value.split('\\n').map(item => item.trim()).filter(item => item !== '') }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.groupSize) newErrors.groupSize = 'Group size is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call for saving
    console.log('Saving experience:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 flex flex-col max-h-[85vh]">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex-shrink-0">{experience ? 'Edit Experience' : 'Create New Experience'}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1 gap-4">
        <div className="overflow-y-auto pr-2 space-y-4 min-h-0 flex-1">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            rows={3}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        <Input
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          error={errors.duration}
        />
        <Input
          label="Group Size"
          name="groupSize"
          value={formData.groupSize}
          onChange={handleChange}
          error={errors.groupSize}
        />
        <div>
          <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700 mb-1">Delivery Type</label>
          <select
            id="deliveryType"
            name="deliveryType"
            value={formData.deliveryType}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="in-person">In-person</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div>
          <label htmlFor="outcomes" className="block text-sm font-medium text-gray-700 mb-1">Outcomes (one per line)</label>
          <textarea
            id="outcomes"
            name="outcomes"
            value={formData.outcomes?.join('\\n') || ''}
            onChange={(e) => handleArrayChange(e, 'outcomes')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            rows={2}
          ></textarea>
        </div>
        <div>
          <label htmlFor="agenda" className="block text-sm font-medium text-gray-700 mb-1">Agenda (one per line)</label>
          <textarea
            id="agenda"
            name="agenda"
            value={formData.agenda?.join('\\n') || ''}
            onChange={(e) => handleArrayChange(e, 'agenda')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            rows={2}
          ></textarea>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements?.join('\\n') || ''}
            onChange={(e) => handleArrayChange(e, 'requirements')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            rows={2}
          ></textarea>
        </div>
        <Input
          label="Pricing"
          name="pricing"
          value={formData.pricing}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={!!formData.published}
            onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">Published (visible on public site)</label>
        </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4 flex-shrink-0 border-t border-gray-200 pt-4 mt-2">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Experience'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GlobalExperienceEditor;
