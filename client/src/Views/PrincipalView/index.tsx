import React from 'react'
import InputMovement from '../../components/InputMovement'
import ThinkingSection from './ThinkingSection'

const HomeView = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-6">
          <InputMovement />
        </div>
        <div className="col">
          <ThinkingSection />
        </div>
      </div>
    </div>
  )
}

export default HomeView