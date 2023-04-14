import React, { useRef } from 'react';
import { useGLTF, useTexture, useHelper } from '@react-three/drei';
import { MeshPhongMaterial } from 'three';

import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import { HemisphereLight, PointLight, RectAreaLight, SpotLight } from 'three';

export default function PelucheModel() {
    // Textures
    const texture = useTexture('/static/textures/alien/color.jpg');
    const normalTexture = useTexture('/static/textures/alien/norm.jpg');
    const roughnessTexture = useTexture('/static/textures/alien/rough.jpg');
    const aoTexture = useTexture('/static/textures/alien/ao.jpg');
    const dispTexture = useTexture('/static/textures/alien/disp.png');

    // 3d model
    const gltf = useGLTF('/static/Peluche.glb');
    const mesh = gltf.scene.children[0];

    // Lights
    // Directional Light
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, DirectionalLightHelper, 1);
    // Hemisphere Light
    const hemisphereLightRef = useRef();
    useHelper(hemisphereLightRef, HemisphereLightHelper, 1);
    const hemisphereLight = new HemisphereLight(0xffffff, 0x0000ff, 1);
    // Point light
    const pointLightRef = useRef();
    useHelper(pointLightRef, PointLightHelper, 1);
    const pointLight = new PointLight(0xffffff, 0x999999, 1);
    // Rect Area Light
    const rectAreaLight = new RectAreaLight(0xffffff, 0x151561, 1);
    // Spot Light
    const spotLightRef = useRef();
    useHelper(spotLightRef, SpotLight, 1);
    const spotLight = new SpotLight(0xffffff, 0x966541, 1);

    const material = new MeshPhongMaterial({
        map: texture,
        normalMap: normalTexture,
        // displacementMap: dispTexture, 
        // roughnessMap: roughnessTexture,
        aoMap: aoTexture,
        color: 'green',
        shininess: 80,
    });

    mesh.material = material;

    return (
        <>
            <mesh receiveShadow={true} castShadow={true} onReady={(mesh) => {
                mesh.receiveShadow = true;
                mesh.castShadow = true;
            }}>
                <hemisphereLight ref={hemisphereLightRef} intensity={10} />
                {/* <directionalLight ref={directionalLightRef} position={[0, 5, -2]} color="#ffffff" intensity={1} castShadow/> */}
                {/* <pointLight ref={pointLightRef} intensity={20}/> */}
                {/* <rectAreaLight intensity={15}/> */}
                {/* <spotLight ref={spotLightRef} intensity={10}/> */}
                <primitive object={gltf.scene} />
            </mesh>
        </>
    );
}

useGLTF.preload('/static/Peluche.glb');