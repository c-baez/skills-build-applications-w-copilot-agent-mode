import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setActivities(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p className="text-muted">Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.id || activity.type}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{activity.type}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes} min</p>
                  <p className="mb-1"><strong>Calories:</strong> {activity.caloriesBurned}</p>
                  <p className="mb-0"><strong>Completed:</strong> {new Date(activity.completedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Activities;
