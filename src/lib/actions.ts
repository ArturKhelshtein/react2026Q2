'use server';

import { redirect } from 'next/navigation';

export async function searchAction(_prevState: unknown, formData: FormData) {
  const query = formData.get('query') as string;
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    redirect('?page=1');
  }

  redirect(`?page=1&query=${encodeURIComponent(trimmed)}`);
}
