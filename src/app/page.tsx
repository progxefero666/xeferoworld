'use client';


import { useEffect } from "react";
import { Grid, Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";


const LAYOUT_DEF = {
    background: 'rgba(0, 0, 0, 1)'
};

const PRIMBAR_STYLE = {
    background: 'rgba(198, 17, 17, 1)'
};

const header_CONTENT = {
    backgroundColor: 'rgba(0, 0, 0, 1)'
};


/**
 * PageXeThreeIde
 */
export default function PageXeThreeIde()  {


    useEffect(() => {

    }, []);
        
    //const loadSection = (sectionId: string) => {};

    return (
        
        <Grid height="100vh" rows="auto 1fr" columns="16% 80% 4%" style={LAYOUT_DEF}>

            <Flex height="40px" gridColumn="1/4" gridRow="1" >                
                <Flex width="100%" direction="column" gapY="2" 
                    style={header_CONTENT} >
                    Xefero I
                </Flex>
            </Flex>

            <Flex gridColumn="1" gridRow="2" style={PRIMBAR_STYLE}>
                Side Bar
            </Flex>

            <Flex gridColumn="2" gridRow="2" >
                Main Content
            </Flex>

            <Flex gridColumn="3" gridRow="2" >
                rbar
            </Flex>

        </Grid>
    );

}//end page
