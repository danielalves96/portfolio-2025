import { getFooterData } from '@/lib/actions/data-fetching';

export async function FooterCopyright() {
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-sm text-muted-foreground'>
      <p>{footerData.copyright}</p>
      <p>Designed By. {footerData.designer}</p>
    </div>
  );
}
