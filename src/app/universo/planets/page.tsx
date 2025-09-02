"use client"

import { useState } from "react"
import { Text,Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { LayoutPrimaryBar } from "@/layouts/lyprimarybar";
import { PlanetsConfig } from "./planetcfg";
import { PlanetaryTextureGenerator } from "@/app/zone3d/planets/generation/planetsgeneator";
import { PlanetaryTextureEditor } from "@/app/zone3d/planets/edition/planetseditor";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";

type ModuleView = "generacion" | "edicion";

export default function PlanetsPage() {

    const [section, setSection] = useState<string>(PlanetsConfig.SECTIONS[0].id);
    const [editionTextureData, setEditionTextureData] = useState<ImageData | null>(null);

    const [isEditionEnabled, setIsEditionEnabled] = useState(false);

    const loadSection = (sectionId: string) => {
        setSection(sectionId);
    };//end
    
    const enableEdition = (textureData: ImageData | null) => {
        setEditionTextureData(textureData);
        setIsEditionEnabled(true);
        setSection(PlanetsConfig.SC_EDITION);
    };//end

    const headerContent = () => {
        return(
            <Flex direction="row"align="center"  gapX="2" px="4" >
                <Text size="3" weight="bold" color="gray">
                    Xefero Computing
                </Text>
            </Flex>        
        );
    };//end

    const renderContent = () => {
        if(section===PlanetsConfig.SC_GENERATION){
            return <PlanetaryTextureGenerator onEnableEdition={enableEdition} />
        }
        else if(section===PlanetsConfig.SC_EDITION){
            return <PlanetaryTextureEditor initialTextureData={editionTextureData} />
        }        
    };//end

    return (
        <LayoutPageOneColumn 
            headertitle   = {"Welcome"} 
            headercontent = {headerContent()}
            main          = {renderContent()}
            options       = {PlanetsConfig.SECTIONS}
            onselection   = {loadSection} />
    )

};//end

/*
        <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >
            <LayoutPrimaryBar options={PlanetsConfig.SECTIONS}
                              actoption={section}
                              onselection={loadSection}
                              collapseinit={false} />

            <Flex direction="column" style={RdxThContainers.SECONDARY_CONTENT} >
                {renderContent()}
            </Flex>
        </Flex>
        
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
const handleViewChange = (view: ModuleView) => {
    if (activeView === "edicion" && view === "generacion") {
        setShowConfirmDialog(true)
    } else {
        setActiveView(view)
    }
};//end    
const confirmLeaveEdition = () => {
    setActiveView("generacion")
    setShowConfirmDialog(false)
};//end}

const renderExitDialog = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md">
                <h3 className="text-lg font-semibold mb-4">Confirmar salida</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    ¿Estás seguro de que quieres salir del modo edición? Los cambios no guardados se perderán.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setShowConfirmDialog(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                        Cancelar
                    </button>
                    <button
                        onClick={confirmLeaveEdition}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
};//end

const renderSideBar = () => {
    return(
        <div className="w-48 bg-gray-900 border-r border-gray-800 flex flex-col">

            <div className="p-3 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <span className="text-lg">🏠</span>
                    <span className="font-medium text-sm">Dashboard</span>
                </Link>
            </div>

            <div className="flex-1 p-3">
                <div className="space-y-2">
                    <h3 className="text-gray-400 text-xs font-medium mb-3">Module Options</h3>

                    <button
                        onClick={() => handleViewChange("generacion")}
                        className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${activeView === "generacion"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:text-white hover:bg-gray-800"
                            }`}>
                        <span className="text-base">⚡</span>
                        <span className="font-medium text-sm">Generación</span>
                    </button>

                    <button
                        onClick={() => handleViewChange("edicion")}
                        disabled={!isEditionEnabled}
                        className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${!isEditionEnabled
                                ? "text-gray-500 cursor-not-allowed opacity-50"
                                : activeView === "edicion"
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                            }`}>
                        <span className="text-base">🎨</span>
                        <span className="font-medium text-sm">Edición</span>
                    </button>

                </div>
            </div>

        </div>
    )
};//end
*/
