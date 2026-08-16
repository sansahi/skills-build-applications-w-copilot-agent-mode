import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = () => {
    setLoading(true)
    fetch(getApiUrl('leaderboard'))
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.leaderboard || [])
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err)
        setError('Failed to load leaderboard')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">🏆 Leaderboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Points</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id}>
                  <td>
                    <strong>{index + 1}</strong> {getMedalEmoji(index)}
                  </td>
                  <td>{entry.username}</td>
                  <td>
                    <strong>{entry.totalPoints}</strong>
                  </td>
                  <td>{entry.totalActivities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && leaderboard.length === 0 && (
        <div className="alert alert-info">No leaderboard data found</div>
      )}
    </div>
  )
}

function getMedalEmoji(index) {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return ''
}
