import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const data = await fetchCollection(apiUrl);
        if (isMounted) {
          setActivities(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Activities</p>
            <h2 className="h4 mb-0">Recent training activity</h2>
          </div>
          <span className="badge bg-primary-subtle text-primary">Live</span>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading activities...</div>
        ) : activities.length === 0 ? (
          <p className="text-muted mb-0">No activities are available yet.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {activities.map((activity, index) => (
              <li
                key={activity.id || activity._id || `${activity.type}-${index}`}
                className="list-group-item px-0"
              >
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <h3 className="h6 mb-1">{activity.type || 'Activity'}</h3>
                    <p className="mb-0 text-muted">
                      {activity.user?.name || activity.userName || 'Unknown user'} •{' '}
                      {activity.durationMinutes ?? '—'} minutes
                    </p>
                  </div>
                  <small className="text-muted">
                    {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Recent'}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Activities;
