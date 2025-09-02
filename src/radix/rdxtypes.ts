
import { Flex } from '@radix-ui/themes';
import type { ComponentProps } from 'react';

export type TIdtext = {
    id: string;
};


export type XTextStyle = {
    align?: "center" | "left" | "right";
    size: any;
    color: any;
    style?: any;
}

export type XCompStyle = {
    size?: any;
    color?: any;
    radius?: any;
    variant?: any;
}

export type XTextCompStyle = {
    size?: any;
    color?: any;
    radius?: any;
    variant?: any;
    text_color?: any;
    text_size?: any;
    text_style?: any;
}


export type XContStyle = {
    size?: any;
    color?: any;
    border_radius?: any;
    border_color?: any;
    variant?: any;
    icon?: any;
}

export type TSelected = {
    id: string,
    value: boolean
};

export type TSelection = {
    id: string,
    items: TSelected[]
};

export type TOption = {
    name: string,
    text: string,
    selected: boolean
};


type FlexProps = ComponentProps<typeof Flex>;
export type radixTypeDirection = FlexProps['direction'];

export type TRadixComponent = {
    color: any; 
    size: any;
    variant: any;
    radius: any;
}

