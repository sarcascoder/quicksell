import React from 'react'
import Header from './Header'

const MainLayout = ({data}) => {
  return (
    <div className='main-layout'>
    <Header data={data}/>
    </div>
  )
}

export default MainLayout
