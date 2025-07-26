'use client';

import { useRouter } from 'next/navigation';

import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AdminFloatButton() {
  const router = useRouter();

  const goToAdmin = () => {
    router.push('/admin');
  };

  return (
    <Button
      onClick={goToAdmin}
      size='lg'
      className='fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
      title='Editar site'
    >
      <Settings className='h-6 w-6' />
      <span className='sr-only'>Editar site</span>
    </Button>
  );
}
