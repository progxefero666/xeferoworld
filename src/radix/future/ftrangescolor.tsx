//src\radix\future\ftrangescolor.tsx
import React, { useRef, useState, forwardRef, useImperativeHandle, CSSProperties } from "react";
import { Box, Flex, Text, Dialog,Button, IconButton } from "@radix-ui/themes"
import ChromePicker from "react-color/lib/components/chrome/Chrome";

import { ButtonsStyle, TextStyle } from '@/radix/rdxtheme';
import { OpConstants } from "@/common/constants";
import { XText } from "src/radix/data/xtext";
import { RangeConfig } from "@/common/rangeconfig";
import { SliderSimple } from "../sliders/slidersimple";


//.............................................................
// !!! all colors in RGB format -> rgb(<R>, <G>, <B>) !!! 
//.............................................................

const dialogStyle: React.CSSProperties = {
    width: '300px',
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    alignItems: 'center',
    padding: '0'
};

// Función para generar el gradiente CSS
const generateGradient = (colors: string[], biases: number[]): string => {
    if (colors.length < 2) return `linear-gradient(to right, ${colors[0] || 'rgb(255,255,255)'})`;
    
    const stops: string[] = [];
    const totalSegments = colors.length - 1;
    
    for (let i = 0; i < colors.length; i++) {
        if (i === 0) {
            stops.push(`${colors[i]} 0%`);
        } else if (i === colors.length - 1) {
            stops.push(`${colors[i]} 100%`);
        } else {
            // Calcular posición basada en bias acumulado
            const position = (i / totalSegments) * 100;
            const biasAdjustment = (biases[i - 1] - 0.5) * 20; // Ajuste del bias
            const finalPosition = Math.max(0, Math.min(100, position + biasAdjustment));
            stops.push(`${colors[i]} ${finalPosition}%`);
        }
    }
    
    return `linear-gradient(to right, ${stops.join(', ')})`;
};

interface FtRangesColorProps {
    colorsinit: string[];
    onchange: (colors: string[], biases: number[]) => void;
}

export function FtRangesColor({ colorsinit, onchange }: FtRangesColorProps) {
    
    const [colors, setColors] = useState<string[]>(colorsinit);
    const [biases, setBiases] = useState<number[]>(new Array(colorsinit.length).fill(0.5));
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [tempColor, setTempColor] = useState<string>('');

    // Crear configs para los sliders de bias
    const biasConfigs = biases.map(() => new RangeConfig({ min: 0, max: 1 }, 0.5, 0.01));

    const onHandlerElement = (newColors: string[], newBiases: number[]) => {
        onchange(newColors, newBiases);
    };

    const handleColorClick = (index: number) => {
        setSelectedColorIndex(index);
        setTempColor(colors[index]);
        setIsDialogOpen(true);
    };

    const handleColorChange = (color: any) => {
        const rgbColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        setTempColor(rgbColor);
    };

    const handleColorConfirm = () => {
        if (selectedColorIndex >= 0) {
            const newColors = [...colors];
            newColors[selectedColorIndex] = tempColor;
            setColors(newColors);
            onHandlerElement(newColors, biases);
        }
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
    };

    const handleColorCancel = () => {
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
        setTempColor('');
    };

    const handleBiasChange = (biasIndex: string, value: number) => {
        const index = parseInt(biasIndex);
        const newBiases = [...biases];
        newBiases[index] = value;
        setBiases(newBiases);
        onHandlerElement(colors, newBiases);
    };


    const getGradientStyle = (): CSSProperties => ({
        background: generateGradient(colors, biases),
        border: '1px solid rgb(128, 128, 128)',
        position: 'relative'
    });

    const getColorBoxStyle = (color: string): CSSProperties => ({
        backgroundColor: color,
        border: '2px solid rgba(253, 0, 76, 1)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
    });

    return (
        <Flex width="100%" direction="column" gapY="2" >
            {/* <XText value="Color Range Preview" /> */}
            <Flex width="100%" direction="column">
                
                <Box width="100%" height="40px" 
                     style={getGradientStyle()} />
            </Flex>

            {/* Selectores de colores */}
            <Box>
                <XText value="Colors" />
                <Flex gap="2" mt="2" wrap="wrap">
                    {colors.map((color, index) => (
                        <Flex key={index} direction="column" align="center" gap="1">

                            <Box width="30px" height="30px"
                                style={getColorBoxStyle(color)}
                                onClick={() => handleColorClick(index)}/>

                            <Text size="1" >
                                {index + 1}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </Box>

            {/* Controles de bias */}
            <Box>
                <XText value="Bias Controls" />
                <Flex direction="column" gap="2" mt="2">
                    {biases.map((bias, index) => (
                        <Box key={index}>
                            <Text size="2" mb="1">
                                Bias {index + 1}: {bias.toFixed(2)}
                            </Text>
                            <SliderSimple
                                id={index.toString()}
                                config={biasConfigs[index]}
                                onchange={handleBiasChange}/>
                        </Box>
                    ))}
                </Flex>
            </Box>

            {/* Dialog para color picker */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content style={dialogStyle}>
                    <Dialog.Title>
                        <Text size={TextStyle.SIZE_TITLE_DIALOG}>
                            Select Color {selectedColorIndex + 1}
                        </Text>
                    </Dialog.Title>
                    
                    <Box mt="3" mb="4">
                        <ChromePicker 
                            color={tempColor} 
                            onChange={handleColorChange}
                            disableAlpha={true}
                        />
                    </Box>

                    <Flex width="100%" direction="row" justify="center" gap="2">
                        <Button 
                            type="submit"
                            color={ButtonsStyle.COLOR_SAVE}
                            size={ButtonsStyle.BUTTON_SIZE}
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={handleColorConfirm}
                        >
                            {OpConstants.OP_TEXT_OK}
                        </Button>
                        <Button 
                            color={ButtonsStyle.COLOR_CANCEL}
                            size={ButtonsStyle.BUTTON_SIZE} 
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={handleColorCancel}
                        >
                            {OpConstants.OP_TEXT_CANCEL}
                        </Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );
}
