import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemonList,
  fetchPokemonByName,
  fetchPokemonDetails,
} from '../api/pokemonApi';

const STALE_TIME = Number(import.meta.env.VITE_CACHE_STALE_TIME ?? '300000');

export const pokemonKeys = {
  all: ['pokemons'] as const,
  list: (page: number) => [...pokemonKeys.all, 'list', page] as const,
  search: (name: string) => [...pokemonKeys.all, 'search', name] as const,
  details: (id: string) => [...pokemonKeys.all, 'details', id] as const,
};

export function usePokemonList(page: number) {
  return useQuery({
    queryKey: pokemonKeys.list(page),
    queryFn: () => fetchPokemonList(page),
    staleTime: STALE_TIME,
  });
}

export function usePokemonSearch(name: string) {
  return useQuery({
    queryKey: pokemonKeys.search(name),
    queryFn: () => fetchPokemonByName(name),
    staleTime: STALE_TIME,
    enabled: name.length > 0,
  });
}

export function usePokemonDetails(id: string) {
  return useQuery({
    queryKey: pokemonKeys.details(id),
    queryFn: () => fetchPokemonDetails(id),
    staleTime: STALE_TIME,
    enabled: id.length > 0,
  });
}