import type { AppItem } from '../types';

export function downloadSelectedAsCsv(items: AppItem[]) {
  if (!items.length) return;

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

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
