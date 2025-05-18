// src/components/common/ToggleButton.jsx

import { useState } from "react";
import { CheckBoxChecked, CheckBoxEmpty, CheckBoxHover } from "../../assets";

const ToggleButton = ({
    selected,
    onClick,
    className = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[34px] lg:h-[34px]"
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        if (!selected) setIsHovered(true);
    };
    const handleMouseLeave = () => {
        if (!selected) setIsHovered(false);
    };

    let IconComponent;
    if (selected) {
        IconComponent = <CheckBoxChecked className="w-full h-full" />;
    } else if (isHovered) {
        IconComponent = <CheckBoxHover className="w-full h-full" />;
    } else {
        IconComponent = <CheckBoxEmpty className="w-full h-full" />;
    }

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
        ${className}                      /* 반응형 w/h 유틸리티 */
        inline-flex items-center justify-center
        rounded-full
      `}
        >
            {IconComponent}
        </button>
    );
};

export default ToggleButton;
