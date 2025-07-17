import { DUB_CLIPS } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';
import { performance } from 'node:perf_hooks';

export async function GET(req: NextRequest, context: { params: { lang: string } }) {
  const { lang } = context.params;
  const start = performance.now();
  while (performance.now() - start < 2000) {}
  return NextResponse.json({ clips: DUB_CLIPS[lang] });
}
