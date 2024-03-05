'use client'
import {
  Box,
  Cylinder,
  Environment,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  Plane,
  Sphere,
  Text,
} from '@react-three/drei'
import {
  createRef,
  forwardRef,
  ReactNode,
  RefObject,
  StrictMode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  RigidBody,
  RapierRigidBody,
  RigidBodyTypeString,
  useSphericalJoint,
  Vector3Array,
  usePrismaticJoint,
  Physics,
  useRapier,
  BallCollider,
  RigidBodyAutoCollider,
  RigidBodyProps,
  useFixedJoint,
  CuboidCollider,
  useRevoluteJoint,
  SphericalJointParams,
  UseImpulseJoint,
  CylinderCollider,
} from '@react-three/rapier'
import { useImperativeHandle } from 'react'
import { Canvas, Vector3Props, useFrame } from '@react-three/fiber'
import {
  BackSide,
  Camera,
  Color,
  DoubleSide,
  Euler,
  Group,
  Mesh,
  Quaternion,
  Vector,
  Vector3,
} from 'three'
import { chownSync } from 'fs'

const sphereWidth = 0.25
const sphereDepth = 0.1
const sphereHeight = 0.5
const sphereWidthHalf = sphereWidth / 2
const sphereDistance = 0.5
const sphereDistanceHalf = sphereDistance / 2
const cardWidth = 8
const cardHeight = 10
const cardMargin = 1

interface Rotation {
  x: number
  y: number
  z: number
  w: number
}

const rigitBodyConfig: RigidBodyProps = {
  linearDamping: 1,
  angularDamping: 1,
  ccd: true,
  restitution: 0.01,
  // friction: 0.1,
  mass: 10,
}
const RigidRopeSegment = forwardRef<
  RapierRigidBody,
  {
    position: Vector3Array
    component: ReactNode
    type: RigidBodyTypeString
  }
>(({ position, component, type }, ref) => {
  return (
    <RigidBody
      colliders={'ball'}
      ref={ref}
      type={type}
      position={position}
      {...rigitBodyConfig}
      // enabledRotations={[true, false, true]}
      // density={20}
    >
      {component}
    </RigidBody>
  )
})

/**
 * We can wrap our hook in a component in order to initiate
 * them conditionally and dynamically
 */
const RopeJoint = ({
  a,
  b,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
}) => {
  useSphericalJoint(a, b, [
    [0.25, 0, 0],
    [-0.25, 0, 0],
  ])
  // useFixedJoint(a, b, [
  //   [0, 0.5, 0],
  //   [0, 0, 0, 1],
  //   [0, -0.5, 0],
  //   [0, 0, 0, 1],
  // ])

  // const revolutejoint = useRevoluteJoint(a, b, [
  //   // Position of the joint in bodyA's local space
  //   [0, 0.5, 0],
  //   // Position of the joint in bodyB's local space
  //   [0, -0.5, 0],
  //   // Axis of the joint, expressed in the local-space of
  //   // the rigid-bodies it is attached to. Cannot be [0,0,0].
  //   [0, 0, 1],
  // ])

  // useFrame(() => {
  //   if (revolutejoint.current) {
  //     revolutejoint.current.configureMotorVelocity(10, 2)
  //   }
  // }, [])

  return null
}
const CardJoint = ({
  a,
  b,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
}) => {
  useSphericalJoint(a, b, [
    [0.25, 0, 0],
    [0, cardHeight / 1.6, 0],
  ])
  // useFixedJoint(a, b, [
  //   [0, 0.5, 0],
  //   [0, 0, 0, 1],
  //   [0, -0.5, 0],
  //   [0, 0, 0, 1],
  // ])

  // const revolutejoint = useRevoluteJoint(a, b, [
  //   // Position of the joint in bodyA's local space
  //   [0, 0.5, 0],
  //   // Position of the joint in bodyB's local space
  //   [0, -0.5, 0],
  //   // Axis of the joint, expressed in the local-space of
  //   // the rigid-bodies it is attached to. Cannot be [0,0,0].
  //   [0, 0, 1],
  // ])

  // useFrame(() => {
  //   if (revolutejoint.current) {
  //     revolutejoint.current.configureMotorVelocity(10, 2)
  //   }
  // }, [])

  return null
}

export const Rope = (props: {
  length: number
  position: [x: number, y: number, z: number]
}) => {
  const refs = useRef(
    Array.from({ length: props.length }).map(() => createRef<RapierRigidBody>())
  )

  const cardRef = useRef()
  // useFrame(() => {
  //   const now = performance.now()
  //   refs.current[0].current?.setNextKinematicRotation(
  //     new Quaternion(0, Math.sin(now / 800) * 6, 0)
  //   )
  // })
  const [strapCoordsLeft, setStrapCoordsLeft] = useState<Vector3[]>()
  const [strapRotationsLeft, setStrapRotationsLeft] = useState<Rotation[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      getCoords()
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const getCoords = () => {
    if (refs.current) {
      const newStrapCoords = refs.current.map(
        (ref) => ref.current?.translation() as Vector3
      )
      const newStrapRotations = refs.current.map(
        (ref) => ref.current?.rotation() as Rotation // ref.current?.nextRotation() as Rotation
      )
      if (newStrapCoords) setStrapCoordsLeft(newStrapCoords)
      if (newStrapRotations) setStrapRotationsLeft(newStrapRotations)
    }
  }

  const radius = 5
  const radian_interval = (2.0 * Math.PI) / props.length
  const quarter = Math.floor(props.length / 4) + 1

  return (
    <group position={props.position}>
      {refs.current.map((ref, i) => {
        const isLast = i === refs.current.length - 1
        const isOverHalf = i > refs.current.length / 2
        const x = Math.cos(radian_interval * (i - quarter)) * radius //isLast ? 0 : isOverHalf ? i * -1 : i * 1
        const y = Math.sin(radian_interval * (i - quarter)) * radius //isLast ? 0 : isOverHalf ? i * 1 : i * -1
        return (
          <RigidRopeSegment
            ref={ref}
            key={i}
            position={[x, y, 0]}
            component={
              <Sphere args={[0.25]}>
                <meshStandardMaterial transparent={true} opacity={0} />
              </Sphere>
            }
            type={'dynamic'}
            // type={i === Math.floor(props.length / 4) ? 'dynamic' : 'dynamic'}
          />
        )
      })}
      {/**
       * Multiple joints can be initiated dynamically by
       * mapping out wrapped components containing the hooks
       */}
      {refs.current.map((ref, i) =>
        i > 0 ? (
          <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} />
        ) : (
          <RopeJoint
            a={refs.current[0]}
            b={refs.current[refs.current.length - 1]}
            key={i}
          />
        )
      )}
      {/* <CardJoint a={refs.current[0]} b={cardRef} />
      <CardElement ref={cardRef} /> */}
      {/* {strapCoordsLeft && strapRotationsLeft && (
        <BrownianPlane
          strapCoords={strapCoordsLeft}
          strapRotations={strapRotationsLeft}
          offset={props.position}
        />
      )} */}
    </group>
  )
}

const CardElement = forwardRef<RapierRigidBody>((_, ref) => (
  <RigidBody
    ref={ref}
    position={[0, -cardHeight, 0]}
    type={'dynamic'}
    colliders={'cuboid'}
    {...rigitBodyConfig}
  >
    <Box
      castShadow
      args={[0.01, cardHeight - cardMargin * 2, cardWidth - cardMargin * 2]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <meshPhysicalMaterial color="orange" />
    </Box>
    <Box
      castShadow
      args={[0.05, cardHeight, cardWidth]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <meshPhysicalMaterial
        color="lightblue"
        transmission={1}
        thickness={0.1}
        roughness={0}
      />
      {/* <MeshTransmissionMaterial
        distortion={0.9}
        distortionScale={0.5}
        temporalDistortion={0}
        color="lightblue"
        background={new Color(1, 1, 1)}
        transmission={1}
        thickness={0.1}
        roughness={0}
        backside={false}
        // chromaticAberration={0.7}
        // anisotropicBlur={0.7}
      /> */}
    </Box>
  </RigidBody>
))

const BrownianPlane = ({
  strapCoords = [],
  strapRotations = [],
  offset = [0, 0, 0],
}: {
  strapCoords: Vector3[]
  strapRotations: Rotation[]
  offset: number[]
}) => {
  const mesh = useRef()
  const [down, setDown] = useState(false)

  const strapWidth = 0.5
  const strapWidthHalf = strapWidth / 2

  const updateBufferGeometry = () => {
    if (strapCoords && strapCoords.length) {
      // console.log('strapCoords[0]', strapCoords[0])
      const { geometry } = mesh.current
      const { position, rotation } = geometry.attributes

      var pos = geometry.getAttribute('position')

      // also get attribute buffers for current and original normals

      let newX = 0
      let newY = 1
      let newZ = 1
      let jointCount = 0
      for (let index = 0; index < pos.count; index++) {
        // for (const index of enumerate(position.count)) {
        if (index % 2 === 0 && strapCoords[jointCount]) {
          newX = strapCoords[jointCount].x - offset[0] - strapWidthHalf //Math.random() - 0.5
          newY = strapCoords[jointCount].y - offset[1] //Math.random() - 0.5
          newZ = strapCoords[jointCount].z //Math.random() - 0.5
          jointCount++
        }
        // get the position
        var x = pos.getX(index),
          y = pos.getY(index),
          z = pos.getZ(index)
        // position.array[index * 3 + 2] = amplitude * r
        if (index % 2 === 0) {
          position.setXYZ(index, newX, newY, newZ)
        } else {
          position.setXYZ(index, newX + strapWidth, newY, newZ)
        }
      }
      position.needsUpdate = true
      geometry.computeVertexNormals()
    }
  }

  useEffect(() => updateBufferGeometry(), [strapCoords])
  // useFrame(() => {
  //   if (down) updateBufferGeometry()
  // })

  return (
    <mesh
      ref={mesh}
      // onPointerDown={() => setDown(true)}
      // onPointerUp={() => setDown(false)}
    >
      <planeGeometry args={[1, 5, 1, strapCoords.length]} />
      <meshPhysicalMaterial
        color="#3316bb"
        side={DoubleSide}
        roughness={0.2}
        specularColor={'green'}
      />
    </mesh>
  )
}

function Neck({ position }: { position: any }) {
  const ref = useRef(null)
  const depth = 5
  const thickness = 2
  return (
    <RigidBody
      position={position}
      type="kinematicPosition"
      colliders={'hull'}
      ref={ref}
      {...rigitBodyConfig}
    >
      <CylinderCollider
        args={[0.5, 20]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 2, depth]}
      />
      <CylinderCollider
        args={[depth, thickness]}
        rotation={[Math.PI / 2, 2, 0]}
      />
      <CylinderCollider
        args={[0.5, 20]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 2, -depth]}
      />
    </RigidBody>
  )
}
function Pointer({ vec = new Vector3() }) {
  const ref = useRef(null)
  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      } as Vector3,
      0.2
    )
    if (ref.current !== null) {
      ref.current.setNextKinematicTranslation(vec)
    }
  })
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
      {...rigitBodyConfig}
    >
      <CylinderCollider args={[0.1, 5]} />
    </RigidBody>
  )
}

const Badge = () => {
  const x = 10
  const y = 20
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      {/* <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          zIndex: 100,
          inset: 0,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '50%',
              whiteSpace: 'pre',
            }}
          >
            {`One Jove,\nOne Pluto,\nOne Sun is Serapis.`}
          </div>
        </div>
      </div> */}

      <Suspense fallback="Loading...">
        <Canvas
          shadows
          dpr={1}
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 25] }}
        >
          <OrbitControls dampingFactor={1} />
          <StrictMode>
            <Physics
              paused={false}
              interpolate={false}
              colliders={false}
              // timeStep={1 / 60}
              debug={false}
              timeStep={'vary'}
              // erp={0.2}
            >
              <Pointer />
              <Neck position={[x, y, 0]} />
              <directionalLight
                castShadow
                position={[10, 10, 10]}
                shadow-camera-bottom={-40}
                shadow-camera-top={40}
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-mapSize-width={1024}
                shadow-bias={-0.0001}
              />
              <Environment preset="apartment" />

              <Rope length={80} position={[x, y, 0]} />

              {/* <group position={[0, 0, -1]}>
                <Text
                  color={'red'}
                  fontSize={1}
                  font="__Source_Serif_4_5a693e, __Source_Serif_4_Fallback_5a693e, 'Comic Sans'"
                >
                  Hi, I'm Jesper
                </Text>
                <CuboidCollider args={[20, 20, 0.1]}></CuboidCollider>
              </group> */}
            </Physics>
            {/* <mesh position={[1, 0, -1]}>
              <Html
                as="div" // Wrapping element (default: 'div')
                // wrapperClass // The className of the wrapping element (default: undefined)
                prepend={true} // Project content behind the canvas (default: false)
                center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
                fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
                distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                // zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                sprite // Renders as sprite, but only in transform mode (default=false)
                occlude="blending"
                color="red"
              >
                <h1 style={{ color: 'red' }}>hello</h1>
                <p>world</p>
              </Html>
            </mesh> */}
          </StrictMode>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Badge
