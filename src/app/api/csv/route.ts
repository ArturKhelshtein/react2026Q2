import { NextRequest, NextResponse } from 'next/server';

function escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const raw = formData.get('items') as string;

  if (!raw) {
    return new NextResponse('No items', { status: 400 });
  }

  const items = JSON.parse(raw) as {
    id: number;
    name: string;
    description: string;
  }[];

  if (!items.length) {
    return new NextResponse('Empty items', { status: 400 });
  }

  const count = items.length;
  const filename = `${String(count)}_item${count > 1 ? 's' : ''}.csv`;

  const headers = ['id', 'name', 'description', 'details_url'];
  const rows = items.map((item) => [
    item.id,
    escapeCsvValue(item.name),
    escapeCsvValue(item.description),
    `https://pokeapi.co/api/v2/pokemon/${String(item.id)}`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}