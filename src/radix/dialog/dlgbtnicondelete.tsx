//src\radix\dialog\dlgiconconfirm.tsx

import React, { useRef } from "react";
import { Button, Flex, Text, Dialog, IconButton } from "@radix-ui/themes";
import { ButtonsStyle, IconsStyle, TextStyle } from '@/radix/rdxtheme';
import { CheckIcon, Cross2Icon, TrashIcon } from "@radix-ui/react-icons";

import { OpConstants } from "@/common/constants";
import { LIB_ICON } from "@/radix/rdxthicons";
import { XIconButton } from "@/radix/buttons/xiconbutton";


/**
 * DialogForm component
 */
interface CompProps {
    disabled?: boolean;
    title: string;
    message: string;
    onconfirm: (operationId:string|null,itemIndex?:string|null) => void;
}
export const DlgBtnIconDeleteConfirm = ({title,message,onconfirm,disabled }: CompProps) => {

    const hiddenRef = useRef<HTMLButtonElement>(null);
    const exeOperation= (operation:string,item:string|null,entity?:any) =>{
        hiddenRef.current?.click();
    };//

    return (
        <>
        <XIconButton icon={LIB_ICON.DELETE} exeOperation={exeOperation} disabled={disabled?? false}/>
        <Dialog.Root >

            <Dialog.Trigger>
                <IconButton ref={hiddenRef} style={{display:"none"}}/>
            </Dialog.Trigger>

            <Dialog.Content>

                <Dialog.Title>
                    <Text size={TextStyle.SIZE_TITLE_DIALOG}>{title}</Text>
                </Dialog.Title>

                <Dialog.Description>
                    <Text size={TextStyle.SIZE_DEF}>{message}</Text>
                </Dialog.Description>

                <Dialog.Close>
                    <Flex width="100%" direction="row" justify="center" gapX="2" mt="2">

                        <Button type="submit"
                            color={ButtonsStyle.COLOR_SAVE}
                            size={ButtonsStyle.BUTTON_SIZE}
                            radius={ButtonsStyle.BUTTON_RADIUS}
                            onClick={() => onconfirm(null, "0")} >

                            {OpConstants.OP_TEXT_OK}

                            <CheckIcon width={IconsStyle.DEF_HEIGHT}
                                        height={IconsStyle.DEF_WIDTH} />
                        </Button>

                        <Button color={ButtonsStyle.COLOR_CANCEL}
                                size={ButtonsStyle.BUTTON_SIZE} 
                                radius={ButtonsStyle.BUTTON_RADIUS}>

                            {OpConstants.OP_TEXT_CANCEL}

                            <Cross2Icon width={IconsStyle.DEF_HEIGHT}
                                        height={IconsStyle.DEF_WIDTH} />
                        </Button>
                    </Flex>

                </Dialog.Close>

            </Dialog.Content>

        </Dialog.Root>
        </>
    )

};//end component