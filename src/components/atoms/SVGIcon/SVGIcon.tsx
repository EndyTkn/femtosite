import React from "react";

import { IIcon } from './IIcon';

const Icons: {[type: string]: any} = {
    
};

interface SVGIconProps extends IIcon {
    icon: keyof typeof Icons,
    style?: object
}

export const SVGIcon = ({fillColor, height, width, icon, style}: SVGIconProps) => {
    const Icon = Icons[icon];
    if (!Icons[icon])
        return;

    return (
        <div style={style}>
            <Icon
                fillColor={fillColor}
                height={height}
                width={width}
            />
        </div>
    );
};
