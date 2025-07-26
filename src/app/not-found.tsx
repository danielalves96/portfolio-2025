import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>404 - Página não encontrada</h1>
        <p className='text-muted-foreground mb-6'>
          A página que você procura não existe.
        </p>
        <Link
          href='/'
          className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90'
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
