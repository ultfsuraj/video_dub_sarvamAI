import { SCRIPT_CLIPS } from '@/utils/constants';
import { NextResponse } from 'next/server';
import { performance } from 'node:perf_hooks';

export async function GET() {
  const start = performance.now();
  while (performance.now() - start < 6000) {}
  return NextResponse.json({ clips: SCRIPT_CLIPS });
}
