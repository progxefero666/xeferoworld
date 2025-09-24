
import { TDimension } from "@/common/types";
import { forwardRef, useRef, useState, useImperativeHandle, useEffect } from "react";



import 'video.js/dist/video-js.css';



/*

playerRef.current?.muted(true);
*/
export interface VideoPlayerIf {
    dimension: TDimension;
    mimetype: string;
    src: string;
    onclick?: (operation: string) => void;
    contclass?: string;
}
export interface VideoPlayerRefIf {
    play: () => void;
    pause: () => void;
}
export type VideoJsPlayer = ReturnType<typeof videojs>;

export const VideoPlayer = forwardRef<VideoPlayerRefIf, VideoPlayerIf>(
    ({ dimension, mimetype, src, onclick, contclass }, ref) => {

    const [running, setRunning] = useState<boolean>(false);    
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<VideoJsPlayer>(null);

    const videoOptions = {
        autoplay: false, 
        controls: true,  
        muted: true,
        fluid: false,  
        controlBar: {
            volumePanel: { inline: true }
        },        
        width: dimension.width,  
        height: dimension.height,  
        sources: [{
          src: src,
          type: mimetype,
        }],
    }
          
    useImperativeHandle(ref, () => ({
        play: () => {
            playerRef.current!.play(); 
        },
        pause: () => {
            playerRef.current!.pause();
        }
    }));

 

    useEffect(() => {
                
        playerRef.current = videojs(videoRef.current!, videoOptions);
        
        playerRef.current.on("ended", () => {
            //console.log("El vídeo terminó");
            setRunning(false);
        });
        
        playerRef.current.on("play", () => {
            setRunning(true);
        });
        playerRef.current.on("pause", () => {
            setRunning(false);
        });
        playerRef.current.on("error", () => {
            setRunning(false);
            console.log("error", playerRef.current?.error());
        });
        playerRef.current?.on("loadedmetadata", () => {
            const videoElement = playerRef.current?.el() as HTMLVideoElement;
            console.log("Duración del video:", videoElement.duration, "segundos");
            console.log("Ancho del video:", videoElement.videoWidth, "px");
            console.log("Alto del video:", videoElement.videoHeight, "px");
        });
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, []);

    const renderContent = () => (
        <>
            <video ref={videoRef} className="video-js" />
        </>
    );
    return contclass ? (<div className={contclass}>{renderContent()}</div>)
                     : (renderContent());
});//end component


function videojs(arg0: HTMLVideoElement, videoOptions: { autoplay: boolean; controls: boolean; muted: boolean; fluid: boolean; controlBar: { volumePanel: { inline: boolean; }; }; width: number; height: number; sources: { src: string; type: string; }[]; }): any {
    throw new Error("Function not implemented.");
}

