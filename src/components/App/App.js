import React from 'react'
import { Input, Tabs, Alert } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import { Offline, Online } from 'react-detect-offline'
import _ from 'lodash'
import MovieDataContext from '../MovieDataContext'
import MovieList from '../MovieList'
import MovieDBService from '../../services/MovieDBService'
import GlobalError from '../GlobalError'
import Pagination from '../Pagination'

class App extends React.Component {
  movieDBService = new MovieDBService()

  constructor(props) {
    super(props)
    this.state = {
      moviesData: [],
      loading: true,
      error: false,
      totalResults: 20,
      searchPhrase: 'return',
      currentPage: 1,
      globalError: false,
      ratedMovies: [],
      genres: [],
      loadingRated: true,
    }
  }

  componentDidMount() {
    const { searchPhrase, currentPage } = this.state
    this.updateState(currentPage, searchPhrase)
    this.movieDBService.getGenres().then((res) => this.setState({ genres: res }))
  }

  componentDidCatch() {
    this.setState({ globalError: true })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getRatedFilms = (page) => {
    const keys = []
    for (let i = 20 * (page - 1); i < page * 20; i += 1) {
      if (localStorage.key(i)) {
        keys.push(localStorage.key(i))
      }
    }
    this.setState({ loadingRated: true })
    Promise.all(keys.map((key) => this.movieDBService.getMovie(key)))
      .then((res) => this.setState({ ratedMovies: res, loadingRated: false }))
      .catch(this.onError)
  }

  onChange = (num, id) => {
    localStorage.setItem(id, num)
    this.getRatedFilms(1)
  }

  setTotalResults = (array) => {
    if (array.results.length) {
      this.setState({ totalResults: array.total_results })
      return array.results
    }
    this.setState({ totalResults: 0 })
    return []
  }

  changePageRated = (page) => {
    this.getRatedFilms(page)
  }

  searchFilms = (e) => {
    const { value } = e.target
    this.setState({ loading: true })
    if (value) {
      this.updateState(1, value)
      this.setState({
        searchPhrase: value,
        currentPage: 1,
      })
    } else {
      this.setState({
        moviesData: [],
        loading: false,
        totalResults: 20,
      })
    }
  }

  changePage = (page) => {
    const { searchPhrase } = this.state
    this.setState({ loading: true, currentPage: page })
    this.updateState(page, searchPhrase)
  }

  updateState = (page, phrase) => {
    this.setState({ loading: true })
    this.movieDBService
      .searchFilms(page, phrase)
      .then((res) => this.setTotalResults(res))
      .then((res) => {
        this.setState({
          moviesData: res,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  changeTab = (key) => {
    if (key === '2') {
      this.getRatedFilms(1)
    }
  }

  render() {
    const { moviesData, loading, error, totalResults, currentPage, globalError, ratedMovies, genres, loadingRated } =
      this.state
    if (globalError) {
      return <GlobalError />
    }
    const content =
      !moviesData.length && !loading ? (
        <Alert
          message="Ooops, nothing found, start new search"
          type="warning"
          showIcon
        />
      ) : (
        <MovieList
          moviesData={moviesData}
          error={error}
          loading={loading}
        />
      )

    const search = (
      <>
        <div className="movies__search">
          <Input
            placeholder="Type to search..."
            onChange={_.debounce(this.searchFilms, 300)}
          />
        </div>
        {content}
        <Pagination
          current={currentPage}
          total={totalResults}
          onChange={this.changePage}
        />
      </>
    )

    const rated = (
      <>
        <MovieList
          moviesData={ratedMovies}
          loading={loadingRated}
          error={false}
        />
        <Pagination
          total={localStorage.length}
          onChange={this.changePageRated}
        />
      </>
    )

    const items = [
      {
        label: 'Search',
        key: '1',
        children: search,
      },
      {
        label: 'Rated',
        key: '2',
        children: rated,
      },
    ]

    const onChangeRated = this.onChange
    return (
      <div className="movies">
        <MovieDataContext.Provider
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          value={{
            genres,
            onChangeRated,
          }}
        >
          <Online>
            <div className="movies__container">
              <div className="movies__tabs">
                <Tabs
                  onChange={this.changeTab}
                  defaultActiveKey="1"
                  items={items}
                  destroyInactiveTabPane
                />
              </div>
            </div>
          </Online>
        </MovieDataContext.Provider>
        <Offline>
          <div className="movies__offline">Oops, you are offline. Check your internet connection</div>
        </Offline>
      </div>
    )
  }
}

export default App
