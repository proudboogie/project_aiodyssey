"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, [])

    

  return (
    <nav className='flex-between w-full mb-16'>
        <Link href="/" className='flex gap-2 flex-center'>
            <p className='nav__logo_text'>AI Odyssey</p>
        </Link>


        {/* Desktop Navigation */}
        <div className="lg:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <a href="https://chat.openai.com/"
                    className='universal__btn'
                    target="_blank"
                    >
                        To: ChatGPT
                    </a>
                    <Link href="/create-prompt"
                    className='universal__btn'>
                        Create Post
                    </Link>

                    <button type="button"
                     onClick={() => {signOut({ callbackUrl: '/' })}} className='universal__btn'>
                        Sign Out
                     </button>

                     <Link href="/profile" className='universal__btn gap-2'>                        
                        My Profile
                    </Link>
                </div>
            ) : (
                <>
                {providers && 
                Object.values(providers).map((provider) =>
                (
                    <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='universal__btn'
                    >
                        Sign In
                    </button>
                ))}
            </>
        )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex relative">
            {session?.user ? (
                <div className='flex'>
                        <div 
                        className='nav__mobile_btn cursor-pointer' 
                        onClick={() => {setToggleDropDown((prev) => !prev)}}
                        >
                            {session?.user.name}
                        </div>

                        {toggleDropDown && (
                            <div className='nav__dropdown'>
                                <a href="https://chat.openai.com/"
                                className='universal__btn nav__dropdown_text'
                                target="_blank"
                                >
                                    To: ChatGPT
                                </a>
                                <Link
                                href="/profile"
                                className='universal__btn nav__dropdown_text'
                                onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                href="/create-prompt"
                                className='universal__btn nav__dropdown_text'
                                onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                type='button'
                                onClick={() => {
                                    setToggleDropDown(false);
                                    signOut({ callbackUrl: '/' })
                                }}
                                className="universal__btn nav__dropdown_text"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map((provider) =>
                (
                    <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='nav__mobile_btn'
                    >
                        Sign In
                    </button>
                ))}
            </>
            )}
        </div>
    </nav>
  )
}

export default Nav