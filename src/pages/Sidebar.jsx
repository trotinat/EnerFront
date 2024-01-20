    import React from 'react';
    import { BsGrid1X2Fill, BsFuelPump } from 'react-icons/bs';
    import { FaCar } from "react-icons/fa";
    import { IoLogOut } from "react-icons/io5";
    import { IoIosInformationCircle } from "react-icons/io";
    import AuthService from '../Auth/AuthService';

    const handleLogout = async () => {
        await AuthService.logout();
        window.location.replace(window.location.origin + '/login');
    };

    function Sidebar({ openSidebarToggle, openSidebar }) {
        return (
            <aside id="sidebar" className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-800 text-white transform transition-transform transition-duration-300 ease-in-out ${openSidebarToggle ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex flex-col justify-between h-full'>
                    <div>
                        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
                            <div className='flex items-center'>
                                <BsFuelPump className='text-2xl mr-2'/> 
                                <span className='text-xl font-semibold'>ENERDRIVE</span>
                            </div>
                            <button onClick={openSidebar} className='text-2xl focus:outline-none'>
                                {openSidebarToggle ? 'x' : 'Open'}
                            </button>
                        </div>

                        <nav className='px-4 py-6'>
                            <ul>
                                <li className='mb-3'>
                                    <a href="/" className='flex items-center p-2 text-base font-normal rounded-lg transition duration-150 hover:bg-gray-700'>
                                        <BsGrid1X2Fill className='text-xl mr-3'/> Dashboard
                                    </a>
                                </li>
                                <li className='mb-3'>
                                    <a href="/cars" className='flex items-center p-2 text-base font-normal rounded-lg transition duration-150 hover:bg-gray-700'>
                                        <FaCar className='text-xl mr-3'/> Cars
                                    </a>
                                </li>
                                <li className='mb-3'>
                                    <a href="/infos" className='flex items-center p-2 text-base font-normal rounded-lg transition duration-150 hover:bg-gray-700'>
                                        <IoIosInformationCircle className='text-xl mr-3'/> Information
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className='px-4 py-6 border-t border-gray-700'>
                        <a href="#" onClick={handleLogout} className='flex items-center p-2 text-base font-normal rounded-lg transition duration-150 hover:bg-gray-700'>
                            <IoLogOut className='text-xl mr-3'/> Logout
                        </a>
                    </div>
                </div>

            </aside>
        );
    }

    export default Sidebar;
