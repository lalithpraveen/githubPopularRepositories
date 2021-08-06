import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {name, imageUrl, forksCount, starsCount, issuesCount} = repositoryData

  return (
    <li className="repository-card-item-container">
      <img src={imageUrl} className="card-item-image" alt={name} />
      <h1 className="card-item-heading">{name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open-issues"
        />
        <p className="stats-text">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
