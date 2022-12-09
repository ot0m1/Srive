import type { NextPage } from 'next'

const Loading: NextPage = () => {
  return (
    <button
    type="button"
    className="w-[260px] py-4 mt-5 px-1 border border-slate-100/60 bg-slate-200/10 rounded"
    disabled>
      {/* <svg className="animate-spin h-5 w-5 m-0 p-0" viewBox="0 0 0 0">
      </svg> */}
      Creating...
    </button>
  )
}

export default Loading
