//src\radix\future\ftrangescolor.tsx

import React, { useState, CSSProperties, useEffect } from "react"; // Agregamos useEffect
import { Box, Flex, Text, Dialog, Button } from "@radix-ui/themes"
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
    let currentPosition = 0;

    // El primer color siempre comienza en 0%
    stops.push(`${colors[0]} 0%`);

    // Calcular las posiciones para los colores intermedios y el final
    for (let i = 1; i < colors.length; i++) {
        if (i === colors.length - 1) {
            // El último color siempre termina en 100%
            stops.push(`${colors[i]} 100%`);
        } else {
            // El bias[i-1] controla la distribución del espacio entre color[i-1] y color[i]
            // Acumulamos la influencia de los biases anteriores para posicionar el color actual
            const segmentLength = 100 / (colors.length - 1); // Longitud base de cada segmento
            const biasInfluence = (biases[i - 1] - 0.5) * segmentLength; // Ajuste basado en el bias
            
            // La posición real del color intermedio es un promedio entre su posición esperada
            // y los ajustes de los biases vecinos.
            // Una forma más robusta es que cada bias controle el punto donde termina el color anterior
            // y empieza el actual.

            // Simplificando: cada bias[j] controla la proporción de la distancia entre color[j] y color[j+1]
            // Vamos a usar los biases para influir en la posición de inicio del siguiente color.
            // Para N colores, tendremos N-1 transiciones y por lo tanto N-1 biases (o puntos de control).
            // Sin embargo, tu UI parece tener un bias por color intermedio, lo que implicaría N-2 biases.
            // Si el slider 'Bias N' afecta la transición entre Color N y Color N+1,
            // entonces necesitamos N-1 biases.

            // Vamos a ajustar la lógica para que 'biases[i-1]' influya en la posición
            // del color 'i'.
            const prevColorPosition = i === 1 ? 0 : parseFloat(stops[stops.length - 1].split(' ')[1].replace('%', ''));
            const nextBasePosition = (i / (colors.length - 1)) * 100;

            // Este es un enfoque para que cada bias controle el punto de transición.
            // El primer bias controla la transición de color[0] a color[1], etc.
            // Un valor de 0.5 significa el punto medio.
            const transitionPoint = prevColorPosition + ((nextBasePosition - prevColorPosition) * biases[i - 1]);
            
            // Aseguramos que los puntos de transición estén ordenados y dentro de 0-100%
            currentPosition = Math.max(currentPosition, Math.min(100, transitionPoint));
            stops.push(`${colors[i]} ${currentPosition}%`);
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
    // Los biases ahora son para las N-1 transiciones entre N colores.
    // Si tenemos 3 colores, tenemos 2 transiciones (color1-color2, color2-color3), por lo tanto 2 biases.
    const [biases, setBiases] = useState<number[]>(new Array(colorsinit.length - 1).fill(0.5)); // Ajuste aquí

    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [tempColor, setTempColor] = useState<string>('');

    /*
    useEffect(() => {
        setColors(colorsinit);
        // Reinicializar biases si el número de colores cambia, o ajustarlo si es necesario.
        // Aquí asumimos que siempre queremos un bias por transición.
        setBiases(new Array(colorsinit.length - 1).fill(0.5));
    }, [colorsinit]);
    */

    const biasConfigs = Array.from(
        { length: biases.length }, 
        () => new RangeConfig({ min: 0.01, max: 0.99 }, 0.5, 0.01));

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
            onHandlerElement(newColors, biases); // Asegúrate de pasar los biases actuales
        }
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
    };

    const handleColorCancel = () => {
        setIsDialogOpen(false);
        setSelectedColorIndex(-1);
        setTempColor('');
    };

    const handleBiasChange = (biasId: string, value: number) => {
        const index = parseInt(biasId); // El id del slider es su índice
        const newBiases = [...biases];
        if (index >= 0 && index < newBiases.length) {
            newBiases[index] = value;
            setBiases(newBiases);
            onHandlerElement(colors, newBiases);
        }
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
                                onClick={() => handleColorClick(index)} />

                            <Text size="1" >
                                {index + 1}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </Box>

            {/* bias controls */}
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
                                onchange={handleBiasChange} />
                        </Box>
                    ))}
                </Flex>
            </Box>

            {/* cromepicker dialog */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content style={dialogStyle}>
                    <Dialog.Title>
                        <Text size={TextStyle.SIZE_TITLE_DIALOG}>
                            Select Color {selectedColorIndex !== -1 ? selectedColorIndex + 1 : ''}
                        </Text>
                    </Dialog.Title>

                    <Box mt="3" mb="4">
                        <ChromePicker
                            color={tempColor}
                            onChange={handleColorChange}
                            disableAlpha={true}/>
                    </Box>

                    <Flex width="100%" direction="row" justify="center" gap="2">
                        <Button
                            type="submit"
                            color={ButtonsStyle.COLOR_SAVE}
                            size={ButtonsStyle.BUTTON_SIZE}
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={handleColorConfirm}>
                            {OpConstants.OP_TEXT_OK}
                        </Button>
                        <Button
                            color={ButtonsStyle.COLOR_CANCEL}
                            size={ButtonsStyle.BUTTON_SIZE}
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={handleColorCancel}>
                            {OpConstants.OP_TEXT_CANCEL}
                        </Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );

}//end