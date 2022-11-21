import type { NextPage } from 'next'

const Footer: NextPage = () => {
  return (
    <footer className="mx-auto footer text-center text-xs">
      <ul className="flex mb-3 text-slate-200/80 font-medium">
        <li className="mx-1">GitHub</li>
        <li className="mx-1">Twitter</li>
        <li className="mx-1">Blog</li>
      </ul>
    </footer>
  )
}

export default Footer
