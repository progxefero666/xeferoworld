//src\universo3d\game\player\playertarget.ts

import * as THREE from 'three';
import { Point2d } from '@/common/types';
import { CircunfUtil } from '@/math2d/functions/circunfutil';

const targetConfig = {
    radiusExt: 5.0,
    radiusInt:3.3,
    radiusRects:3.9,
    rectsLen:4.3,
    rectsWidth:0.4,
    tourusWidth: 0.1,
    centerRectsWidth:0.3,
    centerSpRadius:0.25
};

/**
 * class PlayerTarget
 */
export class PlayerTarget {
    
    //public position:Vector3d = System3d.CC;
    public parent:THREE.Group;
    public tourusExt:THREE.Mesh;
    public tourusInt:THREE.Mesh;
    public rects:THREE.Mesh[];

    constructor(){
        
        const tourusExtMat:THREE.MeshBasicMaterial=  new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            opacity: 0.8, 
            toneMapped:false,
            depthTest:false,
            depthWrite:false
        });
        const tourusIntMat:THREE.MeshBasicMaterial=  new THREE.MeshBasicMaterial({
            color: 0xFF0000,
            opacity: 0.8, 
            toneMapped:false,
            depthTest:false,
            depthWrite:false
        });
        this.tourusExt = new THREE.Mesh(
            new THREE.TorusGeometry(targetConfig.radiusExt,targetConfig.tourusWidth,16,64),tourusExtMat);

        this.tourusInt = new THREE.Mesh
            (new THREE.TorusGeometry(targetConfig.radiusInt,targetConfig.tourusWidth,16,64),tourusIntMat);  
        
        this.rects = this.getRects();

        const centerRectA:THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.5,targetConfig.centerRectsWidth,targetConfig.centerRectsWidth),
            tourusExtMat);  
        
        const centerRectB:THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.5,targetConfig.centerRectsWidth,targetConfig.centerRectsWidth),
            tourusExtMat);              
        
        centerRectA.rotateZ(Math.PI/4);
        centerRectB.rotateZ((-1)*(Math.PI/4));        

        this.parent = new THREE.Group();
        this.parent.add(this.tourusExt);
        this.parent.add(this.tourusInt);
        this.parent.add(centerRectA);
        this.parent.add(centerRectB);
        for(let idx=0;idx<this.rects.length;idx++){
            this.parent.add(this.rects[idx]);
        }

    }//end 

    public getRects():THREE.Mesh[] {
        
        const rectsMaterial:THREE.MeshBasicMaterial=  new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            opacity: 0.8, 
            toneMapped:false,
            depthTest:false,
            depthWrite:false
        });
        const rectsA:THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(targetConfig.rectsLen,targetConfig.rectsWidth,targetConfig.rectsWidth),
            rectsMaterial);                
        const rectsB:THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(targetConfig.rectsWidth,targetConfig.rectsLen,targetConfig.rectsWidth),
            rectsMaterial);       
        const rectsC:THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(targetConfig.rectsLen,targetConfig.rectsWidth,targetConfig.rectsWidth),
            rectsMaterial);        
        const rectsD:THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(targetConfig.rectsWidth,targetConfig.rectsLen,targetConfig.rectsWidth),
            rectsMaterial);

        const cfPoints:Point2d[] = CircunfUtil.getCfPoints({x:0,y:0},targetConfig.radiusRects,4);         
        rectsA.position.set(cfPoints[0].x,cfPoints[0].y,0);
        rectsB.position.set(cfPoints[1].x,cfPoints[1].y,0);
        rectsC.position.set(cfPoints[2].x,cfPoints[2].y,0);    
        rectsD.position.set(cfPoints[3].x,cfPoints[3].y,0);

        return [rectsA,rectsB,rectsC,rectsD];
    }//end

}//end

/*

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
const fontLoader = new FontLoader();();

fontLoader.load('path/to/font.json', (font) => {
    const textGeometry = new TextGeometry('X', {
        font: font,
        size: 0.1,      // Tamaño
        height: 0.001,  // Grosor (muy poco para mirilla)
        curveSegments: 2, // Menos segmentos = más rendimiento
    });
    
    const textMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        toneMapped: false,
        depthTest: false,
        depthWrite: false
    });
    
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
    // Centrar el texto
    textGeometry.computeBoundingBox();
    const centerX = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    const centerY = -0.5 * (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y);
    textMesh.position.set(centerX, centerY, 0);
    
    mirilla.add(textMesh);
});
*/