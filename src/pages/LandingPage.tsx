import { useState } from 'react';
import { Brain, Shield, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SignupModal } from '../components/SignupModal';
import { analytics } from '../lib/posthog';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is BabyGPT a replacement for medical advice?',
    answer: 'No, BabyGPT is not a replacement for professional medical care. While we provide evidence-based guidance for common parenting questions, you should always consult your pediatrician for medical concerns. We help you make informed decisions and know when to seek professional medical attention.'
  },
  {
    question: 'How accurate is the advice from BabyGPT?',
    answer: 'Our responses are based on peer-reviewed pediatric research and clinical guidelines. All content is reviewed by experienced pediatricians to ensure accuracy and safety. However, every child is unique, and our advice should be considered general guidance rather than specific medical recommendations.'
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with BabyGPT, simply contact our support team for a full refund, no questions asked.'
  },
  {
    question: 'How does the subscription work?',
    answer: 'Choose between monthly ($29.99/month) or annual ($23.99/month) billing. Your subscription gives you unlimited access to BabyGPT\'s AI parenting assistant. Cancel anytime with no hidden fees.'
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes, we take data security seriously. All communications are encrypted, and we never share your personal information with third parties. We comply with all relevant data protection regulations.'
  },
  {
    question: 'Can I use BabyGPT on multiple devices?',
    answer: 'Yes, access BabyGPT from any device with your account credentials. Use it on your phone, tablet, or computer - wherever and whenever you need parenting guidance.'
  }
];

export default function LandingPage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const handleGetStarted = (plan?: 'monthly' | 'annual') => {
    if (plan) {
      setSelectedPlan(plan);
    }
    analytics.track('signup_started', { plan });
    setIsSignupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">BabyGPT</span>
            </div>
            <Button onClick={() => handleGetStarted()} variant="primary">
              Sign in
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Your Personal AI-Powered Parenting Expert
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant, reliable answers to all your parenting questions - from feeding
            schedules to sleep training. Available 24/7.
          </p>
          <Button size="lg" onClick={() => handleGetStarted()}>
            Get Started Now
          </Button>
          <p className="mt-4 text-sm text-gray-500">Sign-ups are currently limited</p>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">From Anxious to Confident</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Before BabyGPT */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Before BabyGPT</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-red-500">
                    <span className="mr-2">✕</span>
                    Late-night Google spirals
                  </li>
                  <li className="flex items-center text-red-500">
                    <span className="mr-2">✕</span>
                    Conflicting advice from forums
                  </li>
                  <li className="flex items-center text-red-500">
                    <span className="mr-2">✕</span>
                    Waiting for pediatrician calls
                  </li>
                  <li className="flex items-center text-red-500">
                    <span className="mr-2">✕</span>
                    Information overload
                  </li>
                  <li className="flex items-center text-red-500">
                    <span className="mr-2">✕</span>
                    Stress and uncertainty
                  </li>
                </ul>
              </div>
              {/* With BabyGPT */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">With BabyGPT</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✓</span>
                    Instant, reliable answers
                  </li>
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✓</span>
                    Research-backed guidance
                  </li>
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✓</span>
                    24/7 peace of mind
                  </li>
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✓</span>
                    Clear, actionable advice
                  </li>
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✓</span>
                    Confident parenting decisions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-2">Trusted by 1,000+ Parents</h2>
            <p className="text-center text-gray-600 mb-12">Evidence-Based Parenting Support</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  "What I love most about BabyGPT is that it's backed by actual scientific research, not
                  random internet advice. As a first-time mom, knowing the answers come from pediatric
                  studies gives me peace of mind."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Mom of 2-month-old</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  "I was skeptical about using AI for parenting advice, but BabyGPT has been a lifesaver
                  during those 3 AM feeding questions. It's like having a pediatrician and experienced parent
                  on call 24/7."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"
                    alt="Michael Chen"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-gray-500">Dad of 6-month-old twins</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  "The cost worried me at first, but BabyGPT has saved us countless pediatrician visits for minor
                  concerns. It helps us know when something's normal and when we actually need to see a doctor."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop"
                    alt="Emily Rodriguez"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Mom of 9-month-old</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-2">Simple, Transparent Pricing</h2>
            <p className="text-center text-gray-600 mb-12">30-Day Money-Back Guarantee - Love it or get a full refund</p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monthly Plan */}
              <div className="border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Monthly</h3>
                <div className="text-4xl font-bold mb-6">$29.99<span className="text-lg text-gray-500">/month</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Unlimited AI consultations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    24/7 availability
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Research-backed answers
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Cancel anytime
                  </li>
                </ul>
                <Button fullWidth onClick={() => handleGetStarted('monthly')}>
                  Get Started
                </Button>
              </div>

              {/* Annual Plan */}
              <div className="border rounded-lg p-8 relative">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-tr-lg rounded-bl-lg text-sm">
                  Best Value
                </div>
                <h3 className="text-xl font-semibold mb-4">Annual</h3>
                <div className="text-4xl font-bold mb-6">$23.99<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-indigo-600 mb-6">Save 20%</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    All Monthly features
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Exclusive content
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Personalized insights
                  </li>
                </ul>
                <Button fullWidth onClick={() => handleGetStarted('annual')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <span className="font-medium">{item.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 py-8 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
            Important: Using BabyGPT does not create a patient-physician relationship. For medical advice, please consult with your pediatrician.
          </div>
        </div>
      </main>

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}