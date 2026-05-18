import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './PokemonDetails.css';

const API_URL = 'https://pokeapi.co/api/v2';

export default function PokemonDetails() {
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') ?? '1';

  const [spriteUrl, setSpriteUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    let active = true;

    if (!detailsId) {
      return;
    }

    void fetch(`${API_URL}/pokemon/${detailsId}`)
      .then((r) => r.json())
      .then(
        (data: {
          name: string;
          sprites: {
            other: {
              dream_world: { front_default: string | null };
            };
          };
        }) => {
          if (active) {
            setName(data.name);
            setSpriteUrl(data.sprites.other.dream_world.front_default ?? '');
          }
        }
      )
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      setName('');
      setSpriteUrl('');
    };
  }, [detailsId]);

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {spriteUrl && (
            <img
              src={spriteUrl}
              alt={name}
              className="details-sprite"
              width={200}
              height={200}
            />
          )}
          <h2>{name}</h2>
        </>
      )}
    </div>
  );
}
