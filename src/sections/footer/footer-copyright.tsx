import { getFooterData } from '@/lib/actions/data-fetching';

export async function FooterCopyright() {
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground px-4'>
      <p className='text-center sm:text-left'>{footerData.copyright}</p>
      <p className='text-center sm:text-right'>
        Designed By. {footerData.designer}
      </p>
    </div>
  );
}
