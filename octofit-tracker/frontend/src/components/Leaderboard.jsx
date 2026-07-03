import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection(apiUrl);
        if (isMounted) {
          setEntries(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Leaderboard</p>
            <h2 className="h4 mb-0">Top performers</h2>
          </div>
          <span className="badge bg-success-subtle text-success">Updated</span>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading leaderboard...</div>
        ) : entries.length === 0 ? (
          <p className="text-muted mb-0">No leaderboard entries yet.</p>
        ) : (
          <ol className="list-group list-group-numbered">
            {entries.map((entry, index) => (
              <li
                key={entry.id || entry._id || `${entry.rank || index + 1}-${index}`}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div>
                  <div className="fw-semibold">{entry.user?.name || 'Unknown user'}</div>
                  <div className="text-muted">Streak: {entry.streak ?? '—'}</div>
                </div>
                <span className="badge bg-primary">{entry.score ?? 0}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
