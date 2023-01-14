import type { NextPage } from 'next'

const Error: NextPage = () => {
  return (
    <div className="mx-auto -mt-2">
      <h2 className="font-bold text-3xl">Error occurred</h2>
      <p>An error has occurred. Please try the following</p>
        <ul className="text-left list-disc pl-10">
          <li className="font-bold text-orange-600">This application is only available for Spotify premium account.</li>
          <li>Check that you are connected to the Internet and that your connection speed is not extremely slow.</li>
          <li>Log out and log in again.</li>
          <li>Check to see if Spotify is experiencing any outages.</li>
        </ul>
    </div>
  )
}

export default Error
