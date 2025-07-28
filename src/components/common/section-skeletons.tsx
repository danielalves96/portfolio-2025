import React from 'react';

export function ProjectsSkeleton() {
  return (
    <div className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse' />
        </div>

        <div className='flex justify-center gap-4 mb-12'>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className='h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse'
            />
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className='animate-pulse'>
              <div className='aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4' />
              <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className='py-20 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse' />
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className='animate-pulse'>
              <div className='flex items-start gap-4'>
                <div className='w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0' />
                <div className='flex-1'>
                  <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1' />
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolsSkeleton() {
  return (
    <div className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse' />
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <div key={i} className='animate-pulse text-center'>
              <div className='w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-3' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SocialSkeleton() {
  return (
    <div className='py-20 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='grid gap-8 md:grid-cols-2'>
          {[1, 2].map(i => (
            <div key={i} className='animate-pulse'>
              <div className='aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4' />
              <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className='py-20 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-12'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse' />
        </div>

        <div className='space-y-6 animate-pulse'>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded' />
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded' />
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded' />
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded w-32' />
        </div>
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className='py-12 overflow-hidden'>
      <div className='flex gap-4 animate-pulse'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className='flex-shrink-0'>
            <div className='w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto' />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className='py-20 px-4'>
      <div className='max-w-4xl mx-auto animate-pulse'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg' />
          <div className='space-y-4'>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4' />
            <div className='space-y-2'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6' />
            </div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
