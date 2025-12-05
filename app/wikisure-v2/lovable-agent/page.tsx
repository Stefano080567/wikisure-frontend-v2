import dynamic from 'next/dynamic';

const LovableGPTAgentTemplate = dynamic(() => import('@/components/LovableGPTAgentTemplate'), { ssr: false });

export default function Page() {
  return <LovableGPTAgentTemplate />;
}
