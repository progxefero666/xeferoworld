//src\radix\keyvalue\inpselect.tsx

import { Box, Text, Flex, Select } from "@radix-ui/themes";
import { RadixConf } from "@/radix/rdxconf";
import {RADIX_COLORS} from '@/radix/rdxconf';
import { Label } from "@radix-ui/react-label";
import { Stylevalue } from "../models/stylevalue";


/**
 * class XSelect
 */
interface CompProps {
    collection: Stylevalue[]; 
    name?:      string;
    label?:     string;
    disabled?:  boolean;
    onchange:   (value:any,name?:string) => void;
};
export function StyleSelect({collection, name, onchange, label, disabled}: CompProps) {

    const size = RadixConf.SIZES.size_2;
    const variant = RadixConf.VARIANTS.surface;
    const color = RADIX_COLORS.gray;

    const handleOnChange = (value:string) => {
        onchange(value,(name??"select"));
    };//end


    return (
        <Flex width="100%" direction={"row"} gap="2" >

            {label?<Box pt={"1"}><Text size="3">{label}</Text></Box>:null}
            <Label>ss</Label>
            <Select.Root
                defaultValue={collection[0].key}
                onValueChange={handleOnChange}
                disabled={disabled}
                size={size}  >
                <Select.Trigger variant={variant} color={color} />
                <Select.Content>
                    {collection.map((item, index) => (
                        <Select.Item key={index} value={item.key}>
                            {item.value}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>
    )

}//end component


/*static getAsKeyvalueArray(list:string[]): Keyvalue[]{
    const result: Keyvalue[] = [];
    for (let idx=0;idx<list.length;idx++) {
        result.push(new Keyvalue(idx.toString(),list[idx]));
    }
    return result;
}*/
