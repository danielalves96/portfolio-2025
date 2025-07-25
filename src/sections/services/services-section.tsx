import { getServicesData } from '@/lib/actions/data-fetching';

import { ServicesClient } from './services-client';

export async function ServicesSection() {
  const servicesData = await getServicesData();

  if (!servicesData) {
    return null;
  }

  return <ServicesClient services={servicesData.services} />;
}
