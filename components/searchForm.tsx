import React, { useState } from 'react'
import Results from './results'
import NoResults from './noResults'
import Error from './error'
import Image from "next/legacy/image";
import { useSession } from 'next-auth/react'

const PageWithJSbasedForm = () => {
  const [artists, setArtists] = useState([])
  const [searching, setSearching] = useState(false)
  const [status, setStatus] = useState(true)
  const [userProduct, setUserProduct] = useState('')
  const session: any = useSession()
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

    if (response.status != 200) {
      setStatus(false)
      return
    }

    setSearching(true)
    setArtists(results.data)
  }

  if (session && session.status != 'loading') {
    const data = {
      token: token
    }
  
    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/user'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
  
    fetch(endpoint, options).then((response) => {
      return response.json()
    }).then((response) => {
      setUserProduct(response.data.product)
    })
  }
  
  const isPremium = () => {
    return userProduct === 'premium' ? true : false
  }

  return (
    <div className="container mx-auto">
      { !status || !isPremium() && <Error /> }
      { status && isPremium() &&
        <form onSubmit={handleSubmit} className="text-center">
          <div className="container mx-auto mt-1 mb-8 w-[70%] md:w-[60%] md:max-w-[320px]
            border border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/30 hover:border-slate-100 hover:text-slate-50">
            <input
              type="text"
              id="name"
              name="artist"
              required
              placeholder="Search Artists"
              className="w-[90%] pl-[5px] pb-[2px] border-none bg-transparent caret-slate-200 focus:outline-none"
            />
            <button
              type="submit"
              title="Click this button to search for an artist"
              className="mt-[6px] pb-[5px] pr-[5px] border-none bg-transparent rounded"
            >
              <Image
                src='/iconmonstr-search-thin-240.png'
                alt='srive-logo'
                width={16}
                height={16}
              />
            </button>
          </div>
        </form>
      }
      { status && isPremium() && searching && artists.length > 0 && <Results artists={artists} /> }
      { status && isPremium() && searching && artists.length === 0 && <NoResults /> }
    </div>
  )
}

export default PageWithJSbasedForm
