import type { AppItem } from '../types';

const API_URL = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 20;

export interface FetchResult {
  items: AppItem[];
  totalCount: number | null;
}

export interface PokemonDetailsData {
  name: string;
  spriteUrl: string | null;
}

class ApiError extends Error {
    status: number;
  
    constructor(message: string, status: number) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
  }

function handleErrorStatus(status: number): never {
  if (status === 400) {
    throw new ApiError('Invalid search request', status);
  }
  if (status === 404) {
    throw new ApiError('Pokemon not found', status);
  }
  if (status >= 500) {
    throw new ApiError('Server error, please try again later', status);
  }
  throw new ApiError('Failed to load data', status);
}

export async function fetchPokemonList(page: number): Promise<FetchResult> {
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * PAGE_SIZE;

  const response = await fetch(
    `${API_URL}/pokemon?limit=${String(PAGE_SIZE)}&offset=${String(offset)}`
  );

  if (!response.ok) {
    handleErrorStatus(response.status);
  }

  const list = (await response.json()) as {
    count: number;
    results: { name: string; url: string }[];
  };

  const items = await Promise.all(
    list.results.map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      if (!detailsResponse.ok) {
        handleErrorStatus(detailsResponse.status);
      }
      const details = (await detailsResponse.json()) as {
        id: number;
        name: string;
        height: number;
        weight: number;
      };
      return {
        id: details.id,
        name: details.name,
        description: `Height: ${String(details.height)}, Weight: ${String(details.weight)}`,
      };
    })
  );

  return { items, totalCount: list.count };
}

export async function fetchPokemonByName(name: string): Promise<FetchResult> {
  const response = await fetch(`${API_URL}/pokemon/${name}`);

  if (!response.ok) {
    handleErrorStatus(response.status);
  }

  const details = (await response.json()) as {
    id: number;
    name: string;
    height: number;
    weight: number;
  };

  return {
    items: [
      {
        id: details.id,
        name: details.name,
        description: `Height: ${String(details.height)}, Weight: ${String(details.weight)}`,
      },
    ],
    totalCount: null,
  };
}

export async function fetchPokemonDetails(
  id: string
): Promise<PokemonDetailsData> {
  const response = await fetch(`${API_URL}/pokemon/${id}`);

  if (!response.ok) {
    handleErrorStatus(response.status);
  }

  const data = (await response.json()) as {
    name: string;
    sprites: {
      other: {
        dream_world: { front_default: string | null };
      };
    };
  };

  return {
    name: data.name,
    spriteUrl: data.sprites.other.dream_world.front_default,
  };
}
