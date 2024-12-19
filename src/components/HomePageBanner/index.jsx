import React from "react";

function HomePageBanner() {
    return (
        <div className="relative w-full max-w-[1400px] m-auto text-center font-marcellus uppercase bg-white bg-opacity-25 text-custom-deep font-bold text-2xl sm:text-5xl [text-shadow:_0px_3px_2px_rgb(118_119_127_/_0.6)] shadow-lg">
            <div className="relative w-full">
                <img
                    src="/src/images/back1.jpg"
                    alt="Lunaura"
                    className="img-fluid w-full max-h-[450px] object-cover mb-4 mx-auto shadow-xl"
                />
            </div>
            <div className="lg:absolute font-advent inset-0 flex flex-col items-center justify-center">
                <p className="lg:hidden">
                    Delivering <span className="text-custom-sale">happiness</span>
                </p>
                <p className="-mt-1 mb-3 lg:hidden">to your doorstep</p>
                <div className="hidden lg:flex text-center text-white text-4xl xl:text-5xl font-semibold bg-custom-dark bg-opacity-90 p-4">
                    <p>
                        Delivering{" "}
                        <span className="text-5xl xl:text-6xl text-custom-light">
                            happiness
                        </span>{" "}
                        to your doorstep
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePageBanner;
