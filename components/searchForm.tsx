import React, { useState } from 'react'
import Results from './results'
import NoResults from './noResults'
import Error from './error'
import Image from "next/image";
import { useSession } from 'next-auth/react'

const PageWithJSbasedForm = () => {
  const [artists, setArtists] = useState([])
  const [searching, setSearching] = useState(false)
  const [status, setStatus] = useState(true)
  const [dedupe, setDedupe] = useState(true)
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

  return (
    <div className="container mx-auto">
      { status &&
        <form onSubmit={handleSubmit} className="text-center">
          <div className="container mx-auto mt-1 mb-3 flex items-center gap-[4px] px-[5px] py-[3px]
            w-[70%] md:w-[60%] md:max-w-[320px]
            border border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/30 hover:border-slate-100 hover:text-slate-50">
            <input
              type="text"
              id="name"
              name="artist"
              required
              placeholder="Search Artists"
              className="min-w-0 flex-1 border-none bg-transparent caret-slate-200 focus:outline-none focus:bg-transparent"
            />
            <button
              type="submit"
              title="Click this button to search for an artist"
              className="flex shrink-0 border-none bg-transparent rounded"
            >
              <Image
                src='/iconmonstr-search-thin-240.png'
                alt='srive-logo'
                width={16}
                height={16}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </button>
          </div>
        </form>
      }
      { status &&
        <div className="text-center mb-4">
          <p className="mb-[6px] text-sm">
            Same song released as a single again and again
          </p>
          <span className="relative inline-flex rounded-full border border-slate-100/25 bg-slate-200/5 p-[2px]">
            <span
              className={`absolute top-[2px] h-[calc(100%-4px)] w-[70px] rounded-full bg-slate-200/25
                transition-transform duration-200 ${dedupe ? 'translate-x-0' : 'translate-x-[70px]'}`}
            />
            {[{'value': true, 'name': 'Skip'}, {'value': false, 'name': 'Keep'}].map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setDedupe(item.value)}
                className={`relative w-[70px] rounded-full py-[3px] text-[13px] ${dedupe === item.value
                  ? 'font-semibold text-slate-50'
                  : 'opacity-50 hover:opacity-80'}`}
              >
                {item.name}
              </button>
            ))}
          </span>
        </div>
      }
      { status && searching && artists.length > 0 && <Results artists={artists} dedupe={dedupe} /> }
      { status && searching && artists.length === 0 && <NoResults /> }
      { !status && <Error /> }
    </div>
  );
}

export default PageWithJSbasedForm
