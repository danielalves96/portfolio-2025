import { getToolsData } from '@/lib/actions/data-fetching';

import { ToolItem } from './tool-item';
import { ToolsHeader } from './tools-header';

export async function ToolsSection() {
  const toolsData = await getToolsData();

  if (!toolsData) {
    return null;
  }
  return (
    <section className='w-full bg-background pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-30 px-4'>
      <div className='max-w-7xl mx-auto'>
        <ToolsHeader />

        {/* Tools Grid */}
        <div className='flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 mt-8 sm:mt-12 lg:mt-16 px-2 sm:px-4'>
          {toolsData.tools.map((tool, index) => (
            <ToolItem key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
