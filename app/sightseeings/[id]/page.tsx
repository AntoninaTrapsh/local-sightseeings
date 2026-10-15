import { mockSights } from '../_data';
import { SightseeingDetail } from './SightseeingDetail';

export const dynamicParams = false;

export function generateStaticParams() {
  return mockSights.map(({ id }) => ({ id }));
}

export default function SightseeingDetailPage() {
  return <SightseeingDetail />;
}
