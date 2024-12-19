import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import CartIcon from '../../CartIcon';
import CartItemsCount from '../../CartItemCount';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => window.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <header className="w-full fixed top-0 bg-white max-w-[1400px] p-3 flex justify-between items-center border-b-2 border-custom-deep z-[9999]">
            <div className="relative md:hidden" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="flex items-center text-custom-deep text-xl font-bold hover:text-custom-dark focus:outline-none"
                >
                    <FaBars className="h-6 w-6" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute left-0 mt-7 -ml-4 py-4 w-[200px] font-taviraj font-medium bg-custom-light shadow-xl rounded-sm z-50 uppercase">
                        <ul className="flex flex-col">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-4 px-4 text-custom-deep hover:font-extrabold hover:bg-custom-deep hover:text-white"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="block py-4 px-4 text-custom-deep hover:font-extrabold hover:bg-custom-deep hover:text-white"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="block py-4 px-4 text-custom-deep hover:font-extrabold hover:bg-custom-deep hover:text-white"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shoppingcart"
                                    className="block font-bold py-4 px-4 bg-custom-medium text-white hover:font-extrabold hover:bg-custom-deep"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Cart (<CartItemsCount />)
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="font-marcellus">
                <Link to="/" className="text-custom-deep text-2xl md:text-4xl font-bold hover:text-custom-dark no-underline uppercase [text-shadow:_0px_10px_3px_rgb(118_119_127_/_0.6)]">
                    Lunaura
                </Link>
            </div>

            <div className="hidden md:flex font-taviraj justify-end items-center space-x-8 ml-auto pe-5 uppercase">
                <Link to="/" className="text-custom-deep text-lg font-medium hover:text-custom-dark">
                    Home
                </Link>
                <Link to="/products" className="text-custom-deep text-lg font-medium hover:text-custom-dark">
                    Products
                </Link>
                <Link to="/contact" className="text-custom-deep text-lg font-medium hover:text-custom-dark">
                    Contact
                </Link>
            </div>

            <div className="flex justify-end mr-4">
                <CartIcon />
            </div>
        </header>
    );
}

export default Header;
