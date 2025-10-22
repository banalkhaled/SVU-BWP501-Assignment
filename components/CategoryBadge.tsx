import React from 'react';
import { EventCategory } from '../types';

const categoryClass: Record<EventCategory, string> = {
  [EventCategory.Music]:   'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  [EventCategory.Sports]:  'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  [EventCategory.Culture]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  [EventCategory.Family]:  'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200',
  [EventCategory.Tech]:    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  [EventCategory.Food]:    'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
};

type Props = { category: EventCategory; className?: string };

const CategoryBadge: React.FC<Props> = ({ category, className = '' }) => (
  <span className={[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
      'ring-1 ring-black/5 dark:ring-white/10',
      categoryClass[category],
      className,
    ].join(' ')}
  >
    {category}
  </span>
);

export default CategoryBadge;
