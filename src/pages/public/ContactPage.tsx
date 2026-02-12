// src/pages/public/ContactPage.tsx
import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
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
    console.log('Contact form submitted:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Optionally clear form or show success message permanently
    // setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PublicLayout>
      <div className="relative flex justify-center items-center min-h-[calc(100vh-100px-50px)] py-16 px-4 overflow-hidden">
        {/* Blurry Ball 1 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        {/* Blurry Ball 2 */}
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <Card className="w-full max-w-md relative z-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
          {isSubmitted ? (
            <div className="text-center p-6 bg-green-100 text-green-700 rounded-md">
              <p className="text-xl font-semibold mb-2">Thank you for your message!</p>
              <p>We'll get back to you as soon as possible.</p>
              <Button onClick={() => setIsSubmitted(false)} className="mt-4">Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
              />
              <Input
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isSubmitting}
              />
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                disabled={isSubmitting}
              />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  rows={5}
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
