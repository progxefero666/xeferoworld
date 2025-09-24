//src\radix\container\popover.ts

import React, { MouseEventHandler, useState } from "react";
import { Button, Flex, Popover } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

interface CompProps {
    label?: string;
    children?: React.ReactNode;
}

export const PopupBase = ({label, children }: CompProps) => {
    const [opened,setOpened] = useState<boolean>(true);

    const onOpen = (open: boolean) => {
        //alert(open);
    }

    const onClose = (btn: HTMLButtonElement) => {alert("close");
        setOpened(false);
    }

    return (
        <Popover.Root open={opened} 
                      onOpenChange={(open) => { onOpen(open) }} >
            <Popover.Content sideOffset={5} align="start">
                <Flex width="100%" direction="column" gap="2" >
                    {children}
                </Flex>
                <Popover.Close>
                    <Button size="1" onClick={() => { onClose }} >
                        <Cross1Icon />
                    </Button>
                </Popover.Close>
            </Popover.Content>
        </Popover.Root>
    );

}//end component
