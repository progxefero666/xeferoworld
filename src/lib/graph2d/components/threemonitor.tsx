"use client"

import { useEffect, useRef } from "react"
import { Box } from "@radix-ui/themes"

interface ThreeMonitorProps {
    textureData: ImageData | null
    width: number
    height: number
    metallicness: number
    roughness: number
}

export function ThreeMonitor({ textureData, width, height, metallicness, roughness }: ThreeMonitorProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<any>(null)
    const rendererRef = useRef<any>(null)
    const controlsRef = useRef<any>(null)

    useEffect(() => {
        if (typeof window === "undefined") return

        const initThree = async () => {
            try {
                // Dynamic import of Three.js and OrbitControls
                const THREE = await import("three")
                const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js")

                const container = containerRef.current
                if (!container) return

                if (rendererRef.current && rendererRef.current.domElement) {
                    // Check if the element is actually a child before removing
                    if (container.contains(rendererRef.current.domElement)) {
                        container.removeChild(rendererRef.current.domElement)
                    }
                    rendererRef.current.dispose()
                    rendererRef.current = null
                }

                // Dispose of existing controls
                if (controlsRef.current) {
                    controlsRef.current.dispose()
                    controlsRef.current = null
                }

                // Clear container completely
                while (container.firstChild) {
                    container.removeChild(container.firstChild)
                }

                // Scene setup
                const scene = new THREE.Scene()
                scene.background = new THREE.Color(0x1a1a1a)

                // Camera
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
                camera.position.z = 3

                // Renderer
                const renderer = new THREE.WebGLRenderer({ antialias: true })
                renderer.setSize(width, height)
                container.appendChild(renderer.domElement)

                const controls = new OrbitControls(camera, renderer.domElement)
                controls.enableDamping = true // Smooth camera movements
                controls.dampingFactor = 0.05
                controls.enableZoom = true // Enable zoom with mouse wheel
                controls.enableRotate = true // Enable rotation with mouse drag
                controls.enablePan = false // Disable panning to keep focus on sphere
                controls.minDistance = 1.5 // Minimum zoom distance
                controls.maxDistance = 10 // Maximum zoom distance
                controls.autoRotate = false // Disable auto rotation

                // Sphere geometry
                const geometry = new THREE.SphereGeometry(1, 32, 32)

                // Material
                let material: any
                if (textureData) {
                    // Create texture from ImageData
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")
                    if (ctx) {
                        canvas.width = textureData.width
                        canvas.height = textureData.height
                        ctx.putImageData(textureData, 0, 0)

                        const texture = new THREE.CanvasTexture(canvas)
                        texture.wrapS = THREE.RepeatWrapping
                        texture.wrapT = THREE.RepeatWrapping

                        material = new THREE.MeshStandardMaterial({
                            map: texture,
                            metalness: metallicness,
                            roughness: roughness,
                        })
                    } else {
                        material = new THREE.MeshStandardMaterial({ color: 0x666666 })
                    }
                } else {
                    material = new THREE.MeshStandardMaterial({ color: 0x666666 })
                }

                // Sphere mesh
                const sphere = new THREE.Mesh(geometry, material)
                scene.add(sphere)

                // Lighting
                // Ambient light - increased intensity
                const ambientLight = new THREE.AmbientLight(0x404040, 1.2)
                scene.add(ambientLight)

                // Main directional light - increased intensity
                const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
                directionalLight.position.set(5, 5, 5)
                scene.add(directionalLight)

                // Additional directional light from opposite side
                const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
                directionalLight2.position.set(-3, -2, 3)
                scene.add(directionalLight2)

                // Rim light for better sphere definition
                const rimLight = new THREE.DirectionalLight(0x8888ff, 0.6)
                rimLight.position.set(0, 0, -5)
                scene.add(rimLight)

                const animate = () => {
                    requestAnimationFrame(animate)
                    controls.update() // Update controls for damping
                    renderer.render(scene, camera)
                }

                sceneRef.current = scene
                rendererRef.current = renderer
                controlsRef.current = controls
                animate()
            } catch (error) {
                console.error("Error initializing Three.js:", error)
                // Fallback: show a simple canvas
                const container = containerRef.current
                if (container) {
                    while (container.firstChild) {
                        container.removeChild(container.firstChild)
                    }

                    const canvas = document.createElement("canvas")
                    canvas.width = width
                    canvas.height = height
                    canvas.style.border = "1px solid #333"
                    canvas.style.borderRadius = "8px"

                    const ctx = canvas.getContext("2d")
                    if (ctx) {
                        ctx.fillStyle = "#1a1a1a"
                        ctx.fillRect(0, 0, width, height)
                        ctx.fillStyle = "#666"
                        ctx.font = "16px sans-serif"
                        ctx.textAlign = "center"
                        ctx.fillText("Visor 3D (cargando...)", width / 2, height / 2)
                    }

                    container.appendChild(canvas)
                }
            }
        }

        initThree()

        return () => {
            if (controlsRef.current) {
                controlsRef.current.dispose()
                controlsRef.current = null
            }

            if (rendererRef.current) {
                try {
                    if (rendererRef.current.domElement && containerRef.current) {
                        if (containerRef.current.contains(rendererRef.current.domElement)) {
                            containerRef.current.removeChild(rendererRef.current.domElement)
                        }
                    }
                    rendererRef.current.dispose()
                } catch (e) {
                    // Ignore cleanup errors
                    console.warn("Three.js cleanup warning:", e)
                }
                rendererRef.current = null
            }
        }
    }, [textureData, width, height, metallicness, roughness])

    return (
        <Box className="border border-gray-300 rounded-lg overflow-hidden">
            <div ref={containerRef} style={{ width, height }} className="bg-gray-900" />
        </Box>
    )

}//end 
