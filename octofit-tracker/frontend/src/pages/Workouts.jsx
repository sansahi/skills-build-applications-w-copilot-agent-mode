import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = () => {
    setLoading(true)
    fetch(getApiUrl('workouts'))
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data.workouts || [])
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err)
        setError('Failed to load workouts')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">💪 Workouts</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text text-muted">{workout.description}</p>

                  <div className="mb-3">
                    <strong>Exercises:</strong>
                    <ul className="mb-0 mt-2">
                      {workout.exercises?.map((exercise, idx) => (
                        <li key={idx}>
                          {exercise.name} - {exercise.sets}x{exercise.reps}
                          {exercise.weight && ` @ ${exercise.weight}lbs`}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">
                        Duration: {workout.duration} min
                      </small>
                    </div>
                    <span className={`badge bg-${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && workouts.length === 0 && (
        <div className="alert alert-info">No workouts found</div>
      )}
    </div>
  )
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'beginner':
      return 'success'
    case 'intermediate':
      return 'warning'
    case 'advanced':
      return 'danger'
    default:
      return 'secondary'
  }
}
