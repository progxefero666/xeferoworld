


import { TDimension } from "@/common/types";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

/*
preload="none"
*/

export interface HmtlVideoPlayerIf {
    dimension: TDimension;
    mimetype: string;
    src: string;
    onclick?: (operation: string) => void;
    contclass?: string;
}
export interface HtmlVideoPlayerRefIf {
    play: () => void;
    stop: () => void;
}

export const HtmlVideoPlayer = forwardRef<HtmlVideoPlayerRefIf, HmtlVideoPlayerIf>(({ dimension, mimetype, src, onclick, contclass }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const [running, setRunning] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        play: () => {
          if (videoRef.current) videoRef.current.play();
        },
        pause: () => {
          if (videoRef.current) videoRef.current.pause();
        },
        stop: () => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        },
      }));

    const handleOnLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
    
        console.log('Metadatos cargados:');
        console.log('Duración:', video.duration);
        console.log('Resolución:', video.videoWidth, 'x', video.videoHeight);
        console.log('MIME Type (extensión):', src.split('.').pop()?.toLowerCase());
    
        // Opcional: ajustar tamaño automático
        if (video && (!video.width || video.width === 0)) {
          video.width = video.videoWidth;
          video.height = video.videoHeight;
        }
      };
    

    const onHandlePlay = () => {
        console.log('El video ha comenzado a reproducirse');
    };

    const onHandlePause = () => {
        console.log('El video se ha pausado');
    };

    const onHandleEnded = () => {
        console.log('El video ha terminado');
    };

    const onHandleTimeUpdate = () => {
        //if (videoRef.current) {

    };
    const handleProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        const buffered = video.buffered;
      
        if (buffered.length > 0) {
          const bufferedEnd = buffered.end(buffered.length - 1);
          console.log(`Video cargado hasta: ${bufferedEnd} segundos`);
        }
      };
    const onHandleError = () => {
        console.error('Hubo un error con el video');
    };


    const renderContent = () => (
        <>
            <video width={dimension.width} height={dimension.height} controls
                  onPlay={onHandlePlay}
                  onPause={onHandlePause}
                  onEnded={onHandleEnded}
                  onTimeUpdate={onHandleTimeUpdate}
                  onError={onHandleError}
                  onProgress={handleProgress}
                  onLoadedMetadata={handleOnLoadedMetadata}
                  ref={videoRef} >
                <source src={src} type={mimetype}></source>
            </video>
        </>
    );
    return contclass ? (<div className={contclass}>{renderContent()}</div>)
        : (renderContent());

});//end component

