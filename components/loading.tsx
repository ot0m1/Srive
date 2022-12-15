import type { NextPage } from 'next'

const Loading: NextPage = () => {
  return (
    <button
    type="button"
    className="w-[260px] py-4 mt-5 px-1 border border-slate-100/60 bg-slate-200/10 rounded"
    disabled>
      Creating...
    </button>
  )
}

export default Loading
