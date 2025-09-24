//src\zone3d\three\geoutil.ts


import * as THREE from 'three'
import { Vector3d } from '@/common/types';
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import { GenColorMaterial } from '../materials/genmatcolor';



/**
 *class ThreeGenSpheres.generateSphere
 */
export class ThreeGenSpheres {  

    public static MINISPHERES_RADIUS_MIN: number = 0.005;
    public static MINISPHERES_RADIUS_MAX: number = 0.6;

    public static generateSphere(center:Vector3d,radius:number,subdiv:number,color:any): THREE.Mesh {       
        //const spCenter: Vector3d = System3d.CC;
        const geometry = new THREE.SphereGeometry(radius,subdiv,subdiv);
        const material:THREE.MeshStandardMaterial = GenColorMaterial.getStandardMaterial(color,0.3,0.7);
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(center.x,center.y,center.z);
        return sphere;
    };//end

    public static generateSphereAtCC(radius:number,subdiv:number,color:any): THREE.Mesh {       
        //const spCenter: Vector3d = System3d.CC;
        const geometry = new THREE.SphereGeometry(radius,subdiv,subdiv);
        const material:THREE.MeshStandardMaterial = GenColorMaterial.getStandardMaterial(color,0.3,0.7);
        const sphere = new THREE.Mesh(geometry, material);
        return sphere;
    };//end


    //const textureLoader = new THREE.TextureLoader();
    //new THREE.MeshStandardMaterial( { map: THREE.ImageUtils.loadTexture('images/earth.jpg') } );


    public static generateTextureSphere(radius:number,subdiv:number,texture: HTMLImageElement): THREE.Mesh {       
        const geometry = new THREE.SphereGeometry(radius, subdiv, subdiv);
        
        // Crear textura Three.js desde HTMLImageElement
        const threeTexture = new THREE.Texture(texture);
        threeTexture.needsUpdate = true; // Importante para que se actualice
        
        // Configurar propiedades de textura para mejor calidad
        threeTexture.wrapS = THREE.RepeatWrapping;
        threeTexture.wrapT = THREE.RepeatWrapping;
        threeTexture.minFilter = THREE.LinearMipmapLinearFilter;
        threeTexture.magFilter = THREE.LinearFilter;
        
        // Material de alta calidad con textura
        const material = new THREE.MeshStandardMaterial({
            map: threeTexture,
            roughness: 0.7,
            metalness: 0.1
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        return sphere;
    };//end

    /**
     * get THREE.PlaneGeometry
     */
    public static getAleatMiniSphereRadius(): number {
        const range: number = ThreeGenSpheres.MINISPHERES_RADIUS_MAX - ThreeGenSpheres.MINISPHERES_RADIUS_MIN;
        return (range) * Math.random() + ThreeGenSpheres.MINISPHERES_RADIUS_MIN;
    };//end

    public static getAleatMiniSphere(spCenter:Vector3d,
                                     spRadiusMin:number,
                                     spRadiusMax:number,
                                     color?: THREE.ColorRepresentation): THREE.Mesh {

        const aleatPosition = Math3dUtil.getAleatorySpherePoint(spCenter, spRadiusMin, spRadiusMax);
        const radius: number = ThreeGenSpheres.getAleatMiniSphereRadius();
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: color || 0xffffff });

        const miniSphere = new THREE.Mesh(geometry, material);
        miniSphere.position.set(aleatPosition.x, aleatPosition.y, aleatPosition.z);
        return miniSphere;
    };//end

    public static getAleatMiniSpheres(countObjects: number,
                                      spCenter:Vector3d,
                                      spRadiusMin:number,
                                      spRadiusMax:number): THREE.Mesh[] {
        const miniSpheres: THREE.Mesh[] = [];
        for (let objIndex = 0; objIndex < countObjects; objIndex++) {
            const miniSphere = ThreeGenSpheres.getAleatMiniSphere(spCenter,spRadiusMin,spRadiusMax);
            miniSpheres.push(miniSphere);
        }
        return miniSpheres;
    };//end    

    /*
        const loadTestObjectsB = async() => {
            const geo = new THREE.BoxGeometry(2, 2, 2);
            const points = new THREE.Points(geo);
            scene!.add(points);
            scene!.add(new THREE.GridHelper(10, 10));
        };//end
const material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );
scene.add( line );        
    */
    
};//end class