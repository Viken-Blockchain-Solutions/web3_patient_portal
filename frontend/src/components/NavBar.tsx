'use client'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import LogoUri from '../public/assets/images/verifyedlogo.png'

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <nav className='sticky top-5 w-full rounded-full flex shadow-lg items-center min-w-screen p-1 bg-purple'>

                <ul className='desktopMenu bg-white rounded-full w-full h-8 gap-4 lg items-center  justify-between sm:flex text-black'>
                    <li className='flex gap-4 items-center'>
                        <Link href="/">
                            <span className='items-center flex gap-2 flex'>
                                <span className="logo">
                                    <Image alt={'logo'} width={35} height={35} src={LogoUri} />
                                </span>
                                <span className="hidden title md:flex">
                                    Medical Research  <span className="text-black ml-1">Hub</span>
                                </span>
                            </span>
                        </Link>
                    </li>
                    <li className='flex gap-4 items-center'>
                        <Link href="/access" className="btn-primary">Access</Link>
                    </li>
                </ul>

                <ul className='mobileMenu flex w-full items-center justify-between'>
                    <li onClick={() => setShowMenu(prev => !prev)} className='w-1/4 pt-1 ml-3 cursor-pointer'>
                        <span className="menu text-grey">
                            <FontAwesomeIcon icon={(showMenu) ? faClose : faBars} />
                        </span>
                    </li>
                    <li className='w-1/4 pt-1 ta-r'>
                        <Link href={"/"}>
                            <span className="logo ta-r">
                                <Image alt={'logo'} width={50} height={50} src={LogoUri} />
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Conditionally render dropdown based on showMenu state */}
            <ul className={`${showMenu ? '' : 'hideMenu'} mobileMenu sticky p-1 top-20 rounded-md bg-purple w-full z-10 flex-col p-3`}>

                <li>
                    <Link onClick={() => setShowMenu(false)} href="/access" className="px-2">Access</Link>
                </li>

            </ul>
        </>
    );
}