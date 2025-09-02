//src\radix\inputgroup\inpgrpcheck.tsx

import { forwardRef, useEffect, useState } from "react";
import { Flex, Text, RadioGroup, CheckboxGroup, Box } from "@radix-ui/themes";
import { RadixConf, RadixConstants } from "@/radix/rdxconf";


import { CollectionHelper } from "@/common/helper/collhelper";
import { RadixUtil } from "../rdxutil";
import { TOption, TRadixComponent, TSelected, TSelection } from "@/radix/rdxtypes";
import {RADIX_COLORS} from '@/radix/rdxconf';
import { CompStyle } from "../rdxtheme";

/*
<CheckboxGroup.Root defaultValue={["1"]} name="example">
    <CheckboxGroup.Item value="1">Fun</CheckboxGroup.Item>
    <CheckboxGroup.Item value="2">Serious</CheckboxGroup.Item>
    <CheckboxGroup.Item value="3">Smart</CheckboxGroup.Item>
</CheckboxGroup.Root>

*/

const DEFAULT: TRadixComponent = {
        size: CompStyle.SIZE_DEF,
        radius: CompStyle.RADIUS_DEF,
        variant: CompStyle.VARIANT_DEF,
        color: CompStyle.COLOR_DEF
    };

interface CompProps {
    readonly?: boolean;
    disabled?: boolean;
    inline?: boolean;
    autocommit?: boolean;
    name?: string;
    collection:TOption[];
    label?: string;
    onselect: (collection:TOption[],name?:string) => void;
    autofocus?: boolean;
}
export const XCheckGroup = forwardRef<HTMLInputElement, CompProps>(({
    autocommit, inline, collection: options, name, label, onselect }, ref) => {

    const [rootValues,setRootValues] = useState<string[]>
        (RadixUtil.getArrayChar(RadixConstants.ITEM_UNCHECKED, options.length));

    const [collValues,setCollValues] = useState<boolean[]>(RadixUtil.getArrayFalse(options.length));

    const auto: boolean = autocommit ?? false;
    let compDirection: any = "column";
    if(inline) {compDirection = "row";}

    const compStyle: TRadixComponent = {
        color: RADIX_COLORS.gray,
        size: RadixConf.SIZES.size_3,
        variant: RadixConf.VARIANTS.surface,
        radius: RadixConf.RADIUS.medium
    }
    
    useEffect(() => {      
        alert(options.length);
        const init =  () => {
            const coll_values:boolean[] = [];
            const root_values: string[] = [];
            for(let i=0; i<options.length; i++) {
                coll_values[i] = options[i].selected;
                if(options[i].selected) {root_values[i] = RadixConstants.ITEM_CHECKED;} 
                else                    {root_values[i] = RadixConstants.ITEM_UNCHECKED;}
            }
            setCollValues(coll_values);
            setRootValues(root_values);
        };
        init();
    }, []);

 
    const onHandleChange = (value: string) => {
        const itemIndex: number = CollectionHelper.getTOptionIndex(options, value);
        let coll_values:boolean[] = collValues;
        coll_values[itemIndex] = !coll_values[itemIndex];
        options[itemIndex].selected = coll_values[itemIndex];
        setCollValues(coll_values);        
        if (auto) {
            if (name) { onselect(options, name); }
            else { onselect(options); }
            return;
        }
    }

    const renderMainContent = () => {
        return (
               <Box width="100%">
                {options.map((opt, index) => (
                    <CheckboxGroup.Root key={index.toString()} onClick={() => onHandleChange(opt.name)}
                        name={name}
                        defaultValue={[RadixConstants.ITEM_CHECKED]} 
                        size    = {compStyle.size}
                        color   = {compStyle.color}
                        variant = {compStyle.variant} > 

                        <CheckboxGroup.Item  
                            value={rootValues[index]} >
                            <Text size="2" >
                                {opt.text}
                            </Text>
                        </CheckboxGroup.Item>      

                    </CheckboxGroup.Root>
                ))}  
            </Box>       
        )

    }//end renderMainContent


    return (
        <Flex direction = {compDirection} gap="2">
            {renderMainContent()}            
        </Flex>
    )

})//end component
