//src/radix/dialog/dlginputoption.tsx

import React from "react";
import { Label } from "radix-ui";
import { Button, Box, Flex, Text, Dialog, TextField } from "@radix-ui/themes";
import { ButtonsStyle, IconsStyle, TextStyle } from '@/radix/rdxtheme';
import { CheckIcon, Cross2Icon, FilePlusIcon } from "@radix-ui/react-icons";
import { InputField } from "@/common/model/inputfield";
import { TKeyvalue } from "@/common/types";
import { OpConstants } from "@/common/constants";


/*
<DialogFieldText  
    buttontext="Add A" 
    title="New Task Type"
    item={inputName}  onsave={onSaveTasktype} />  
*/

/**
 * DialogForm component
 */
interface CompProps {
    buttontext: string;
    title: string;
    item: InputField;
    onsave: (values: TKeyvalue) => void;
}
export const DialogFieldText = ({ buttontext, title, item, onsave }: CompProps) => {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        onsave({key:item.id!, value:formData.get(item.id!)?.toString()});
    };//end

    return (
        <Dialog.Root>

            <Dialog.Trigger>
                <Button size={ButtonsStyle.BUTTON_SIZE}>
                    <FilePlusIcon width={IconsStyle.DEF_HEIGHT}
                                            height={IconsStyle.DEF_WIDTH} />
                    <Text size={ButtonsStyle.TEXT_SIZE}>
                        {buttontext}
                    </Text>
                </Button>
            </Dialog.Trigger>

            <Dialog.Content>

                <Dialog.Title>
                    <Text size={TextStyle.SIZE_TITLE_DIALOG}>{title}</Text>
                </Dialog.Title>

                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(event); }}>
                    <Flex width="100%" direction="column" gapY="2" >
                        <fieldset>
                            <Label.Root>{item.label}</Label.Root>
                            <TextField.Root name={item.id!}
                                placeholder={item.placeholder?? undefined}
                                defaultValue={item.value ?? undefined}
                                radius="small" />
                        </fieldset>
                    </Flex>
                    <Dialog.Close>
                        
                        <Flex width="100%" direction="row" justify="center" gapX="2" mt="2">
                            <Button type="submit"
                                color={ButtonsStyle.COLOR_SAVE}
                                size={ButtonsStyle.BUTTON_SIZE}>
                                {OpConstants.OP_TEXT_SAVE}
                                <CheckIcon width={IconsStyle.DEF_HEIGHT}
                                                        height={IconsStyle.DEF_WIDTH} />
                            </Button>
                            <Button color={ButtonsStyle.COLOR_CLOSE}
                                size={ButtonsStyle.BUTTON_SIZE} >
                                {OpConstants.OP_TEXT_CANCEL}
                                <Cross2Icon width={IconsStyle.DEF_HEIGHT}
                                            height={IconsStyle.DEF_WIDTH} />
                            </Button>
                        </Flex>
 

                    </Dialog.Close>
                </form>
            </Dialog.Content>

        </Dialog.Root>
    )

}//end component

