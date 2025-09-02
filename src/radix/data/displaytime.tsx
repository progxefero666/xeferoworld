import { TimeUtil } from "@/common/helper/timeutil";



const DigitalSep = ({ value }: { value: string }) => (
    <span className="w-auto px-0 py-0 mx-0 my-0 text-green-400 font-mono">{value}</span>
);

const DigitDisplay = ({ value }: { value: number }) => {
    const strvalue: string = TimeUtil.getFillNumberString(value);  
    return (
        <div className=" text-lg
          w-auto h-[30px] px-1 py-0 mx-0 my-0
          bg-gray-900 rounded-sm 
          border-1 border-gray-500 
          flex items-center
          text-green-400 font-mono font-bold 
          shadow-inner shadow-gray-800 ">
            {strvalue}
        </div>
    );
};

interface DigitalIfcTimeDisplay {
    seconds: number;
    showHours?: boolean;
    classname?: string;
    label?: string;
}
export const DigitalTimeDisplay = ({ seconds, showHours = false, classname, label }: DigitalIfcTimeDisplay) => {
    //const timeParts = TimeUtil.formatDigitalTime(seconds, showHours);
    let timeParts:number[] = [0,0];
    if(showHours){
        timeParts = TimeUtil.getObjHourAndMinAndSec(seconds);
    }
    else {
        timeParts = TimeUtil.getObjMinAndSec(seconds);
    }
    
    const renderContent = () => (
        <>
            {label && <label className="w-full">{label}</label>}
            <div className="digitaldisplay flex items-center bg-black px-1">
                {showHours ? 
                    <>
                        <DigitDisplay value={timeParts[0]}  />
                        <DigitalSep value={":"} />
                        <DigitDisplay value={timeParts[1]} />
                        <DigitalSep value={":"} />
                        <DigitDisplay value={timeParts[2]} />                        
                    </>
                :   <>
                        <DigitDisplay value={timeParts[0]} />
                        <DigitalSep value={":"} />
                        <DigitDisplay value={timeParts[1]} />
                    </> }
            </div>
        </>
    );

    return classname ? (
        <div className={classname}>{renderContent()}</div>
    ) : (
        renderContent()
    );
};