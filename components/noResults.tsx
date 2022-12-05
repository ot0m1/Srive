import type { NextPage } from 'next'
import Image from 'next/image'

const NoResults: NextPage = () => {
  return (
    <div className="mx-auto -mt-2">
      <h2 className="font-bold text-3xl">oops!</h2>
      <Image
        src='/iconmonstr-smiley-24-240.png'
        alt='No Results Image'
        width={160}
        height={160}
        className="mx-auto opacity-70 my-6"
      />
      <p>Artist not found. Please try searching for other names.</p>
    </div>
  )
}

export default NoResults
