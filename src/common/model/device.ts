//src\common\device.ts

export class Device {
    public size: string = "undefined";
    public platform: string | null = null;
    public width: number = 0;
    public height: number = 0;
    public pixelratio: number | null = null;
    public resolution: string | null = null;
    public os: string | null = null;
    public useragent: string | null = null;
    public istouchdevice: boolean = false;
    public devicetype: string | null = null;
    public model: string | null = null;

    //not modify
    constructor() {}

    getJsonString = ():any => {
        const jsonString = JSON.stringify(this);
        return jsonString
    }    

    public static fromJson(jsonString: string): Device {
        const parsedData = JSON.parse(jsonString);
        const device = new Device();
        
        // Copia todas las propiedades del JSON al objeto
        Object.assign(device, parsedData);
        
        return device;
    }

}//end class

    /*.........................................................................
    static DEVICE:string  = "device";
    public static isDeviceCharged(): boolean {
        return StorageService.exist(AppContext.DEVICE);
    }    
    public static saveDevice(device: Device): void {
        StorageService.save(AppContext.DEVICE,device.getJsonString());
    }
    public static readDevice(): Device {
        const device =  StorageService.read(AppContext.DEVICE);
        if(device){return Device.fromJson(device??null);}
        else {return new Device();}       
    }
    .........................................................................*/