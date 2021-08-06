import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFiltersData, clickLanguageFilter} = props
  const btnClassname = isActive ? `language-btn active-btn` : `language-btn`
  const onClickLanguage = () => {
    clickLanguageFilter(languageFiltersData.id)
  }

  return (
    <li>
      <button type="button" className={btnClassname} onClick={onClickLanguage}>
        {languageFiltersData.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
