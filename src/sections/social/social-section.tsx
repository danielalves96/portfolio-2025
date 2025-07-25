import { getSocialSectionData } from '@/lib/actions/data-fetching';

import { SocialClient } from './social-client';

export async function SocialSection() {
  const socialData = await getSocialSectionData();

  if (!socialData) {
    return null;
  }

  return <SocialClient socialItems={socialData.socialItems} />;
}
