//src\workflows\workflowscfg.ts
import { Keyvalue } from "@/common/keyvalue";
import { NumberParameter } from "@/common/numberparam";
import { Option } from "@/common/option";
import { TDimension, TRange } from "@/common/types";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { TextureConfig } from "@/terrains/model/textureconfig";

/**
 * class Terrains3dConfig.IMAGE_SIZE_DEF
 */
export class Terrains3dConfig {
    
    public static BACK_COLOR:any = '#ffffffff';

    // Sections
    public static readonly SECTION_HEIGHTMAP: string = "genheightmap";
    public static readonly SECTION_TEXTURE: string = "gentexture";
    public static readonly SECTION_TEST: string = "generator_test";

    public static readonly SECTIONS: Option[] = [
        new Option(Terrains3dConfig.SECTION_HEIGHTMAP, "Gen. Model"),
        new Option(Terrains3dConfig.SECTION_TEXTURE, "Gen. Texture"),
        new Option(Terrains3dConfig.SECTION_TEST, "Test")        
    ];

    // texture image
    public static IMAGE_TYPES:Keyvalue[] = [
        new Keyvalue('png', 'PNG'),
        new Keyvalue('jpg', 'JPG')
    ];
    public static IMAGE_TYPE_DEF:string = "png";
 

    public static IMAGE_SIZE_RANGE:TRange = {min:512,max:4098};
    public static IMAGE_SIZE_DEF:number = 600;
    public static IMAGE_SIZE_STEP:number = 100;

    // terrain model config
    public static TERR_SIDE_LENGTH:number = 100;
    public static TERR_SUBDIVISIONS:number = 200;
    public static TERR_MAX_HEIGHT:number = 10;

    public static DEF_TERRAIN_CONFIG: HeightMapTerrainConfig = new HeightMapTerrainConfig(
        Terrains3dConfig.TERR_SIDE_LENGTH,
        Terrains3dConfig.TERR_SUBDIVISIONS,
        Terrains3dConfig.TERR_MAX_HEIGHT);
    //121203
    //count vertices 40401 -->201 x 201

    // gradients config
    public static GRADRANGE_COUNTELEMS: NumberParameter
        = new NumberParameter("count_new_elements","Count Elems",{min:1,max:20},3,1);

    public static GRADRANGE_INTENSITY: NumberParameter 
        = new NumberParameter("gradrange_intensity","Intensity",{min:0.05,max:1.0},0.5,0.2);

    public static GRADRANGE_RADIUS: NumberParameter 
        = new NumberParameter("gradrange_radius","Radius",{min:0.1,max:0.5},0.25,0.1);

    public static GRADRANGE_SCALE_X: NumberParameter 
        = new NumberParameter("gradrange_scale_x","Scale X",{min:0.25,max:1.0},0.5,0.1);
           
    public static GRADRANGE_SCALE_Y: NumberParameter 
        = new NumberParameter("gradrange_scale_y","Scale Y",{min:0.25,max:1.0},0.5,0.1);

    public static GRADRANGE_ROTATION: NumberParameter 
        = new NumberParameter("gradrange_rotation","Rotation",{min:0.0,max:360.0},0.0,1);

    public static GRADRANGE_POSITION_X: NumberParameter 
        = new NumberParameter("gradrange_position_x","Position X",{min:0.0,max:1.0},0.0,0.1);
    
    public static GRADRANGE_POSITION_Y: NumberParameter 
        = new NumberParameter("gradrange_position_y","Position Y",{min:0.0,max:1.0},0.0,0.1);

    public static CANVAS_HEIGHTMAP_DIM: TDimension = { width: 512, height: 512 };
    public static GLMONITOR_HEIGHTMAP_DIM: TDimension = { width: 512, height: 512 };

    // color material config    
    public static WATER_COLOR:string = '#0505ff';
    public static RANGES_BIAS:number = 0.5;
    public static RANGES_COLOR_0:string = '#f0ab7a';
    public static RANGES_COLOR_1:string = '#379600';
    public static RANGES_COLOR_2:string = '#6c4a00';

    public static TEXTCOLOR_CONFIG: TextureConfig = {
        sideImage: Terrains3dConfig.IMAGE_SIZE_DEF,
        backcolor: Terrains3dConfig.WATER_COLOR,
        rampcolor: {
            start: Terrains3dConfig.RANGES_COLOR_0, 
            middle: Terrains3dConfig.RANGES_COLOR_1,
            end: Terrains3dConfig.RANGES_COLOR_2,           
        },
        bias: Terrains3dConfig.RANGES_BIAS,
        scale: 100,
    };    
    
};//end class
