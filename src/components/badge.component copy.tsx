'use client'
import {
  Box,
  Cylinder,
  Environment,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
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
} from '@react-three/rapier'
import { useImperativeHandle } from 'react'
import { Canvas, Vector3Props, useFrame } from '@react-three/fiber'
import {
  BackSide,
  Color,
  DoubleSide,
  Euler,
  Group,
  Mesh,
  Quaternion,
  Vector3,
} from 'three'
import { chownSync } from 'fs'

const sphereWidth = 0.05
const sphereDepth = 0.01
const sphereHeight = 0.05
const sphereWidthHalf = sphereWidth / 2
const sphereDistance = sphereWidth * 0.5
const cardWidth = 1.5
const cardHeight = 2
const cardMargin = 0.1

const rigitBodyConfig: RigidBodyProps = {
  linearDamping: 0.75,
  angularDamping: 15.15,
  ccd: true,
  restitution: 0.0001,
  // friction: 0,
  // mass: 1,
}

const ShadowElement = forwardRef<Mesh>((_, ref) => (
  <Cylinder
    castShadow
    ref={ref}
    args={[sphereWidth, sphereWidth, sphereHeight]}
  >
    <meshPhysicalMaterial color="grey" transparent={true} opacity={0} />
  </Cylinder>
))
const CardElement = forwardRef<Group>((_, ref) => (
  <group ref={ref} position={[0, -cardHeight / 2, 0]}>
    <Box
      castShadow
      args={[0.01, cardHeight - cardMargin * 2, cardWidth - cardMargin * 2]}
    >
      <meshPhysicalMaterial color="orange" />
    </Box>
    <Box castShadow args={[0.05, cardHeight, cardWidth]}>
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
  </group>
))

type RopeSegmentProps = {
  position: Vector3Array
  rotation?: Euler
  component: ReactNode
  type: RigidBodyTypeString
  colliders: RigidBodyAutoCollider
}

const RopeSegment = forwardRef<RapierRigidBody, RopeSegmentProps>(
  ({ position, rotation, component, type, colliders }, ref) => {
    return (
      <RigidBody
        ref={ref}
        type={type}
        colliders={colliders}
        position={position}
        rotation={rotation}
        // rotation={[Math.PI, 0, 0]}
        // args={[0.1]}
        {...rigitBodyConfig}
      >
        {component}
      </RigidBody>
    )
  }
)

const RopeSegment2 = forwardRef<RapierRigidBody, RopeSegmentProps>(
  ({ position, rotation, component, type, colliders }, ref) => {
    return (
      <group
        ref={ref}
        type={type}
        colliders={colliders}
        position={position}
        rotation={rotation}
        // rotation={[Math.PI, 0, 0]}
        // args={[0.1]}
        {...rigitBodyConfig}
      >
        {component}
      </group>
    )
  }
)

const RopeJoint = ({
  a,
  b,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
}) => {
  const cyljoint = useSphericalJoint(a, b, [
    [-sphereWidth / 1.5, 0, -sphereWidthHalf - sphereDistance],
    [-sphereWidth / 1.5, 0, sphereWidthHalf + sphereDistance],
  ])
  const cyljoint2 = useSphericalJoint(a, b, [
    [sphereWidth / 1.5, 0, -sphereWidthHalf - sphereDistance],
    [sphereWidth / 1.5, 0, sphereWidthHalf + sphereDistance],
  ])

  // useFrame(() => {
  //   if (cyljoint.current) {
  //     cyljoint.current.configureMotorVelocity(10, 2)
  //   }
  // }, [])

  // const joint = useSphericalJoint(a, b, [
  //   [-sphereWidth / 2, sphereHeight / 2 + sphereDistance, 0],
  //   [-sphereWidth / 2, -sphereHeight / 2 - sphereDistance, 0],
  // ])

  // const jointright = useSphericalJoint(a, b, [
  //   [sphereWidth / 2, sphereHeight / 2 + sphereDistance, 0],
  //   [sphereWidth / 2, -sphereHeight / 2 - sphereDistance, 0],
  // ])

  return null
}

const MidRopeJoint = ({
  a,
  b,
  m,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
  m: RefObject<RapierRigidBody>
}) => {
  const joint = useRevoluteJoint(b, m, [
    [-sphereWidth / 2, 0, -sphereDepth],
    [-sphereWidth / 2, sphereHeight, sphereDepth],
    [0, 1, 0],
  ])
  const joint2 = useRevoluteJoint(b, m, [
    [sphereWidth / 2, 0, -sphereDepth],
    [sphereWidth / 2, sphereHeight, sphereDepth],
    [0, 1, 0],
  ])
  const jointr = useRevoluteJoint(a, m, [
    [-sphereWidth / 2, 0, sphereDepth],
    [-sphereWidth / 2, -sphereHeight, -sphereDepth],
    [0, -1, 0],
  ])
  const jointr2 = useRevoluteJoint(a, m, [
    [sphereWidth / 2, 0, sphereDepth],
    [sphereWidth / 2, -sphereHeight, -sphereDepth],
    [0, -1, 0],
  ])

  // const joint = useSphericalJoint(a, m, [
  //   [-sphereWidth / 2, -sphereHeight / 2 - sphereDistance, -sphereDepth],
  //   [-sphereWidth / 2, sphereHeight / 2 + sphereDistance, sphereDepth],
  // ])
  // const joint2 = useSphericalJoint(a, m, [
  //   [sphereWidth / 2, -sphereHeight / 2 - sphereDistance, -sphereDepth],
  //   [sphereWidth / 2, sphereHeight / 2 + sphereDistance, sphereDepth],
  // ])

  // const jointright = useSphericalJoint(b, m, [
  //   [-sphereWidth / 2, -sphereHeight / 2 - sphereDistance, sphereDepth],
  //   [-sphereWidth / 2, sphereHeight / 2 + sphereDistance, -sphereDepth],
  // ])

  // const jointright2 = useSphericalJoint(b, m, [
  //   [sphereWidth / 2, -sphereHeight / 2 - sphereDistance, sphereDepth],
  //   [sphereWidth / 2, sphereHeight / 2 + sphereDistance, -sphereDepth],
  // ])

  return null
}
const BadgeJoint = ({
  a,
  b,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
}) => {
  const joint = useFixedJoint(a, b, [
    // Position of the joint in bodyA's local space
    [0, 0.1, 0],
    // Orientation of the joint in bodyA's local space
    [0, 0, 0, 1],
    // Position of the joint in bodyB's local space
    [0, -0.1, 0],
    // Orientation of the joint in bodyB's local space
    [0, 0, 0, 1],
  ])

  return null
}

const Rope = (props: {
  component: ReactNode
  length: number
  position: number[]
}) => {
  const refsLeft = useRef(
    Array.from({ length: props.length }).map(() => createRef<RapierRigidBody>())
  )
  const refsRight = useRef(
    Array.from({ length: props.length }).map(() => createRef<RapierRigidBody>())
  )
  const refMid = useRef(createRef<RapierRigidBody>())

  const [strapCoordsLeft, setStrapCoordsLeft] = useState<Vector3[]>([])
  const [strapCoordsRight, setStrapCoordsRight] = useState<Vector3[]>([])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getCoords()
  //   }, 20)

  //   return () => clearInterval(interval)
  // }, [])

  // const getCoords = () => {
  //   if (refsLeft.current) {
  //     const newStrapCoords = refsLeft.current.map((ref) =>
  //       ref.current?.nextTranslation()
  //     )
  //     setStrapCoordsLeft(newStrapCoords)
  //   }
  //   if (refsRight.current) {
  //     const newStrapCoords = refsRight.current.map((ref) =>
  //       ref.current?.nextTranslation()
  //     )
  //     setStrapCoordsRight(newStrapCoords)
  //   }
  // }

  return (
    <group position={props.position}>
      <RopeSegment
        ref={refMid}
        position={[0, -2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        component={<ShadowElement />}
        type={'dynamic'}
        colliders={'hull'}
      />

      {refsLeft.current.map((ref, i) => {
        const isFirst = i === 0
        const isLast = i >= refsLeft.current.length - 1
        const posY = isFirst ? 0 : -(sphereWidth + sphereDistance) * i
        const posX = isFirst ? -0.2 : isLast ? 0 : -0.1
        return (
          <RopeSegment
            ref={ref}
            key={i}
            position={[posX, posY, 0.1]}
            rotation={[Math.PI / 2, 0, 0]}
            component={isLast ? <ShadowElement /> : <ShadowElement />}
            type={isFirst ? 'kinematicPosition' : 'dynamic'}
            colliders={isLast ? 'hull' : 'hull'}
          />
        )
      })}
      {refsRight.current.map((ref, i) => {
        const isFirst = i === 0
        const isLast = i >= refsLeft.current.length - 1
        const posY = isFirst ? 0 : -(sphereWidth + sphereDistance) * i
        const posX = isFirst ? 0.2 : isLast ? 0 : 0.1
        return (
          <RopeSegment
            ref={ref}
            key={i}
            position={[posX, posY, -0.1]}
            rotation={[Math.PI / 2, 0, 0]}
            component={isLast ? <ShadowElement /> : <ShadowElement />}
            type={isFirst ? 'kinematicPosition' : 'dynamic'}
            colliders={isLast ? 'hull' : 'hull'}
          />
        )
      })}
      {refsLeft.current.map((ref, i) => {
        const isLast = i >= refsLeft.current.length - 1
        // if (isLast) {
        //   return (
        //     <RopeJoint
        //       a={refsLeft.current[i]}
        //       b={refsLeft.current[i - 1]}
        //       key={i}
        //     />
        //   )
        // }
        if (i > 0) {
          return (
            <RopeJoint
              a={refsLeft.current[i]}
              b={refsLeft.current[i - 1]}
              key={i}
            />
          )
        }
      })}
      {refsRight.current.map((ref, i) => {
        const isLast = i >= refsRight.current.length - 1
        if (isLast) {
          return (
            <>
              <RopeJoint
                a={refsRight.current[i]}
                b={refsRight.current[i - 1]}
                key={i}
              />
              <MidRopeJoint
                a={refsRight.current[i]}
                b={refsLeft.current[refsLeft.current.length - 1]}
                m={refMid}
                key={i}
              />
            </>
          )
        }
        if (i > 0) {
          return (
            <RopeJoint
              a={refsRight.current[i]}
              b={refsRight.current[i - 1]}
              key={i}
            />
          )
        }
      })}
      {/* <BrownianPlane strapCoords={strapCoordsLeft} offset={props.position} /> */}
      {/*
      <BrownianPlane strapCoords={strapCoordsRight} offset={props.position} /> */}
    </group>
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
      restitution={0}
      ref={ref}
    >
      <CuboidCollider args={[0.05, 0.05, 1]} />
    </RigidBody>
  )
}

function* enumerate(count: number) {
  let i = 0
  while (i < count) yield i++
}

const BrownianPlane = ({
  strapCoords = [],
  offset = [0, 0, 0],
}: {
  strapCoords: Vector3[]
  offset: number[]
}) => {
  const mesh = useRef()
  const [down, setDown] = useState(false)

  const strapWidth = 0.05
  const strapWidthHalf = strapWidth / 2

  const updateBufferGeometry = () => {
    if (strapCoords && strapCoords.length) {
      // console.log('strapCoords[0]', strapCoords[0])
      const { geometry } = mesh.current
      const { position } = geometry.attributes

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
      <meshPhysicalMaterial color="#3316bb" side={DoubleSide} roughness={0.2} />
    </mesh>
  )
}

const Badge = () => {
  return (
    <div
      style={{
        position: 'fixed',
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
        <Canvas shadows dpr={1}>
          <OrbitControls dampingFactor={1} />
          <StrictMode>
            <Physics
              paused={false}
              timeStep={1 / 60}
              debug={true}
              // erp={0.2}
            >
              <Pointer />
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

              <Rope
                length={12}
                component={<ShadowElement />}
                position={[0, 0, 0]}
              />

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
