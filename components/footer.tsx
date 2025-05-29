import type { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = () => {
  return (
    <footer className="mx-auto mt-8 footer text-center text-xs">
      <ul
        className="flex mb-2 px-10 text-slate-200/80 font-medium border-t border-slate-100/30"
      >
        <li className="mx-1 mt-2 md:mx-3 md:my-4 md:pl-8">
          <a href="https://github.com/ot0m1/Srive" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li className="mx-1 ml-9 mt-2 md:ml-12 md:my-4">
          <a href="https://x.com/ot0m1" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </li>
        <li className="mx-1 ml-9 mt-2 md:ml-12 md:my-4">
          <a href="https://blog.otomi.world/" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </li>
        <li className="mx-1 ml-9 mt-2 md:ml-12 md:my-4 md:pr-12">
          <Link href="/userPolicy">
            Policy
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
