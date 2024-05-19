import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [quotes, setQuotes] = useState([])
  useEffect(() => {

     axios.get('/api/quotes')
      .then((res) => {
        setQuotes(res.data)
        console.log(res.data)
        console.log(quotes.length)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div>
        <h1>Welcome to Quotes page of frontend side</h1>
        {
          
          quotes.map(({quote, author, id})=> (
            <div key={id}>
              {console.log("printed : ", quote)}
              <h2>{quote}</h2>
              <p>~{author}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
