import React, { useState } from 'react'
import Results from './results'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const PageWithJSbasedForm = () => {
  const [artists, setResults] = useState([])
  const session = useSession()
  const token = session.data.token.accessToken

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  
    const data = {
      name: (event.target as HTMLFormElement).artist.value,
      token: token
    }
  
    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/search'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
  
    const response = await fetch(endpoint, options)
    const results = await response.json()

    setResults(results.data)
  }

  return (
    <div className="container mx-auto">
      <p className="text-center">Search Artists</p>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="container mx-auto mt-1 mb-4 w-[70%] md:w-[60%] md:max-w-[320px] border border-slate-100/60 bg-slate-200/10 rounded">
          <input type="text" id="name" name="artist" required className="w-[90%] pb-[1px] border-none bg-transparent focus:outline-none caret-slate-200" />
          <button type="submit" className="mt-[4px] mr-[2px] border-none bg-transparent rounded">
            <Image src='/iconmonstr-search-thin-240.png' alt='srive-logo' width={16} height={16}/>
          </button>
        </div>
      </form>
      {artists.length > 0 && <Results artists={artists} /> }
    </div>
  )
}

export default PageWithJSbasedForm
