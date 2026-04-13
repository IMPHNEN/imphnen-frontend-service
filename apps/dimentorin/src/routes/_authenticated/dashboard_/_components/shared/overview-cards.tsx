import { Icon } from '@iconify/react';

export interface OverviewCard {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface OverviewCardsProps {
  cards: OverviewCard[];
}

/**
 * Overview Cards component for dashboard statistics.
 * Displays a grid of metric cards with icons and values.
 */
export function OverviewCards({ cards }: OverviewCardsProps) {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
    },
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-600 dark:text-orange-400',
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const colors = colorClasses[card.color];
        return (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon icon={card.icon} className={`${colors.text} text-xl`} />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{card.title}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
