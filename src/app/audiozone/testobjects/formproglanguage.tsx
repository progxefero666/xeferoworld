'use client';

import React, { useRef, useState, useEffect } from "react";
import { Button, Box, Flex, Text, Dialog, TextField } from "@radix-ui/themes";
import { ButtonsStyle, IconsStyle, TextStyle } from '@/radix/rdxtheme';
import { CheckIcon, Cross2Icon, FilePlusIcon } from "@radix-ui/react-icons";
import { InputField } from "@/common/model/inputfield";
import { TKeyvalue } from "@/common/types";
import { Constants, OpConstants } from "@/common/constants";
import { XInputText } from "@/radix/input/inptext";
import { XInputSelect } from "@/radix/input/inpselect";
import { XInputTextArea } from "@/radix/input/inptextarea";
import { XInputDate } from "@/radix/input/inpdate";
import { XInputCheck } from "@/radix/input/inpcheck";
import { XInputNumber } from "@/radix/input/inpnumber";
import { XInputDecimal } from "@/radix/input/inpdecimal";
import { XInputFile } from "@/radix/input/inpfile";

import { Validation } from "@/lib/forms/validations/validation";
import { Validator } from "@/lib/forms/validations/validator";

import { Proglanguage } from "@/db/model/proglanguage";

interface CompProps {
    isopen?: boolean;
    buttontext: string;
    title: string;
    entityinit: Proglanguage;
    onsubmit: (entity: Proglanguage) => void;
    oncancel?: () => void;
}
export const Form_Proglanguage = ({ buttontext, title, entityinit, onsubmit, oncancel  }: CompProps) => {

    const entity:Proglanguage = entityinit;
    const nameRef = useRef<HTMLInputElement>(null);

    const validate = (): boolean => {
        let validation:Validation = Validation.DEFAULT;
        validation = Validator.ValidateText(
            "XForms.TT_DEFAULT",nameRef.current!.value,2,16
        );
        if(validation.result !== Constants.SUCCESS) {
            alert(validation.message);
            return false;
        };

        return true;
    };//end

    const onFormSubmit = () => {
        if (!validate()) { return; }

        if(!validate()) {return;}
        entity.name = nameRef.current!.value;

        onsubmit(entity);
    };//end

    const onFormCancel = () => {if (oncancel) {oncancel();}};

    return (

        <Dialog.Root>

            <Dialog.Trigger>

                <Button
                    size={ButtonsStyle.BUTTON_SIZE}
                    color={ButtonsStyle.COLOR_ADD}
                    radius={ButtonsStyle.BUTTON_RADIUS}
                    variant={ButtonsStyle.BUTTON_VAR}>

                    <FilePlusIcon   width={IconsStyle.DEF_HEIGHT}
                                    height={IconsStyle.DEF_WIDTH} />
                    <Text size={ButtonsStyle.TEXT_SIZE}
                          color={ButtonsStyle.COLOR_ADD}>
                        {buttontext}
                    </Text>

                </Button>

            </Dialog.Trigger>

            <Dialog.Content>

                <Dialog.Title>
                    <Text size={TextStyle.SIZE_TITLE_DIALOG}
                          color={TextStyle.COLOR_HEADER}>
                        {title}
                    </Text>
                </Dialog.Title>

                <Flex width="100%" direction="column" gapY="2" >

                    <XInputText 
                        ref={nameRef}
                        name="name"
                        label="Name"
                        minlen={2}
                        maxlen={16} />

                </Flex>

                <Dialog.Close>

                    <Flex width="100%" direction="row" justify="center" gapX="2" mt="2">

                        <Button type="submit" onClick={onFormSubmit}
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

            </Dialog.Content>

        </Dialog.Root>
    )

};//end component