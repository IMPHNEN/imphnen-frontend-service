import { Link } from 'react-router';

export default function MaintenancePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-600 mb-4">🚧</h1>
        <h2 className="text-3xl font-semibold mb-2">We'll be back soon!</h2>
        <p className="text-gray-600">
          Our site is currently undergoing scheduled maintenance.
          <br />
          Thank you for your patience.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-primary-600 hover:underline"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
