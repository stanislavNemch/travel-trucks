import React from "react";
import clsx from "clsx";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    id: string;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ id, className, ...props }) => {
    return (
        <svg className={clsx(className)} {...props}>
            <use href={`/icons/sprite.svg#${id}`} />
        </svg>
    );
};
