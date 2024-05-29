import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className='flex flex-row m-5 items-center justify-evenly'>
      <div><FaTwitter className='text-2xl cursor-pointer text-charcoal'/></div>
      <div><FaFacebook className='text-2xl cursor-pointer text-charcoal'/></div>
      <div><FaInstagram className='text-2xl cursor-pointer text-charcoal'/></div>
      <div><FaTwitter className='text-2xl cursor-pointer text-charcoal'/></div>
    </div>
  )
}

export default SocialMedia
