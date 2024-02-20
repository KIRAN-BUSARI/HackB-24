import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axiosInstance from '../../Helper/axiosInstance';
function Header() {
    const [username, setUsername] = useState("")

    useEffect(() => {
        const fetchUsername = async () => {
            await axiosInstance.get("/users/getUser")
                .then(res => {
                    console.log(res.data.data)
                    setUsername(res.data.data.username);
                })

                .catch(err => {
                    console.log(err)
                })
        }
        fetchUsername()
    }, [])

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/signout"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log out
                        </Link>

                        <div className="flex items-center">
                            {username}
                        </div>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-slate-700"}
                                        lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/about'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-slate-700"}
                                        lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Appointments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/contact'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-slate-700"}
                                        lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Pharmacy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/online-consultation'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-slate-700"}
                                        lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Online Consultation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/user'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-slate-700"}
                                        lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Commumnity
                                </NavLink>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header