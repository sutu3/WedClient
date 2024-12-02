import React from 'react'
import Test from '../../Test'
import List from './List'
import Footer from "./Footer.jsx";
const index = () => {
  return (
    <div className='flex flex-col w-full'>
      <Test/>
{/*
      <Category/>
*/}
      <List/>
     <Footer/>
      {/* <ToastComponent/> */}
    </div>
  )
}

export default index
