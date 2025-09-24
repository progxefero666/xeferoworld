//src\radix\simple\verticalslider.tsx

import { XText } from "@/radix/data/xtext";

/*
type TRange = {
    min:  number;
    max: number;
};
*/
import { TRange } from "@/common/types";
import React, { useRef, useState } from "react";
import { Box, Container, Flex,  Slider} from "@radix-ui/themes";


const someStyle = {
    backgroundColor: 'rgba(34, 34, 34, 1)',
    border: '1px solid rgb(98, 97, 98)',
};


interface SliderVerticalOldProps {
    id:       string;
    range:    TRange;
    value?:    number;
    step?:    number
    onchange: (id:string,value:number) => void;
};

export function SliderVerticalOld({id,range, onchange,value, step}: SliderVerticalOldProps) {
    
    //with in page
    const [currentValue, setCurrentValue] = useState<number>(value ?? 0);
    const [valueText, setValueText] = useState<string>(value?.toString() ?? "0");
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleOnChange = (sliderValue: number) => { 
        onchange(id, sliderValue);
        setCurrentValue(sliderValue);
        setValueText(sliderValue.toFixed(2).toString());
    };//end

    const sliderHeight = 120; // px
    const handleHeight = 18; // px
    const stepValue = step ?? 1;

    // Calcula la posición de la palanca según el valor
    const getHandleTop = (val: number) => {
        const percent = (val - range.min) / (range.max - range.min);
        return sliderHeight - handleHeight - percent * (sliderHeight - handleHeight);
    };

    // Evento de arrastre
    const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!sliderRef.current) return;
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const y = e.clientY - sliderRect.top;
        let percent = 1 - (y - handleHeight / 2) / (sliderHeight - handleHeight);
        percent = Math.max(0, Math.min(1, percent));
        let newValue = range.min + percent * (range.max - range.min);
        // Redondea al step
        newValue = Math.round(newValue / stepValue) * stepValue;
        setCurrentValue(newValue);
        setValueText(newValue.toString());
        handleOnChange(newValue);
    };

    // Evento de mouseDown para la palanca
    const onMouseDownHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const moveHandler = (ev: MouseEvent) => {
            handleDrag(ev as any);
        };
        const upHandler = () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
        };
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
    };

    return (
        <Flex width="100%" direction="column" justify="center" px="2" py="1" gapY="2"
            style={{backgroundColor: 'red'}}>
            <Flex width="100%" >
                <XText align="center" value={valueText} />
            </Flex>
            <Flex width="100%" justify="center" >
                <div
                    ref={sliderRef}
                    style={{
                        ...someStyle,
                        width: '100%',
                        height: sliderHeight + 'px',
                        position: 'relative',
                    }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: '0px',
                            width: '100%',
                            height: handleHeight + 'px',
                            top: getHandleTop(currentValue) + 'px',
                            background: '#fff',
                            border: '2px solid #888',
                            cursor: 'pointer',
                            zIndex: 2,
                        }}
                        onMouseDown={onMouseDownHandle}
                    />
                </div>
            </Flex>
        </Flex>
    );
};//end component

/*
const [value, setValue] = useState<number[]>([defvalue]);
    
{valueDegrees}°<br />
{value.toFixed(2)} rad
*/