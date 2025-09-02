import { forwardRef, useState, useImperativeHandle, useEffect, useRef } from "react";



export interface HtmlProgressBarProps {
    value: string;
    label?: string;
    classname?: string;
}
export function HtmlProgressBar({ value, classname, label }: HtmlProgressBarProps) {

    const progressBarWidth = `${value}%`;
    const containerClassName = `w-full rounded-full inset-shadow-sm inset-shadow-gray-500`;
    const barClassName = `rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 h-full shadow-md`;
    
    const renderContent = () => (
        <>
            {label && <label className="w-full">{label}</label>}
            <div className={containerClassName} style={{ height: '2.0rem' }}>
                <div
                    className={barClassName}
                    style={{ width: progressBarWidth, height: '1.9rem' }}
                ></div>
            </div>
        </>
    );
    return classname ?
        (<div className={classname}>{renderContent()}</div>)
        : (renderContent());
}

