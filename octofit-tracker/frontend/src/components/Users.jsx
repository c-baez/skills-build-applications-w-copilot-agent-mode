import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setUsers(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p className="text-muted">Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.id || user.email}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{user.name}</h3>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <p className="mb-1"><strong>Goal:</strong> {user.fitnessGoal}</p>
                  <p className="mb-0"><strong>Streak:</strong> {user.streak}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
