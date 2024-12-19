import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <div className="container fixed bottom-0 bg-custom-deep text-white py-4 px-6 flex justify-between items-center z-[1999] max-w-[1400px]">
            <h1 className="text-lg font-marcellus font-bold uppercase">Lunaura</h1>
            <div className="flex space-x-4">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                    aria-label="Facebook"
                >
                    <FaFacebook size={24} />
                </a>
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500"
                    aria-label="Instagram"
                >
                    <FaInstagram size={24} />
                </a>
                <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                    aria-label="Twitter"
                >
                    <FaTwitter size={24} />
                </a>
            </div>
        </div>
    );
}

export default Footer;
