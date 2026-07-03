import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const data = await fetchCollection('/api/teams/');
        if (isMounted) {
          setTeams(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Teams</p>
            <h2 className="h4 mb-0">Community squads</h2>
          </div>
          <span className="badge bg-info-subtle text-info">Ready</span>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading teams...</div>
        ) : teams.length === 0 ? (
          <p className="text-muted mb-0">No teams have been created yet.</p>
        ) : (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div key={team.id || team._id || `${team.name}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-1">{team.name || 'Team'}</h3>
                  <p className="text-muted mb-2">{team.sport || 'Fitness'}</p>
                  <p className="small mb-0">
                    Captain: {team.captain?.name || 'TBD'} • Members:{' '}
                    {Array.isArray(team.members) ? team.members.length : 0}
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

export default Teams;
