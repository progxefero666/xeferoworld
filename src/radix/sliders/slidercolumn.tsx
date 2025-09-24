import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";

const sectionStyle = {
    border: '1px solid #888888',
};

const handleStyle = {
    width: "100%",
    height: "12px",
    backgroundColor: 'rgba(70, 70, 70, 1)',
    border: '1px solid #1038ff',
    cursor: 'grab',
    transition: 'background-color 0.2s ease'
};

const activeHandleStyle = {
    ...handleStyle,
    backgroundColor: 'rgba(100, 100, 100, 1)',
    cursor: 'grabbing'
};

interface SliderColumnProps {
    id: string;
    height: number;
    onchange: (id: string, dirCcw: boolean | undefined) => void;
};

export function SliderColumn({ id, height, onchange }: SliderColumnProps) {
    const sliderBarRef = useRef<HTMLDivElement>(null);
    const [topSpacerHeight, setTopSpacerHeight] = useState<number>(0);
    const [directionCcw, setDirectionCcw] = useState<boolean | undefined>(undefined);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    //const heightCss = height + 'px';
    const heightCss = '100%';
    const handleHeight = 20;
    const handleHeightHalf = handleHeight / 2;

    const calculateDirection = useCallback((spacerHeight: number, barHeight: number) => {
        const handleCenterOffset = spacerHeight + handleHeightHalf;
        const centerOfBar = barHeight / 2;
        const threshold = 5; // Píxeles tolerance
        if (handleCenterOffset < centerOfBar - threshold) {
            return false; // Arriba
        } else if (handleCenterOffset > centerOfBar + threshold) {
            return true; // Abajo
        } else {
            return undefined;
        }
    }, [handleHeight]);

    const updateDirection = useCallback((newSpacerHeight: number) => {
        if (!sliderBarRef.current) return;
        const newDirection = calculateDirection(newSpacerHeight, sliderBarRef.current.clientHeight);
        if (newDirection !== directionCcw) {
            setDirectionCcw(newDirection);
            onchange(id, newDirection);
        }
    }, [directionCcw, id, onchange, calculateDirection]);

    useEffect(() => {
        if (!sliderBarRef.current) return;
        const initialSpacerHeight = (sliderBarRef.current.clientHeight / 2) - handleHeightHalf;
        setTopSpacerHeight(initialSpacerHeight);
        updateDirection(initialSpacerHeight);
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderBarRef.current) return;
        const sliderBarRect = sliderBarRef.current.getBoundingClientRect();
        
        //let newSpacerHeight: number = e.clientY - sliderBarRect.top - (handleHeight / 2);
        //let valueMin: number = Math.min(newSpacerHeight, sliderBarRect.height - handleHeight);
        //newSpacerHeight = Math.max(0, valueMin);
        //setTopSpacerHeight(newSpacerHeight);
        //updateDirection(newSpacerHeight);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.cursor = 'default';
    };

    const onMouseDownHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setIsDragging(true);
        document.body.style.cursor = 'grabbing';
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const renderSquareTop = () => (
        <Box width="100%" height="12%" style={sectionStyle}>
            {isDragging && directionCcw === false && (
                <Box width="100%" height="100%" style={{ backgroundColor: 'red', opacity: 0.6 }} />
            )}
        </Box>
    );

    const renderSquareBottom = () => (
        <Box width="100%" height="12%" style={sectionStyle}>
            {isDragging && directionCcw === true && (
                <Box width="100%" height="100%" style={{ backgroundColor: 'red', opacity: 0.6 }} />
            )}
        </Box>
    );

    return (
        <Flex width="100%" height={heightCss} direction="column" 
              align="center" justify="center"  px="1" py="2" gapY="2" 
              style={{userSelect:'none'}}>

            {renderSquareTop()}
            <Flex
                ref={sliderBarRef}
                width="100%"
                height="76%"
                direction="column"
                align="center"
                style={sectionStyle}>
                <div style={{
                    height: topSpacerHeight + 'px',
                    flexShrink: 0,
                    width: '100%',
                    backgroundColor: isDragging && directionCcw === false ? 'rgba(255,0,0,0.2)' : 'transparent',
                    transition: 'background-color 0.2s ease'}} />
                <div style={isDragging ? activeHandleStyle : handleStyle}
                    onMouseDown={onMouseDownHandle}/>
                <div style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: isDragging && directionCcw === true ? 'rgba(255,0,0,0.2)' : 'transparent',
                    transition: 'background-color 0.2s ease'}} />
            </Flex>
            {renderSquareBottom()}
        </Flex>
    );
}//end 

/*
<SliderColumn id={CTRL_ELEVATION_ID}
                height={CTRL_ELEVATION_H}
                onchange={onSliderVerticalChange}/>
*/