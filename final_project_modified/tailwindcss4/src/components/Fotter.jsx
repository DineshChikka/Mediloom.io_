import React from 'react'
import { assets } from '../assets/asserts'
import GSAPcomponent from './GSAPcomponent'

const Fotter = () => {
  return (
    <>
    <GSAPcomponent />
    <div className='h-full w-full bg-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
        <div className='bg-black mt-0.5'>
      <footer
            className="mt-auto flex w-full place-content-around gap-3 p-[5%] px-[10%] text-white max-md:flex-col"
        >
            <div
                className="flex h-full w-[250px] flex-col place-items-center gap-6 max-md:w-full"
            >
                <img
                    src={assets.logo}
                    alt="logo"
                    srcSet=""
                    className="max-w-[120px]"
                />
                <div>
                    MVSR colleg,Nadergul
                    <br />
                    Hyderabad,501510
                    <br />
                    Telengana,India
                </div>
                <div className="mt-3 text-lg font-semibold">Follow us</div>
                <div className="flex gap-4 text-2xl">
                    <a href="" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a
                        href="https://twitter.com/@pauls_freeman"
                        aria-label="Twitter"
                    >
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a
                        href="https://instagram.com/"
                        className="h-[40px] w-[40px]"
                        aria-label="Instagram"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="flex h-full w-[250px] flex-col gap-4">
                <h2 className="text-3xl max-md:text-xl">Quick links</h2>
                <div className="flex flex-col gap-3 max-md:text-sm">
                    <a href="" className="footer-link">Home</a>
                    <a href="" className="footer-link">About us</a>
                    <a href="" className="footer-link">Contact us</a>
    
                </div>
            </div>

            <div className="flex h-full w-[250px] flex-col gap-4">
                <h2 className="text-3xl max-md:text-xl">Resources</h2>
                <div className="flex flex-col gap-3 max-md:text-sm">
                    <a href="" className="footer-link">About us</a>
                    <a href="" className="footer-link">FAQ</a>
                    <a href="" className="footer-link">Contact Us</a>
                    <a href="" className="footer-link">Blogs</a>
                    <a href="" className="footer-link">Privacy policy</a>
                </div>
            </div>
            
        </footer>
        </div>
        </div>
        </>
  )
}

export default Fotter
