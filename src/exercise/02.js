// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialValue = '') {
  const readFromLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
  const writeToLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

  const [value, setValue] = React.useState(
    () => readFromLocalStorage(key) ?? initialValue,
  )

  React.useEffect(() => { writeToLocalStorage(key, value) }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
