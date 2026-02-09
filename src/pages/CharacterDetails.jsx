import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE = "https://rickandmortyapi.com/api";

export default function CharacterDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/character/${id}`, {
          signal: controller.signal,
        });

        if (res.status === 404) {
          setItem(null);
          return;
        }

        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = await res.json();
        setItem(json);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  if (loading) return <p>Loading character…</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!item)
    return (
      <div>
        <p className="empty">Character not found.</p>
        <Link className="btn" to="/">
          Back to Characters
        </Link>
      </div>
    );

  return (
    <div className="details">
      <div className="detailsCard">
        <img className="detailsImg" src={item.image} alt={item.name} />

        <div className="detailsBody">
          <h2 className="detailsTitle">{item.name}</h2>

          <ul className="detailsList">
            <li>
              <b>Status:</b> {item.status}
            </li>
            <li>
              <b>Species:</b> {item.species}
            </li>
            <li>
              <b>Gender:</b> {item.gender}
            </li>
            <li>
              <b>Origin:</b> {item.origin?.name}
            </li>
            <li>
              <b>Location:</b> {item.location?.name}
            </li>
            <li>
              <b>Episodes:</b> {item.episode?.length ?? 0}
            </li>
          </ul>

          <Link className="btn" to="/">
            ← Back to Characters
          </Link>
        </div>
      </div>
    </div>
  );
}