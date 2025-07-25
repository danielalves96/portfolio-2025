import { getToolsData } from '@/lib/actions/data-fetching';

import { ToolItem } from './tool-item';
import { ToolsHeader } from './tools-header';

export async function ToolsSection() {
  const toolsData = await getToolsData();

  if (!toolsData) {
    return null;
  }
  return (
    <section className='w-full bg-background pt-16 pb-30 px-4'>
      <div className='max-w-7xl mx-auto'>
        <ToolsHeader />

        {/* Tools Grid */}
        <div className='flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20 mt-16 px-4'>
          {toolsData.tools.map((tool, index) => (
            <ToolItem key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
