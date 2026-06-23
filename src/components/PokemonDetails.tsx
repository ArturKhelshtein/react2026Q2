import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './PokemonDetails.css';
import { usePokemonDetails } from '../hooks/usePokemonQueries';
import Image from 'next/image';

export default function PokemonDetails() {
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') ?? '1';

  const { data, isLoading, error } = usePokemonDetails(detailsId ?? '');

  return (
    <div className="details-panel">
      <button
        className="button"
        type="button"
        onClick={() => {
          void navigate(`/?page=${page}`);
        }}
      >
        Close
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error instanceof Error ? error.message : 'Unknown error'}</p>}
      {!isLoading && !error && data && (
        <>
          {data.spriteUrl && (
            <Image
              src={data.spriteUrl}
              alt={data.name}
              className="details-sprite"
              width={200}
              height={200}
            />
          )}
          <h2>{data.name}</h2>
        </>
      )}
    </div>
  );
}