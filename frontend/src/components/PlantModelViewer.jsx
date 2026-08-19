import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const TestObject = () => {
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial />
        </mesh>
    );
};

const PlantModelViewer = ({ plantName }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

            <div className="mb-5">
                <div className="text-3xl">🧊</div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    3D Model
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                    Explore the 3D model of {plantName}.
                </p>
            </div>

            <div className="h-[450px] overflow-hidden rounded-xl bg-gray-100">

                <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>

                    <ambientLight intensity={1} />

                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={2}
                    />

                    <TestObject />

                    <OrbitControls />

                </Canvas>

            </div>

        </div>
    );
};

export default PlantModelViewer;