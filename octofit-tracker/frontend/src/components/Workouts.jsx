import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p className="text-muted">Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.id || workout.title}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{workout.title}</h3>
                  <p className="mb-1">{workout.description}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-0"><strong>Target:</strong> {workout.targetArea}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
