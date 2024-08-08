import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className='min-h-screen custom__container flex__center'>
      <div className='text-center space-y-3'>
        <h1 className='text-8xl'>404</h1>
        <p>Page Not Found</p>
        <div>
          <Link to='/'>
            <button className='bg-black text-white px-5 py-2 rounded-lg'>Go Back</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage