//src\layouts\lyconttwocol.tsx


import { Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";

/**
 * Page Main Content Layout One Column
 */
interface LayoutOneColumnProps {
    children: React.ReactNode;
};
export function LayoutOneColumn({ children }: LayoutOneColumnProps) {

    return (
        <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >
            <Flex width="100%"  direction="column" px="3" py="1" mb="2" 
                 style={RdxThContainers.PRIMARY_CONTENT}>     
                {children}                   
            </Flex>
        </Flex>
    )
    
}//end page