import React from "react";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg"
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg"
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg"
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg"
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";




export function Earth(props: any){

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap])

    return( 
    <>
    <ambientLight intensity={0.5}/>
        <mesh>
            <sphereGeometry args={[1, 32, 32]}/>
            <meshPhongMaterial specularMap={specularMap}/>
            <meshStandardMaterial map={colorMap} normalMap={normalMap} />
        </mesh>
    </>
    )
}