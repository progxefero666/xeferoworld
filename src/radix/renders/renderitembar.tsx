//src\radix\renders\renderbuttons.tsx

import React from 'react';
import { Text, Button, Flex, IconButton } from "@radix-ui/themes";
import { ButtonsStyle, IconsStyle } from "@/radix/rdxtheme";
import { ArrowDownIcon, ArrowUpIcon, CheckCircledIcon, EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { OpConstants } from '@/common/constants';
import { DlgBtnIconDeleteConfirm } from '@/radix/dialog/dlgbtnicondelete';
import { RdxThContainers } from '@/radix/rdxthcontainers';
import { RadixConf } from '@/radix/rdxconf';
import { DlgBtnDeleteConfirm } from '@/radix/dialog/dlgbtndelete';
import { XIconButton } from '../buttons/xiconbutton';
import { LIB_ICON } from '../rdxthicons';

/*
export const renderIconButton = (icon:string) => {
    return (
        {icon}  
    );
};
*/

export const renderButton = (text: string,
    color: any,
    icon: React.ReactNode,
    commandId: string,
    onClick: (commandId: String) => void) => {
    return (
        <Button color={color}
            size={ButtonsStyle.BUTTON_SIZE}
            radius={ButtonsStyle.BUTTON_RADIUS}
            onClick={(e) => onClick(commandId)}>
            {icon}
            <Text color={ButtonsStyle.TEXT_COLOR}
                size={ButtonsStyle.BUTTON_SIZE}>{text}</Text>
        </Button>
    );
};//end

export const renderItemBarNoEdit = (rowId: string,
                                    exeOperation: (operationId:string,itemId:string|null) => void,
                                    showViewButton: boolean,
                                    showMoveButtons: boolean) => {

    let btnDeleteDisabled: boolean = false;
    let btnMoveUpDisabled: boolean = false;
    let btnMoveDownDisabled: boolean = false;

    return (
        <Flex direction="row" gapX="1" >

            {showViewButton ?
            <XIconButton icon={LIB_ICON.OPEN}
                            operation={OpConstants.OP_OPEN}
                            exeOperation={exeOperation}
                            item={rowId} /> : null}

            <DlgBtnIconDeleteConfirm
                title="Delete operation"
                message="Are you sure you want to delete item?"
                onconfirm={() => exeOperation(OpConstants.OP_DELETE,rowId)}
                disabled={btnDeleteDisabled} />

            {showMoveButtons ?
            <>
                <XIconButton icon={LIB_ICON.MOVE_UP}
                                item={rowId}
                                operation={OpConstants.OP_MOVE_UP}
                                exeOperation={exeOperation}                                
                                disabled={btnMoveUpDisabled} />  

                <XIconButton icon={LIB_ICON.MOVE_DOWN}
                                item={rowId}
                                operation={OpConstants.OP_MOVE_DOWN}
                                exeOperation={exeOperation}                             
                                disabled={btnMoveDownDisabled} />
            </>: null}

        </Flex>
    )

};//end

export const renderItemBarDefault = (rowIndex: number,
    exeOperation: (rowIndex: number, operationId: string) => void) => {

    const showViewButton: boolean = true;
    const showEditButton: boolean = false;
    const showSaveButton: boolean = false;

    let btnEditDisabled: boolean = false;
    let btnDeleteDisabled: boolean = false;
    let btnMoveUpDisabled: boolean = false;
    let btnMoveDownDisabled: boolean = false;

    return (
        <Flex direction="row" gapX="1" >

            {showViewButton ?
                <IconButton
                    size={IconsStyle.DEF_SIZE}
                    onClick={() => { exeOperation(rowIndex, OpConstants.OP_OPEN) }} >
                    <EyeOpenIcon />
                </IconButton> : null}

            {showEditButton ?
                <IconButton
                    size={IconsStyle.DEF_SIZE}
                    onClick={() => { exeOperation(rowIndex, OpConstants.OP_EDIT) }}
                    disabled={btnEditDisabled}>
                    <Pencil2Icon />
                </IconButton> : null}

            {showSaveButton ?
                <IconButton
                    size={IconsStyle.DEF_SIZE}
                    onClick={() => { exeOperation(rowIndex, OpConstants.OP_SAVE) }}
                    disabled={false} >
                    <CheckCircledIcon />
                </IconButton> : null}

            <DlgBtnIconDeleteConfirm
                title="Delete operation"
                message="Are you sure you want to delete item?"
                onconfirm={() => exeOperation(rowIndex, OpConstants.OP_DELETE)}
                disabled={btnDeleteDisabled} />

            <IconButton
                size={IconsStyle.DEF_SIZE}
                onClick={() => { exeOperation(rowIndex, OpConstants.OP_MOVE_UP) }}
                disabled={btnMoveUpDisabled} >
                <ArrowUpIcon />
            </IconButton>

            <IconButton
                size={IconsStyle.DEF_SIZE}
                onClick={() => { exeOperation(rowIndex, OpConstants.OP_MOVE_DOWN) }}
                disabled={btnMoveDownDisabled} >
                <ArrowDownIcon />
            </IconButton>

        </Flex>
    )
};//end

export const renderCollCrudBarButtons = (exeCrudCollOperation: (index: number, operationId: string) => void) => {

    return (
        <Flex width="100%" direction="row" justify="center" gapX="2" py="2"
            style={RdxThContainers.CRUD_BAR} >
            <Button color={ButtonsStyle.COLOR_ADD}
                size={ButtonsStyle.BUTTON_SIZE}
                radius={ButtonsStyle.BUTTON_RADIUS}
                onClick={() => exeCrudCollOperation(-1, OpConstants.OP_ADD)}>
                <Text size={ButtonsStyle.TEXT_SIZE}>
                    {OpConstants.OP_TEXT_ADD}
                </Text>
                <TrashIcon width={IconsStyle.DEF_HEIGHT}
                    height={IconsStyle.DEF_WIDTH} />
            </Button>
            <DlgBtnDeleteConfirm 
                icon={LIB_ICON.DELETE_ALL}
                text={OpConstants.OP_TEXT_DELETE_ALL}
                message="confirm clear all?"
                title="Clear Task Types"
                onconfirm={() => (exeCrudCollOperation(-1, OpConstants.OP_DELETE_ALL))} />
        </Flex>
    )
};//end
