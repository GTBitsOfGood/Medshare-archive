import React from 'react';
import Suggestion from './Suggestion';
import Filter from './Filter';
import SearchResult from './SearchResult';

class SearchBar extends React.Component {
  static clearSearchBar() {
    const searchBar = document.querySelector('.search-form');
    searchBar.value = '';
    searchBar.focus();
  }

  constructor(props) {
    super(props);
    this.state = {
      isSearch: true,
      suggestions: [],
      filters: [],
      results: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onClickCross = this.onClickCross.bind(this);
    this.onClickSuggestion = this.onClickSuggestion.bind(this);
    this.onClickCrossFilter = this.onClickCrossFilter.bind(this);
  }

  onChange(e) {
    const { target } = e;
    const isSearch = target.value === '';
    const URL = `http://localhost:5000/api/autocomplete?q=${target.value}`;

    fetch(URL)
      .then(res => res.json())
      .then(data => {
        const suggestions = isSearch ? [] : data;
        this.setState({
          isSearch,
          suggestions,
        });
      });
  }

  onClickCross() {
    this.setState({
      isSearch: true,
      suggestions: [],
      filters: [],
    });
    SearchBar.clearSearchBar();
  }

  onClickSuggestion(e) {
    const { filters } = this.state;
    filters.push(e.target.innerHTML);
    this.setState({
      isSearch: true,
      filters,
      suggestions: [],
    });
    SearchBar.clearSearchBar();
    this.search(filters);
  }

  onClickCrossFilter(e) {
    const filterText = e.target.parentNode.innerText.trim();
    let { filters } = this.state;
    filters = filters.filter(filter => filter !== filterText);
    this.setState({
      filters,
    });
    this.search(filters);
  }

  search(filters) {
    if (filters.length === 0) {
      this.setState({
        results: [],
      });
    } else {
      const queryString = filters.reduce((acc, s) => {
        return `${s} ${acc}`;
      });
      const URL = `http://localhost:5000/api/search?q=${queryString}`;
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          this.setState({
            results: data,
          });
        });
    }
  }

  render() {
    const { isSearch, suggestions, filters, results } = this.state;

    return (
      // makeshift class to center search bar; CHANGE after discussion with jon
      <div className="search-container">
        <div className="search-banner">
          <h2>Paamayim Nekudotayim</h2>
        </div>
        <div className="search-wrap">
          <input className="search-form" onChange={this.onChange} />
          {isSearch ? (
            <i className="search-btn fa fa-search" />
          ) : (
            <i className="search-btn fa fa-times" onClick={this.onClickCross} />
          )}
          <div className="filters">
            {filters.map(filter => (
              <Filter val={filter} onClickCross={this.onClickCrossFilter} />
            ))}
          </div>
          <div className="suggestions">
            {suggestions.map(suggestion => (
              <Suggestion
                key={suggestion.id}
                val={suggestion.Word}
                onClick={this.onClickSuggestion}
              />
            ))}
          </div>
          <div className="results">
            {results.map(result => (
              <SearchResult key={result.ProductID} val={result.ProductName} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
