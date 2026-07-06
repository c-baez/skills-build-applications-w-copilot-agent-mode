import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setEntries(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p className="text-muted">Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.rank}>
              <div>
                <strong>#{entry.rank}</strong> {entry.user?.name || 'Unknown user'}
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
