import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../../CartIcon';

function Header() {
    return (
        <header className="w-full fixed top-0 bg-white max-w-[1100px] flex justify-between items-center p-3 border-b-2 border-black z-[9999]">
            <div className="font-marcellus">
                <Link to="/" className="text-custom-deep text-4xl font-bold hover:text-[#40303d] no-underline">
                    Lunaura
                </Link>
            </div>
            <div className="flex justify-end mr-2">
                <CartIcon />
            </div>
        </header>
    );
}

export default Header;
