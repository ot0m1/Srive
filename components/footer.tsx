import type { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = () => {
  return (
    <footer className="mx-auto footer text-center text-xs">
      <ul
        className="flex mb-2 px-10 text-slate-200/80 font-medium border-t border-slate-100/50">
        <li className="mx-1 mt-2">
          <a href="https://github.com/ot0m1/Srive" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li className="mx-1 ml-8 mt-2">
          <a href="https://twitter.com/ot0m1" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </li>
        <li className="mx-1 ml-8 mt-2">
          <a href="https://blog.otomi.world/" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
