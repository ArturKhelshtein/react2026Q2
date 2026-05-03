import { Component } from 'react'
import './App.css'

type PokemonItem = {
  name: string
  description: string
}

type AppProps = Record<string, never>
type AppState = Record<string, never>

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <form className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Search pokemon by name"
            />
            <button className="search__button" type="button">
              Search
            </button>
          </form>
        </header>

        <main className="app__main">
          <section className="results">
            <div className="results__header">
              <h2 className="results__title">Results</h2>
              <button type="button" className="results__button">
                Test Error
              </button>
            </div>

            <ul className="results__list">
              <li className="item">
                <h3>bulbasaur</h3>
                <p>Pokemon description</p>
              </li>
              <li className="item">
                <h3>ivysaur</h3>
                <p>Pokemon description</p>
              </li>
            </ul>
          </section>
        </main>
      </div>
    )
  }
}

export default App