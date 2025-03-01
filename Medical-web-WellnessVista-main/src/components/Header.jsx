import React from 'react'
import Home from './Home'
import About from './About'
import Services from './Services'
import Doctors from './Doctors'
import Blogs from './Blogs'
import Footer from './Footer'
import Navbar from './Navbar'
import BookAppointment from './BookAppointment'

export const Header = () => {
  return (
    <div>
      
  <Navbar/>
  <Home/>
  <About/>
  <Services/>
  <Doctors/>
  <Blogs/>
  <Footer/>
  
    </div>
  )
}
