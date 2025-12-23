'use client';

import { useState } from 'react';

export default function BuildRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    useCase: '',
    preferences: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Replace with your Formspree form ID
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          budget: '',
          useCase: '',
          preferences: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="rounded-lg shadow-md p-8" style={{ backgroundColor: '#FFFFE3' }}>
      <h2 className="text-2xl font-bold text-primary-darkest mb-6">
        Request a Build
      </h2>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-primary-medium text-primary-darkest rounded-lg">
          Thank you! Your request has been submitted. I&apos;ll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-primary-medium text-primary-darkest rounded-lg">
          There was an error submitting your request. Please try again or contact me directly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-primary-darkest mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-medium rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white text-primary-darkest"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary-darkest mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-medium rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white text-primary-darkest"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-primary-darkest mb-2"
          >
            Budget *
          </label>
          <select
            id="budget"
            name="budget"
            required
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-medium rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white text-primary-darkest"
          >
            <option value="">Select a budget range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000-3000">$2,000 - $3,000</option>
            <option value="3000-5000">$3,000 - $5,000</option>
            <option value="over-5000">Over $5,000</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="useCase"
            className="block text-sm font-medium text-primary-darkest mb-2"
          >
            Primary Use Case *
          </label>
          <select
            id="useCase"
            name="useCase"
            required
            value={formData.useCase}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-medium rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white text-primary-darkest"
          >
            <option value="">Select a use case</option>
            <option value="gaming">Gaming</option>
            <option value="work">Work/Productivity</option>
            <option value="content-creation">Content Creation</option>
            <option value="streaming">Streaming</option>
            <option value="general">General Use</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="preferences"
            className="block text-sm font-medium text-primary-darkest mb-2"
          >
            Additional Preferences or Requirements
          </label>
          <textarea
            id="preferences"
            name="preferences"
            rows={4}
            value={formData.preferences}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-medium rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white text-primary-darkest"
            placeholder="Tell me about any specific requirements, preferred brands, color schemes, etc."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-primary-dark hover:bg-primary-medium text-primary-light font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      <p className="mt-4 text-sm text-primary-darkest">
        * Required fields. Note: You&apos;ll need to configure your Formspree form ID in the component code.
      </p>
    </div>
  );
}

