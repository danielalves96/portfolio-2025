export function HeroBackground() {
  return (
    <div className='absolute inset-0'>
      <div className='absolute top-20 left-10 w-32 h-32 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-xl animate-pulse-slow' />
      <div className='absolute top-40 right-20 w-24 h-24 bg-orange-300/20 dark:bg-orange-400/8 rounded-full blur-xl animate-pulse-slower' />
      <div className='absolute bottom-40 left-20 w-40 h-40 bg-orange-100/40 dark:bg-orange-600/12 rounded-full blur-xl animate-pulse-slowest' />
      <div className='absolute bottom-20 right-10 w-28 h-28 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-xl animate-pulse-slowest' />
    </div>
  );
}
