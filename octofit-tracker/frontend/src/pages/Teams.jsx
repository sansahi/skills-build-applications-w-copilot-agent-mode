import { useEffect, useState } from 'react'

export default function Teams({ apiUrl }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTeams()
  }, [apiUrl])

  const fetchTeams = () => {
    setLoading(true)
    fetch(`${apiUrl}/api/teams`)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams || [])
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching teams:', err)
        setError('Failed to load teams')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">🏢 Teams</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <div className="mb-3">
                    <strong>Members:</strong> {team.members?.length || 0}
                  </div>
                  <small className="text-muted">
                    Joined {new Date(team.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && teams.length === 0 && (
        <div className="alert alert-info">No teams found</div>
      )}
    </div>
  )
}
