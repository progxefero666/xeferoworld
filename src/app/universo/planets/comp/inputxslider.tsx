"use client"
import { Box, Flex, Text, Slider as RadixSlider } from "@radix-ui/themes"

interface SliderProps {
    label: string
    value: number
    min: number
    max: number
    step?: number
    onChange: (value: number) => void
    showColorPreview?: boolean // Added optional color preview prop
}

export function Slider({ label, value, min, max, step = 1, onChange, showColorPreview = false }: SliderProps) {
    const getColorFromHue = (hue: number) => {
        return `hsl(${hue}, 70%, 50%)`
    }

    return (
        <Box>
            <Flex justify="between" align="center" mb="2">
                <Flex align="center" gap="2">
                    <Text size="2" color="gray">
                        {label}
                    </Text>
                    {showColorPreview && (
                        <Box
                            style={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: getColorFromHue(value),
                                borderRadius: "3px",
                                border: "1px solid #333",
                                flexShrink: 0,
                            }}
                        />
                    )}
                </Flex>
                <Text size="2" weight="medium">
                    {value}
                </Text>
            </Flex>
            <RadixSlider
                value={[value]}
                onValueChange={(values) => onChange(values[0])}
                min={min}
                max={max}
                step={step}
                size="2"
            />
        </Box>
    )
}
