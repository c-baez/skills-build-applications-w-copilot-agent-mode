import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setTeams(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p className="text-muted">Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.id || team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{team.name}</h3>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-1"><strong>Members:</strong> {team.members?.length || 0}</p>
                  <p className="mb-0"><strong>Captain:</strong> {team.captain?.name || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
