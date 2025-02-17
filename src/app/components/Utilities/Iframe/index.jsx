"use client";

import { useState } from "react";

const Iframe = ({ url }) => {
    const [visible, setVisible] = useState(true);

    const Tutup = () => {
        setVisible(false); // Sembunyikan iframe dengan state
    };

    return (
        <div>
            {visible && (
                <>
                {/* // <div  */}
                {/* //     className="lg:fixed bottom-0 md:bottom-10 sm:justify-center sm:right-10 z-100 mt-4 sm:mx-auto flex items-center lg:justify-end"
                //  */}
                    <button
                        type="button"
                        className="p-2 md:absolute top-0 right-0 "
                        style={{ color: "white", backgroundColor: "",  }}
                        onClick={Tutup}
                    >
                        X
                    </button>
                    <iframe
                        id="player"
                        width="100%"
                        className="md:w-full"
                        height="100%"
                        src={url}
                        allow="autoplay;"
                        allowFullScreen
                    ></iframe>
                {/* </div> */}
                </>
            )}
        </div>
    );
};

export default Iframe;
