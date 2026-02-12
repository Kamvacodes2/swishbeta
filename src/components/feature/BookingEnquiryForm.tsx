// src/components/feature/BookingEnquiryForm.tsx
import React, { useState } from 'react';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface BookingEnquiryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experienceId?: string; // Optional: if form is opened from an experience detail page
}

const BookingEnquiryForm: React.FC<BookingEnquiryFormProps> = ({ open, onOpenChange, experienceId }) => {
  const [formData, setFormData] = useState<BookingEnquiry>({
    experienceId: experienceId || '',
    organizationName: '',
    contactName: '',
    contactEmail: '',
    preferredDate: '',
    groupSize: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactName) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Email address is invalid';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (formData.groupSize < 1) newErrors.groupSize = 'Group size must be at least 1';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    console.log('Submitting booking enquiry:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    setIsSubmitting(false);
    onOpenChange(false); // Close dialog on success
    alert('Booking enquiry submitted successfully!');
    setFormData({ // Reset form
      experienceId: experienceId || '',
      organizationName: '',
      contactName: '',
      contactEmail: '',
      preferredDate: '',
      groupSize: 1,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Book an Experience Enquiry" description="Please fill out the form below to inquire about booking this experience.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Experience ID"
          name="experienceId"
          value={formData.experienceId}
          readOnly
          disabled
        />
        <Input
          label="Organization Name"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          error={errors.organizationName}
        />
        <Input
          label="Contact Person Name"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          error={errors.contactName}
        />
        <Input
          label="Contact Person Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          error={errors.contactEmail}
        />
        <Input
          label="Preferred Date"
          name="preferredDate"
          type="date"
          value={formData.preferredDate}
          onChange={handleChange}
          error={errors.preferredDate}
        />
        <Input
          label="Approximate Group Size"
          name="groupSize"
          type="number"
          value={formData.groupSize}
          onChange={handleChange}
          min="1"
          error={errors.groupSize}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default BookingEnquiryForm;
