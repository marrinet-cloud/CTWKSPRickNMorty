import { useEffect, useMemo, useState } from "react";
import CharacterCard from "../components/CharacterCard";

const API_BASE = "https://rickandmortyapi.com/api";

export default function Characters() {
  const [data, setData] = useState([]); // current page results
  const [info, setInfo] = useState(null); // pagination info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // search + filters
  const [query, setQuery] = useState(
    () => localStorage.getItem("rnm_query") || "",
  );
  const [status, setStatus] = useState(
    () => localStorage.getItem("rnm_status") || "all",
  );
  const [species, setSpecies] = useState(
    () => localStorage.getItem("rnm_species") || "all",
  );

  // pagination
  const [page, setPage] = useState(() => {
    const saved = Number(localStorage.getItem("rnm_page"));
    return Number.isFinite(saved) && saved >= 1 ? saved : 1;
  });

  // Persist controls
  useEffect(() => localStorage.setItem("rnm_query", query), [query]);
  useEffect(() => localStorage.setItem("rnm_status", status), [status]);
  useEffect(() => localStorage.setItem("rnm_species", species), [species]);
  useEffect(() => localStorage.setItem("rnm_page", String(page)), [page]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // Fetch a page; workshop demo used ?page=.
        // Keeping it simple + fast, then filtering client-side.
        const res = await fetch(`${API_BASE}/character?page=${page}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          // Rick & Morty API returns 404 for out-of-range pages
          throw new Error(`Request failed (${res.status})`);
        }

        const json = await res.json();
        setData(json.results || []);
        setInfo(json.info || null);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [page]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return (data || []).filter((c) => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q);
      const matchesStatus = status === "all" || c.status === status;
      const matchesSpecies = species === "all" || c.species === species;
      return matchesQuery && matchesStatus && matchesSpecies;
    });
  }, [data, query, status, species]);

  const speciesOptions = useMemo(() => {
    const set = new Set((data || []).map((c) => c.species).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [data]);

  if (loading) return <p>Loading characters…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <div className="toolbar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name…"
          aria-label="Search characters"
          className="search"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="select"
        >
          <option value="all">Status: All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          aria-label="Filter by species"
          className="select"
        >
          {speciesOptions.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "Species: All" : `Species: ${s}`}
            </option>
          ))}
        </select>

        <span className="count">
          Showing <b>{filtered.length}</b> / {data.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">
          No matches on this page. Try clearing filters/search or change pages.
        </p>
      ) : (
        <div className="grid">
          {filtered.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!info?.prev || page === 1}
        >
          Prev
        </button>

        <span className="pageLabel">
          Page <b>{page}</b> {info?.pages ? `of ${info.pages}` : ""}
        </span>

        <button
          className="btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={!info?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}