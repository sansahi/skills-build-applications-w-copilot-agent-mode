import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    setLoading(true)
    fetch(getApiUrl('users'))
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || [])
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching users:', err)
        setError('Failed to load users')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">👥 Users</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h5 className="card-title mb-0">{user.username}</h5>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                  <p className="card-text">{user.bio}</p>
                  <small className="text-muted">Joined {new Date(user.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className="alert alert-info">No users found</div>
      )}
    </div>
  )
}
