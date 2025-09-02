//src\radix\bars\barcollitem.tsx

import React from 'react';
import { Flex } from "@radix-ui/themes";
import { OpConstants } from '@/common/constants';
import { DlgBtnIconDeleteConfirm } from '@/radix/dialog/dlgbtnicondelete';
import { XIconButton } from '@/radix/buttons/xiconbutton';
import { LIB_ICON } from '@/radix/rdxthicons';

/**
 * Jsx Comp Bar Collection Item
 *     - view icon button
 *     - delete icon button
 */
export interface BarCollItemProps {
    rowId: string;
    viewvisible?: boolean;
    disabled?: boolean;
    exeOperation: (operationId: string, itemId: string | null) => void
}
export function BarCollItem({rowId,viewvisible,disabled,exeOperation}:BarCollItemProps) {

    const showButtonView:boolean = viewvisible ?? true;

    return (
        <Flex direction="row" gapX="1" >
            {showButtonView ?
            <XIconButton 
                icon         = {LIB_ICON.OPEN}
                item         = {rowId} 
                operation    = {OpConstants.OP_OPEN}
                exeOperation = {exeOperation}
                disabled     = {disabled ?? false} /> : null}

            <DlgBtnIconDeleteConfirm
                title     = {OpConstants.TEXT_TITLE_DELETECONF}
                message   = {OpConstants.TEXT_MSG_DELETECONF}
                onconfirm = {() => exeOperation(OpConstants.OP_DELETE, rowId)}
                disabled  = {disabled ?? false} />
        </Flex>
    );

};//end component