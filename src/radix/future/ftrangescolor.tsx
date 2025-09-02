//src\radix\future\ftrangescolor.tsx

import React, { useState, CSSProperties, useEffect } from "react"; // Agregamos useEffect
import { Box, Flex, Text, Dialog, Button } from "@radix-ui/themes"
import ChromePicker from "react-color/lib/components/chrome/Chrome";

import { ButtonsStyle, TextStyle } from '@/radix/rdxtheme';
import { OpConstants } from "@/common/constants";
import { XText } from "src/radix/data/xtext";
import { RangeConfig } from "@/common/rangeconfig";
import { SliderSimple } from "../sliders/slidersimple";
import { ColorUtil } from "@/lib/graph2d/util/colorutil";


//.............................................................
// !!! all colors in RGB format -> rgb(<R>, <G>, <B>) !!! 
//.............................................................

const dialogStyle: React.CSSProperties = {
    width: '300px',
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    alignItems: 'center',
    padding: '2px 0 2px 0'
};



const getColorBoxStyle = (color: string): CSSProperties => ({
    backgroundColor: color,
    border: '1px solid rgb(0, 0, 0)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
});

const colorContStyle = {
    border: '1px solid rgb(0, 0, 0)'
};

const slidersConfig = new RangeConfig({min:1,max:99},50,1);

/**
 * jsx component for color ranges
 *   example: 3 colors --> 2 transitions or bias (color1-color2, color2-color3)
 */
interface FtRangesColorProps {
    colorsinit: string[];
    onchange: (colors: string[], biases: number[]) => void;
};

export function FtRangesColor({ colorsinit, onchange }: FtRangesColorProps) {

    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [tempColor, setTempColor] = useState<string>('');    
    const [colors, setColors] = useState<string[]>(colorsinit);
    const [biases, setBiases] = useState<number[]>(new Array(colorsinit.length - 1).fill(50)); 



    const onHandlerElement = (newColors: string[], newBiases: number[]) => {
        onchange(newColors, newBiases);
    };//end

    const handleColorClick = (index: number) => {
        setSelectedColorIndex(index);
        setTempColor(colors[index]);
        setIsDialogOpen(true);
    };//end

    const handleColorChange = (color: any) => {
        const rgbColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        setTempColor(rgbColor);
    };//end

    const handleColorConfirm = () => {
        if (selectedColorIndex >= 0) {
            const newColors = [...colors];
            newColors[selectedColorIndex] = tempColor;
            setColors(newColors);
            onHandlerElement(newColors, biases);
        }
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
    };//end

    const handleColorCancel = () => {
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
        setTempColor('');
    };//end

    const handleBiasChange = (sliderId: string,value:number) => {
        const index = parseInt(sliderId); 
        const newBiases = [...biases];
        newBiases[index] = value;
        setBiases(newBiases);
        onHandlerElement(colors, newBiases);
    };//end

    const getGradientColorStyle = (): CSSProperties => {
        return {background:ColorUtil.getGradient(colors, biases)};
    };//end

    // jsx render
    //.............................................................................

    const renderColorSelector = () => {
        return (
            <Box>
                <XText value="Colors" />
                <Flex gap="2" mt="2" wrap="wrap">
                    {colors.map((color, index) => (
                        <Flex key={index} direction="column" align="center" gap="1">

                            <Box width="auto" height="auto" style={colorContStyle}>
                                <Box width="30px" height="30px"
                                    style={getColorBoxStyle(color)}
                                    onClick={() => handleColorClick(index)} />
                            </Box>
                            <Text size="1" >
                                {index + 1}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </Box>            
        )
    };

    const renderBiasControls = () => {
        return (
            <Flex direction="column" gapY="2">
                <XText value="Bias Controls" />
                
                {biases.map((bias, index) => (
                    <Flex key={index} direction="column" gapX="2" >
                        <XText value={bias.toString()} />
                        <SliderSimple
                            id={index.toString()} 
                            config={slidersConfig}
                            onchange={handleBiasChange} />
                    </Flex>
                ))}
            </Flex>     
        )
    };

    const renderCromePickerDlg = () => {
        return (
            <Dialog.Content style={dialogStyle}>
                
                <Dialog.Title>
                    <Text size={TextStyle.SIZE_TITLE_DIALOG}>
                        Select Color {selectedColorIndex !== -1 ? selectedColorIndex + 1 : ''}
                    </Text>
                </Dialog.Title>

                <Box mb="2">
                    <ChromePicker
                        color={tempColor}
                        onChange={handleColorChange}
                        disableAlpha={true}/>
                </Box>

                <Flex width="100%" direction="row" justify="center" gap="2">
                    <Button type="submit"
                            color={ButtonsStyle.COLOR_SAVE}
                            size={ButtonsStyle.BUTTON_SIZE}
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={handleColorConfirm}>
                        {OpConstants.OP_TEXT_OK}
                    </Button>
                    <Button type="button"
                            color={ButtonsStyle.COLOR_CANCEL}
                            size={ButtonsStyle.BUTTON_SIZE}
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={handleColorCancel}>
                        {OpConstants.OP_TEXT_CANCEL}
                    </Button>
                </Flex>

            </Dialog.Content>
        )
    };

    return (
        <Flex width="100%" direction="column" gapY="2" >

            <Box width="100%" height="40px" style={getGradientColorStyle()} />

            {renderColorSelector()}            
            {renderBiasControls()}
            
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {renderCromePickerDlg()}
            </Dialog.Root>

        </Flex>
    );

}//end

/*
position: 'relative' as React.CSSProperties["position"]
useEffect(() => {
    setColors(colorsinit);
    // Reinicializar biases si el número de colores cambia, o ajustarlo si es necesario.
    // Aquí asumimos que siempre queremos un bias por transición.
    setBiases(new Array(colorsinit.length - 1).fill(0.5));
}, [colorsinit]);
*/