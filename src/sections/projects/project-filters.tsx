'use client';

interface ProjectFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ['Todos', 'Web', 'Mobile'];

export function ProjectFilters({
  selectedFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  return (
    <div className='flex justify-center gap-4 mt-8'>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
            selectedFilter === filter
              ? 'bg-orange-500 text-white dark:text-black border-orange-500'
              : 'bg-transparent text-gray-600 dark:text-gray-400 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
