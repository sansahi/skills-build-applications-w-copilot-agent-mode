import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = () => {
    setLoading(true)
    fetch(getApiUrl('activities'))
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.activities || [])
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching activities:', err)
        setError('Failed to load activities')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">📊 Activities</h1>

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
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Intensity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.distance ? `${activity.distance} km` : '—'}</td>
                  <td>{activity.calories ? activity.calories : '—'}</td>
                  <td>
                    <span className={`badge bg-${getIntensityColor(activity.intensity)}`}>
                      {activity.intensity}
                    </span>
                  </td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && activities.length === 0 && (
        <div className="alert alert-info">No activities found</div>
      )}
    </div>
  )
}

function getIntensityColor(intensity) {
  switch (intensity) {
    case 'low':
      return 'info'
    case 'moderate':
      return 'warning'
    case 'high':
      return 'danger'
    default:
      return 'secondary'
  }
}
