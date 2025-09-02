//src\layouts\lyconttwocol.tsx


import { Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";

/**
 * Page Main Content Layout Two Columns
 */
interface LayoutProps {
    childrenleft?: React.ReactNode;
    childrenright?: React.ReactNode;
};
export function LayoutTwoColumns({ childrenleft, childrenright }: LayoutProps) {

    return (
        <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >

            <Flex width="40%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.PRIMARY_CONTENT}>     
                {childrenleft}                   
            </Flex>

            <Flex width="60%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.SECONDARY_CONTENT}>
                {childrenright}
            </Flex>

        </Flex>
    )
    

}//end page