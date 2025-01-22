import React, { useState } from 'react';
import { Construction, Send, Bug, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const WorkInProgress = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axiosInstance.post('report-bug', formData);
      toast.success('Bug report submitted successfully!');
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        email: ''
      });
    } catch (error) {
      toast.error('Failed to submit bug report. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-2 mt-6">
      <div className="max-w-2xl w-full bg-base-100 rounded-xl shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-base-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bug className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Report an Issue</h1>
              <p className="text-sm text-base-content/60">
                Help us improve by reporting any bugs you encounter
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Issue Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input input-bordered input-sm w-full"
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Your Email <span className="text-error">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered input-sm w-full"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority Level <span className="text-error">*</span>
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="select select-bordered select-sm w-full"
            >
              <option value="low">Low - Minor inconvenience</option>
              <option value="medium">Medium - Affects functionality</option>
              <option value="high">High - Critical issue</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Detailed Description <span className="text-error">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full h-24"
              placeholder="Please provide as much detail as possible about the issue."
            />
          </div>

          {/* Info Box */}
          <div className="bg-info/10 rounded-lg p-3 flex gap-2">
            <AlertCircle className="size-4 text-info shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-info">Before submitting:</p>
              <ul className="list-disc ml-4 mt-0.5 text-base-content/70 space-y-0.5">
                <li>Include steps to reproduce the issue</li>
                <li>Check if this issue hasn't been reported before</li>
                <li>Include any relevant error messages</li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-sm w-full"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <>
                <Send className="size-4" />
                Submit Report
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkInProgress;
