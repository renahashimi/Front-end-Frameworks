import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";


function CheckoutSuccess() {

    useEffect(() => {
        localStorage.clear();
        window.dispatchEvent(new Event('cartUpdated'));
    });

    return (
        <div className="container text-center">
            <div>
                <p className="flex justify-center text-center mt-5 -mb-12 text-6xl text-custom-deep">
                    <FaCircleCheck />
                </p>
                <h2 className="font-rokkitt font-bold w-full bg-custom-light text-custom-deep my-5 mx-0 pt-10 pb-5 px-4 uppercase">Your order is placed successfully!</h2>
            </div>
            <div className="font-rokkitt text-center mt-4 p-2 text-sm text-custom-dark">
                <p>
                    Thank you for your purchase.
                </p>
                <p>
                    You will shortly receive an email with order details.
                </p>
            </div>
            <div className="flex mt-6 m-auto justify-center underline uppercase font-advent font-bold text-custom-deep">
                <Link to="/">Go back to Homepage</Link>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
