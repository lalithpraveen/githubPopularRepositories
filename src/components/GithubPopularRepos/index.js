import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguageFilter: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilter} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(`${apiUrl}${activeLanguageFilter}`)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        issuesCount: eachData.issues_count,
      }))

      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryList = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repository-list-container">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  clickLanguageFilter = newFilterId => {
    this.setState({activeLanguageFilter: newFilterId}, this.getRepositories)
  }

  renderLanguagesList = () => {
    const {activeLanguageFilter} = this.state

    return (
      <ul className="language-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            isActive={eachLanguage.id === activeLanguageFilter}
            languageFiltersData={eachLanguage}
            clickLanguageFilter={this.clickLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="github-app-container">
        <div className="github-popular-repo-container">
          <h1 className="github-heading">Popular</h1>
          {this.renderLanguagesList()}
          {this.renderStatusView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
