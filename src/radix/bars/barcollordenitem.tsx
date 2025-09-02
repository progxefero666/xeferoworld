//src\radix\bars\barcollitem.tsx

import React from 'react';

import {  Flex } from "@radix-ui/themes";
import { OpConstants } from '@/common/constants';
import { DlgBtnIconDeleteConfirm } from '@/radix/dialog/dlgbtnicondelete';
import { XIconButton } from '../buttons/xiconbutton';
import { LIB_ICON } from '../rdxthicons';

/**
 * Jsx Comp BarCollectionItem
 */
export interface CompProps {
    rowId: string;
    viewvisible?: boolean;
    deletedisabled: boolean;
    moveupdisabled?: boolean;
    movedowndisabled?: boolean;
    exeOperation: (operationId: string, itemId: string | null) => void
}
export default function BarCollOrdenedItem({ rowId,
                                            viewvisible, deletedisabled,
                                            moveupdisabled, movedowndisabled,
                                            exeOperation }: CompProps) {
    return (
        <Flex direction="row" gapX="1" >

            {viewvisible ?
            <XIconButton 
                icon={LIB_ICON.OPEN}
                item={rowId} 
                operation={OpConstants.OP_OPEN}
                exeOperation={exeOperation}/> : null}

            <DlgBtnIconDeleteConfirm
                title="Delete operation"
                message="Are you sure you want to delete item?"
                onconfirm={() => exeOperation(OpConstants.OP_DELETE, rowId)}
                disabled={deletedisabled} />

            <XIconButton 
                icon={LIB_ICON.MOVE_UP}
                item={rowId}
                operation={OpConstants.OP_MOVE_UP}
                exeOperation={exeOperation}
                disabled={moveupdisabled} />

            <XIconButton icon={LIB_ICON.MOVE_DOWN}
                item={rowId}
                operation={OpConstants.OP_MOVE_DOWN}
                exeOperation={exeOperation}
                disabled={movedowndisabled} />

        </Flex>
    )
};//end component