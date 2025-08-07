'use client';

import dynamic from 'next/dynamic';

const ClientCodeBlock = dynamic(() => import('@/components/ClientCodeBlock'), {
  ssr: false,
});

export default function ClientWrapper({ code, language }: { code: string; language: string }) {
  return <ClientCodeBlock code={code} language={language} />;
}
