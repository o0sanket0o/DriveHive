import React from 'react'
import DotLoader from 'react-spinners/DotLoader'

const Loader = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <DotLoader />
    </div>
  )
}

export default Loader