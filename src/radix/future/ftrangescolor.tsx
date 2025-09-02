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




/**
 * jsx component for color ranges
 *   example: 3 colors --> 2 transitions or bias (color1-color2, color2-color3)
 */
interface FtRangesColorProps {
    colorsinit: string[];
    onchange: (colors: string[], biases: number[]) => void;
};

const slidersConfig = new RangeConfig({min:1,max:99},50,1);

export function FtRangesColor({ colorsinit, onchange }: FtRangesColorProps) {

    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [cromeColor, setCromeColor] = useState<string>('');    
    const [colors, setColors] = useState<string[]>(colorsinit);
    const [biases, setBiases] = useState<number[]>(new Array(colorsinit.length - 1).fill(50)); 


    const onHandlerElement = (newColors: string[], newBiases: number[]) => {
        onchange(newColors, newBiases);
    };//end

    const handleColorClick = (index: number) => {
        setSelectedColorIndex(index);
        setCromeColor(colors[index]);
        setIsDialogOpen(true);
    };//end

    const handleColorChange = (color: any) => {
        const rgbColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        setCromeColor(rgbColor);
    };//end

    const handleColorConfirm = () => {
        if (selectedColorIndex >= 0) {
            const newColors = [...colors];
            newColors[selectedColorIndex] = cromeColor;
            setColors(newColors);
            onHandlerElement(newColors, biases);
        }
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
    };//end

    const handleColorCancel = () => {
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
        setCromeColor('');
    };//end

    const handleBiasChange = (sliderId: string,value:number) => {
        const index = parseInt(sliderId); 
        const newBiases = [...biases];
        newBiases[index] = value;
        setBiases(newBiases);
        onHandlerElement(colors, newBiases);
    };//end

    const getGradientColorStyle = (): CSSProperties => {
        const rescolor:any = ColorUtil.getGradient(colors, biases);
        return {background:rescolor};
    };//end

    // jsx render
    //.............................................................................

    const renderCromePickerDlg = () => {
        return (
            <Dialog.Content style={dialogStyle}>

                <Dialog.Title>                    
                    <Text size={TextStyle.SIZE_TITLE_DIALOG}>
                        Select Color {selectedColorIndex + 1}
                    </Text>
                </Dialog.Title>

                <Box mb="2">
                    <ChromePicker color={cromeColor}
                                  onChange={handleColorChange}/>
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


            {colors.map((color, index) => (
                <Flex key={index} direction="row" width="auto" height="auto"                    
                      gapX="2" style={{border:'1px solid rgb(0,0,0)'}}>

                    <Box width="30px" height="30px"
                        style={getColorBoxStyle(color)}
                        onClick={() => handleColorClick(index)} />
                    <SliderSimple id={index.toString()} 
                                    config={slidersConfig}
                                    onchange={handleBiasChange} />
                </Flex>
            ))} 
            
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {renderCromePickerDlg()}
            </Dialog.Root>

        </Flex>
    );

}//end

/*
            <Flex width="100%" direction="row" gapX="2">
                {colors.map((color, index) => (
                <Box key={index} width="auto" height="auto" 
                     style={{border:'1px solid rgb(0, 0, 0)'}}>
                    <Box width="30px" height="30px"
                        style={getColorBoxStyle(color)}
                        onClick={() => handleColorClick(index)} />
                </Box>
                ))}
            </Flex> 

            <Flex direction="column" gapY="2">                
                {biases.map((bias, index) => (
                    <Box key={index} width="auto" height="auto">
                        <SliderSimple id={index.toString()} 
                                      config={slidersConfig}
                                      onchange={handleBiasChange} />
                    </Box>
                ))}
            </Flex>   
*/