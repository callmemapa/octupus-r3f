import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf';
import PelucheModel from './PelucheModel';

export default function Experience() {
    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <PelucheModel scale={0.02} />
    </>
}