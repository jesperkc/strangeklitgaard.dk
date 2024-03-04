'use client'
import {
  Box,
  Cylinder,
  Environment,
  Float,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  Plane,
  RoundedBox,
  Scroll,
  ScrollControls,
  SoftShadows,
  Sphere,
  Text,
  useScroll,
  useTexture,
} from '@react-three/drei'
import {
  Physics,
  useBox,
  useConeTwistConstraint,
  useCylinder,
  useSphere,
  Triplet,
  useDistanceConstraint,
  Debug,
  useHingeConstraint,
  usePointToPointConstraint,
  PublicApi,
  useParticle,
  useLockConstraint,
} from '@react-three/cannon'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import type { PropsWithChildren, Ref, RefObject } from 'react'
import {
  createContext,
  createRef,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3D,
  Object3DEventMap,
  Path,
  Shape,
  Vector2,
  Vector3,
  Color,
  DoubleSide,
  BasicShadowMap,
  BufferAttribute,
  Matrix3,
  MathUtils,
} from 'three'
import { useScrollPercentage } from 'react-scroll-percentage'

function roundedPlaneShape(basewidth, baseheight, basedepth) {
  let radius = 0.05
  let width = basewidth - radius * 2
  let height = baseheight - radius * 2
  let basex = 0 //width / -2
  let basey = 0 //height / -2
  let x = basex - width / 2 + radius / 2
  let y = basey - height / 2 - radius / 2

  let shape = new Shape()
  // shape.moveTo(x, y + radius)
  // shape.lineTo(x, y + height - radius)
  // shape.quadraticCurveTo(x, y + height, x + radius, y + height)
  // shape.lineTo(x + width - radius, y + height)
  // shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
  // shape.lineTo(x + width, y + radius)
  // shape.quadraticCurveTo(x + width, y, x + width - radius, y)
  // shape.lineTo(x + radius, y)
  // shape.quadraticCurveTo(x, y, x, y + radius)

  shape.moveTo(x, y)
  // shape.quadraticCurveTo(x, y, x + radius, y)
  // shape.lineTo(x + radius, y)
  // shape.quadraticCurveTo(x + width, y, x + width - radius, y)
  shape.lineTo(x + width - radius, y) //Line
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  // shape.lineTo(x + width, y + radius)
  shape.lineTo(x + width, y + height) //Line
  shape.quadraticCurveTo(
    x + width,
    y + height + radius,
    x + width - radius,
    y + height + radius
  )
  // shape.lineTo(x + width - radius, y + height + radius)
  shape.lineTo(x, y + height + radius) //Line
  shape.quadraticCurveTo(
    x - radius,
    y + height + radius,
    x - radius,
    y + height
  )
  // shape.lineTo(x - radius, y + height)
  shape.lineTo(x - radius, y + radius) //Line

  shape.quadraticCurveTo(
    x - radius,
    y,

    x,
    y
  )

  // shape.lineTo(x, y)
  // shape.quadraticCurveTo(x, y + height, x + radius, y + height)

  // this.mesh = new THREE.Mesh(geometry, material)
  // this.mesh.rotation.x = -Math.PI / 2

  return shape
}

const Square = forwardRef(
  ({ square_width, square_height, square_depth, position, start }, ref) => {
    let shape = roundedPlaneShape(square_width, square_height, square_depth)

    // const scroll = useScroll()
    // const group = useRef()
    const square = useRef()
    const keyLight = useRef()
    const left = useRef()
    const right = useRef()
    // const [textureRed, textureBlue] = useTexture([
    //   '/Chroma Red.jpg',
    //   '/Chroma Blue.jpg',
    // ])

    useFrame((state, delta) => {
      if (square.current) {
        // const r1 = scroll.range(start, 1 / 3)
        // const r2 = scroll.range(1 / 4, 1 / 4)
        // const r3 = scroll.visible(4 / 5, 1 / 5)
        // square.current.rotation.x = (Math.PI / 2) * rsqw(r1)
        // square1.current.rotation.x = (Math.PI / -2) * rsqw(r1) - Math.PI / -2
        // group.current.rotation.y = MathUtils.damp(group.current.rotation.y, (-Math.PI / 1.45) * r2, 4, delta)
        // group.current.position.x = MathUtils.damp(group.current.position.x, (-width / 7) * r2, 4, delta)
        // group.current.scale.x = group.current.scale.y = group.current.scale.z = MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 4, delta)
      }
    })

    return (
      <group ref={square} position={position}>
        {/* <Box
        args={[width, height, depth]}
        position={[0, 1, -1]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color={'red'} attach={`material`} />
      </Box> */}
        <mesh receiveShadow castShadow position={[0, 1, -1.9]}>
          <extrudeGeometry
            args={[
              shape,
              {
                bevelEnabled: false,
                bevelThickness: 0.02,
                bevelSize: 0.02,
                depth: 2,
              },
            ]}
          />

          <meshStandardMaterial attach={`material-0`} color={'red'} />
          <meshStandardMaterial attach={`material-1`} color={'lightblue'} />
          <meshStandardMaterial
            attach={`material-2`}
            color={'red'}
            metalness={0}
            roughness={0.3}
          />
          <meshStandardMaterial
            attach={`material-3`}
            color={'blue'}
            metalness={0}
            roughness={0.3}
          />
          <meshStandardMaterial
            attach={`material-4`}
            color={'yellow'}
            metalness={0}
            roughness={0.3}
          />
          <meshStandardMaterial
            attach={`material-5`}
            color={'purple'}
            metalness={0}
            roughness={0.3}
          />
        </mesh>
      </group>
    )
  }
)

function Squares() {
  const [ref, percentage] = useScrollPercentage({ threshold: 0 })

  // const { width, height } = useThree((state) => state.viewport)

  const offset = 0
  // const totalHeight = height * 3
  const squareSize = {
    width: 3,
    height: 2,
  }
  const calcStart = (start) => {
    return start
    const returnvalue = height / (offset + start)
    console.log(returnvalue)
    return returnvalue
  }

  // console.log('height', height)
  return (
    <div
      ref={ref}
      style={{ height: '300vw', border: '10px solid red' }}
      id={'clients-wrapper'}
    >
      <h2
        style={{ position: 'fixed', zIndex: 100 }}
      >{`Percentage scrolled: ${percentage}%.`}</h2>
      <Canvas
        // shadows
        shadows={{
          enabled: true,
        }}
        eventPrefix="offset"
        camera={{ fov: 20, position: [0, 0, 80] }}
        gl={{
          useLegacyLights: true,
        }}
      >
        {/* <SoftShadows {...softshadowconfig} /> */}
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.3} />

        <directionalLight
          intensity={0.5}
          position={[5, 2, 5]}
          // shadow-radius={10}
          shadow-mapSize={1024}
          shadow-bias={-0.0005}
          castShadow
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0.1, 50]}
          />
        </directionalLight>
        {/* <spotLight
              castShadow
              position={[5, 2, 5]}
              intensity={0.2}
              shadow-mapSize={1024 * 2}
              shadow-bias={-0.0005}
            /> */}

        <group position={[0, 0, 0]}>
          <Square
            square_width={squareSize.width}
            square_height={squareSize.height}
            square_depth={2}
            position={[-8 / 4, offset - 2, 0]}
            start={calcStart(1)}
          />
          {/* <Square
          square_width={3}
          square_height={2}
          square_depth={2}
          position={[8 / 4, offset, 0]}
        /> */}
        </group>

        <Backdrop />
      </Canvas>
    </div>
  )
}

function Backdrop({}) {
  return (
    <Plane args={[30, 30]} position={[0, 0, 0]} receiveShadow>
      {/* <shadowMaterial
        attach="material"
        color="black"
        transparent
        opacity={0.5}
      /> */}
      <meshStandardMaterial color={'white'}></meshStandardMaterial>
      {/* <meshStandardMaterial color={'red'} transparent={false} opacity={1}> */}
      {/* <canvasTexture
          //ref={textureRef} // <- if you're animating the canvas, you'll need to set needsUpdate to true
          attach="map"
          image={textureRef.current}
        /> */}
      {/* </meshStandardMaterial> */}
    </Plane>
  )
}

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

function ClientsScene(): JSX.Element {
  const softshadowconfig = {
    size: 25, //{ value: 25, min: 0, max: 100 },
    focus: 1, //{ value: 0, min: 0, max: 2 },
    samples: 5, //{ value: 10, min: 1, max: 20, step: 1 },
  }

  return <Squares />
}

export default ClientsScene
