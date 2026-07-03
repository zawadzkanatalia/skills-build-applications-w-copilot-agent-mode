import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('/api/workouts/');
        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Workouts</p>
            <h2 className="h4 mb-0">Suggested sessions</h2>
          </div>
          <span className="badge bg-warning-subtle text-warning">Plan</span>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading workouts...</div>
        ) : workouts.length === 0 ? (
          <p className="text-muted mb-0">No workouts are available yet.</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout, index) => (
              <div key={workout.id || workout._id || `${workout.title}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-1">{workout.title || 'Workout'}</h3>
                  <p className="text-muted mb-2">{workout.description || 'A focused fitness session.'}</p>
                  <p className="small mb-0">
                    {workout.category || 'Training'} • {workout.durationMinutes ?? '—'} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
