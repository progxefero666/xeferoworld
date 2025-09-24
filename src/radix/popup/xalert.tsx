//

import { Callout, Text } from "@radix-ui/themes";
import { XTextStyle } from "@/radix/rdxtypes";
import { TextStyle } from "@/radix/rdxtheme";
import { ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";


/**
 * XText component for:
 *   display text with theme style.
 */
interface XModalMessageProps {
    msgtype?: string; //default "info"
    value: string;
    //style: XTextStyle
};
export function XModalMessage({ msgtype, value }: XModalMessageProps) {

    const mode: string = msgtype ? msgtype : "info";
    const xstyle: XTextStyle = TextStyle.ST_DEF;


    const showMessageInfo = () => {
        return (
            <Callout.Root color="blue" size="2" >
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    <Text size={xstyle.size} color={xstyle.color} style={xstyle.style} >
                        {value}
                    </Text>
                </Callout.Text>
            </Callout.Root>            
        )
    };//end

    const showMessageError = () => {
        return (
            <Callout.Root color="brown" size="2" role="alert" >
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text >
                    <Text size={xstyle.size} color="yellow" style={xstyle.style} >
                        {value}
                    </Text>
                </Callout.Text>
            </Callout.Root>            
        )
    };//end

    return (
        <>
            {mode === "info" && showMessageInfo()}
            {mode === "error" && showMessageError()}
        </>
    );

}//end component