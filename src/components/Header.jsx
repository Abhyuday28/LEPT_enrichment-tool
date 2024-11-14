import React from 'react'
import { Link } from 'react-router-dom'
import LoginBtn from './LoginBtn'


const Header = () => {
    return (
        <header className="flex justify-between h-16 items-center p-6 sticky top-0 left-0 mx-2 z-10 backdrop-blur-sm">
            <Link to={'/'} className='flex'>

                <h1 className='text-2xl tracking-wider font-bold'>LEPT</h1>
            </Link>

            <nav className='flex gap-2'>
                <ul>
                    <li>
                        <LoginBtn />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header