//src\lib\audio\graph\audiocanvas.ts

import { Dim2d, Point2d, TRegionX } from 'src/lib/graph2d/types2d';
import { Line2d } from '@/lib/graph2d/model/line2d';
import { AudioPainter } from '@/audio/graph/audiopainter';
import { AudioMonitorCfg } from '@/audio/components/audiolabmoncfg';
import { AudioPart } from '../model/audiopart';
import { TDimension } from '@/common/types';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { XMath2d } from '@/math2d/xmath2d';

/**
 * class AudioCanvasUtil.getCanvasArrayRegion
 */
export class AudioCanvasUtil {

    public static getCanvasRegion(canvasDim:TDimension,audioBaseDuration:number,
                                  audioPart:AudioPart,color:string ):TRegionX {
        const percentStart:number = XMath2dUtil
                .getPercent100(audioBaseDuration,audioPart.timeStart); 
        const percentEnd:number = XMath2dUtil
                .getPercent100(audioBaseDuration,audioPart.timeEnd);
        return {
            start:XMath2dUtil.getValue100(canvasDim.width,percentStart),
            end:XMath2dUtil.getValue100(canvasDim.width,percentEnd),
            color:color};
    };//end 
    
    public static getCanvasArrayRegion(canvasDim:TDimension,audioBaseDuration:number,
                                  audioParts:AudioPart[] ):TRegionX[] {
        const cv_regions:TRegionX[] =[];
        const colorA:string = 'rgba(247, 124, 9, 0.5)';
        const colorB:string = 'rgba(84, 247, 9, 0.5)';
        for (let idx=0;idx<audioParts.length;idx++) {
            let color:string = colorA;
            if(!XMath2d.esPar(idx)) {color = colorB;}
            const elem = AudioCanvasUtil.getCanvasRegion
                (canvasDim,audioBaseDuration,audioParts[idx],color);   
            cv_regions.push(elem);                     
        }
        return cv_regions;
    };//end

};

/**
 * DiagramCanvas class
 */
export class AudioCanvas {

    public ctx: CanvasRenderingContext2D;
    public dim: Dim2d;
    public backcolor: string=AudioMonitorCfg.BACKCOLOR_DEFAULT;
    public painter:AudioPainter;
    public linePosition: Line2d= Line2d.DEF;

    public regions:TRegionX[] = [];
    
    constructor(ctx: CanvasRenderingContext2D, dimension: Dim2d) {
        this.ctx = ctx;
        this.dim = dimension;        
        this.updateLinePosition(0);  
        this.painter = new AudioPainter(ctx, dimension, this.backcolor);
        this.painter.drawAxisHorz()
    };//end
    
    public clear() {
        this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
    };

    public updateLinePosition(coordX:number) {
        const pointStart: Point2d = { x: coordX, y: 0 };
        const pointEnd: Point2d = { x: coordX, y: this.dim.height };
        this.linePosition = new Line2d(pointStart, pointEnd,"#ff0000" );
    };

    public updateRegions(regions:TRegionX[]) {
        this.regions = regions;
    };

    public render_a(graphpoints: Point2d[]) { 
        this.painter.fillback();
        this.painter.drawAxisHorz();        
        this.painter.drawPointsConnected(graphpoints,AudioMonitorCfg.WAVE_COLOR_DEF);
        this.painter.drawLine2d(this.linePosition);
        this.render_regions();
    };

    public render_regions() { 
        
        for(let idx=0;idx<this.regions.length;idx++) {            
            const dim: Dim2d = {width:this.regions[idx].end - this.regions[idx].start, 
                                height: this.dim.height};
            const point: Point2d = {
                x: this.regions[idx].start,y: 0
            };
            this.painter
                .fillRect(point,dim,this.regions[idx].color);
        }
    };

}//end class