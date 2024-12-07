import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const renderSortByList = () => {
    const {sortbyOptions, activeOptionId, changeSortby} = props

    return (
      <select
        className="categories-list search-input"
        value={activeOptionId}
        onChange={event => changeSortby(event.target.value)}
      >
        {sortbyOptions.map(eachOption => (
          <option
            className="category-items"
            key={eachOption.optionId}
            value={eachOption.optionId}
          >
            {eachOption.displayText}
          </option>
        ))}
      </select>
    )
  }

  const renderRatingsFiltersList = () => {
    const {ratingsList, changeRating} = props

    return (
      <select
        className="categories-list search-input"
        onChange={event => changeRating(event.target.value)}
      >
        {ratingsList.map(rating => (
          <option
            className="category-items"
            value={rating.ratingId}
            key={rating.ratingId}
          >
            Above {rating.ratingId} Rating
          </option>
        ))}
      </select>
    )
  }

  const renderCategoriesList = () => {
    const {categoryOptions, changeCategory} = props

    return (
      <select
        className="categories-list search-input"
        onChange={event => changeCategory(event.target.value)}
      >
        {categoryOptions.map(category => (
          <option
            className="category-items"
            value={category.categoryId}
            key={category.categoryId}
          >
            {category.name}
          </option>
        ))}
      </select>
    )
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-container categories-list">
        <div>
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyDown={onEnterSearchInput}
          />
        </div>
        <div>
          <BsSearch className="search-icon" />
        </div>
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <div className="filters-group-container">
      <div>
        <h1 className="category-heading">Search</h1>
        {renderSearchInput()}
      </div>
      <div>
        <h1 className="category-heading">SortBy</h1>
        {renderSortByList()}
      </div>
      <div>
        <h1 className="category-heading">Category</h1>
        {renderCategoriesList()}
      </div>
      <div>
        <h1 className="category-heading">Rating</h1>
        {renderRatingsFiltersList()}
      </div>
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
