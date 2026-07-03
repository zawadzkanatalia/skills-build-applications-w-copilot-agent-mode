import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const data = await fetchCollection(apiUrl);
        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Users</p>
            <h2 className="h4 mb-0">Members overview</h2>
          </div>
          <span className="badge bg-secondary-subtle text-secondary">Members</span>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading users...</div>
        ) : users.length === 0 ? (
          <p className="text-muted mb-0">No users have been added yet.</p>
        ) : (
          <div className="row g-3">
            {users.map((user, index) => (
              <div key={user.id || user._id || `${user.email}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-1">{user.name || 'Member'}</h3>
                  <p className="mb-1 text-muted">{user.email || 'No email provided'}</p>
                  <p className="small mb-0">
                    {user.city || 'Unknown city'} • {user.fitnessGoal || 'General fitness'}
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

export default Users;
