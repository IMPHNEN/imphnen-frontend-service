import { useState } from 'react';
import {
  useAuthStore,
  useSessionQuery,
} from '@imphnen-frontend-service/service';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

type SettingsSection = 'account' | 'privacy' | 'preferences' | 'faq';

const faqItems = [
  { q: 'How do I book a mentoring session?', a: 'Browse available mentors, select one, and click "Book Session" to schedule a meeting.' },
  { q: 'How do I become a mentor?', a: 'Go to the registration page and fill in your professional details. Your application will be reviewed by our team.' },
  { q: 'Can I cancel a session?', a: 'Yes, you can cancel a pending or confirmed session from your dashboard before the scheduled time.' },
  { q: 'How do I update my profile?', a: 'Go to Settings > Account Details to update your personal information.' },
  { q: 'Is my data secure?', a: 'Yes, we use encryption and secure protocols to protect your data. See our Privacy Policy for details.' },
];

export default function SettingsPage() {
  const { session } = useAuthStore();
  const { data: meData } = useSessionQuery();
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const user = session?.user;

  const sections = [
    { id: 'account' as const, label: 'Account Details', icon: 'mdi:account-circle' },
    { id: 'privacy' as const, label: 'Privacy & Security', icon: 'mdi:shield-lock' },
    { id: 'preferences' as const, label: 'Preferences', icon: 'mdi:tune' },
    { id: 'faq' as const, label: 'FAQ & Support', icon: 'mdi:help-circle' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === s.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-3 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon icon={s.icon} width="20" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeSection === 'account' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input type="text" defaultValue={user?.fullname || ''} disabled className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" defaultValue={user?.email || ''} disabled className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-60" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <input type="text" defaultValue={user?.role?.name || 'User'} disabled className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-60" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  To update your profile, use the profile page from the main menu.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium">Coming Soon</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your account password</p>
                  </div>
                  <button
                    onClick={() => toast.info('Use the forgot password flow to reset your password')}
                    className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Active Sessions</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You are currently logged in on this device</p>
                  </div>
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                    <Icon icon="mdi:circle" width="8" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive email updates about your sessions</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Language</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose your preferred language</p>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">English</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Toggle between light and dark mode</p>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">System</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'faq' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">FAQ & Support</h2>
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{item.q}</span>
                      <Icon icon={expandedFaq === i ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="text-gray-400 shrink-0" />
                    </button>
                    {expandedFaq === i && (
                      <div className="px-4 pb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  <strong>Need more help?</strong> Contact us at{' '}
                  <a href="mailto:support@imphnen.dev" className="underline">support@imphnen.dev</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
