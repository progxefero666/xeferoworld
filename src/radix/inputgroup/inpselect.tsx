//src\radix\keyvalue\inpselect.tsx

import { Box, Text, Flex, Select } from "@radix-ui/themes";
import { Keyvalue } from "@/common/keyvalue";
import { RadixConf } from "@/radix/rdxconf";
import {RADIX_COLORS} from '@/radix/rdxconf';
import { ModelHelper } from "@/common/helper/modelhelper";
import { Label } from "@radix-ui/react-label";
import { TextStyle } from "../rdxtheme";


/**
 * class XSelect
 */
interface CompProps {
    onchange:   (value:string,name?:string) => void;
    value:    string; 
    collection: Keyvalue[]; 
    name?:      string;       
    label?:     string;
    disabled?:  boolean;
}
export function XSelect({name,onchange,collection,value,label,disabled}:CompProps) {

    const size = RadixConf.SIZES.size_2;
    const variant = RadixConf.VARIANTS.surface;
    const color = RADIX_COLORS.gray;

    const handleOnChange = (value:string) => {
        onchange(value,(name??"select"));
    }

    //let inp_collection: Keyvalue[] = [];
    //if(collection)  {inp_collection=collection;}
    //else {if(values){inp_collection = ModelHelper.getAsKeyvalueArray(values);}}

    return (
        <Flex width="100%" direction={"row"} gap="2" >

            {label?<Box pt={"1"}><Text size={TextStyle.SIZE_DEF}>{label}</Text></Box>:null}
   
            <Select.Root
                defaultValue={value}
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
