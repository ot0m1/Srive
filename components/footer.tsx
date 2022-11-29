import type { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = () => {
  return (
    <footer className="mx-auto footer text-center text-sm">
      <ul className="flex mb-4 text-slate-200/80 font-medium">
        <li className="mx-1">
          <a href="https://github.com/ot0m1/Srive" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li className="mx-1 ml-5">
          <a href="https://twitter.com/ot0m1" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </li>
        <li className="mx-1 ml-5">
          <a href="https://blog.otomi.world/" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
