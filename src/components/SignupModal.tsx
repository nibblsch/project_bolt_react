import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';
import { analytics } from '../lib/posthog';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { config } from '../lib/config';

const stripe = await loadStripe(config.stripePublishableKey);

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: 'monthly' | 'annual';
}

export function SignupModal({ isOpen, onClose, selectedPlan = 'monthly' }: SignupModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'initial' | 'details' | 'checkout'>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [plan, setPlan] = useState(selectedPlan);
  const [error, setError] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validatePassword = (pwd: string) => {
    // Strong password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(pwd);
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setShowPasswordRequirements(true);
      setError('Password does not meet security requirements');
      return;
    }

    analytics.capture('signup_started', {
      email,
      plan: selectedPlan
    });

    analytics.capture('signup_step', {
      step: 'initial',
      email
    });

    setStep('details');
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !childAge || !plan) {
      setError('Please fill in all fields');
      return;
    }

    analytics.capture('signup_step', {
      step: 'details',
      full_name: fullName,
      child_age: childAge,
      plan: selectedPlan
    });

    setStep('checkout');
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            child_age_months: parseInt(childAge),
          },
        },
      });

      if (authError) throw authError;

      analytics.capture('signup_completed', {
        plan: selectedPlan,
        full_name: fullName,
        child_age_months: parseInt(childAge),
      });

      analytics.identify(authData.user?.id || '', {
        email,
        full_name: fullName,
        child_age_months: parseInt(childAge),
      });

      navigate('/chat');
    } catch (error) {
      setError('An error occurred during signup. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create your account">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {step === 'initial' && (
        <form onSubmit={handleInitialSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {showPasswordRequirements && (
              <p className="mt-1 text-sm text-red-500">
                Must be at least 8 characters long and include at least one uppercase letter, 
                one lowercase letter, one number, and one special character
              </p>
            )}
          </div>
          <Button type="submit" fullWidth>Continue</Button>
        </form>
      )}

      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Child's Age (months)</label>
            <input
              type="number"
              required
              min="0"
              max="120"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setPlan('monthly')}
              className={`flex-1 p-4 border rounded-lg ${
                plan === 'monthly' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' 
                  : 'border-gray-300'
              }`}
            >
              <div className="text-center">
                <h3 className="font-semibold">Monthly</h3>
                <p className="text-xl font-bold">$29.99/mo</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPlan('annual')}
              className={`flex-1 p-4 border rounded-lg relative ${
                plan === 'annual' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' 
                  : 'border-gray-300'
              }`}
            >
              <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg text-xs">
                Save 20%
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Annual</h3>
                <p className="text-xl font-bold">$23.99/mo</p>
              </div>
            </button>
          </div>
          <Button type="submit" fullWidth>Continue to Payment</Button>
        </form>
      )}

      {step === 'checkout' && (
        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
          <div id="stripe-payment-element" />
          <Button type="submit" fullWidth>Complete Purchase</Button>
        </form>
      )}
    </Modal>
  );
}