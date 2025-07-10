import React from 'react'
import { MyClock } from './__components/clock'
import TableDisplay from './__components/Table'



const Page = () => {
  return (
    <>
      <div className='flex items-center justify-evenly'>
        <div>
          <p className='text-4xl'>
            Sessions
          </p>
          <p>
            Start a New Session 
          </p>
        </div>
           <MyClock/>
      </div>
      <div>
       <TableDisplay/>
      </div>
     
    </>
  )
}

export default Page