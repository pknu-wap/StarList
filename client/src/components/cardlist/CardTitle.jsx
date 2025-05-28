import React from "react";

function CardTitle({ children, className = "" }) {
    const base = "w-full truncate text-left text-base font-semibold text-main-black";
    const responsive = "sm:text-lg md:text-xl";
    return <p className={`${base} ${responsive} ${className}`}>{children}</p>;
}

export default CardTitle;
