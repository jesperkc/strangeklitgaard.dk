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
} from '@react-three/cannon'
import { Canvas, useFrame } from '@react-three/fiber'
import type { PropsWithChildren, Ref, RefObject } from 'react'
import {
  createContext,
  createRef,
  forwardRef,
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
  Vector3,
} from 'three'
import { Color, DoubleSide } from 'three'
import { ReferenceNode } from 'three/examples/jsm/nodes/Nodes.js'
import { retarget } from 'three/examples/jsm/utils/SkeletonUtils.js'

const maxMultiplierExamples = [undefined, undefined] as const //0, 500, 1000, 1500,

function notUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

const strapSize = {
  width: 0.5,
  height: 1,
  depth: 0.1,
}

const badgeSize = {
  width: 2,
  height: 3,
  depth: 0.2,
}

const parent = createContext({
  position: [0, 0, 0] as Triplet,
  parentRef: createRef<Object3D>(),
  grandparentRef: createRef<Object3D>(),
})

type RopeLinkProps = {
  a: RefObject<any>
  b: RefObject<any>
}

function RopeJoint({ a, b }: RopeLinkProps) {
  // useDistanceConstraint(a, b, { distance: height })
  useConeTwistConstraint(a, b, {
    angle: Math.PI / 8,
    axisA: [0, 1, 0],
    axisB: [0, 1, 0],
    pivotA: [0, strapSize.height / 1.9, 0],
    pivotB: [0, -strapSize.height / 1.9, 0],
    twistAngle: 0.1,
  })

  // const distanceConstraint = useDistanceConstraint(a, b, { distance: height })

  return null
}
type BadgeLinkProps = {
  badgeRef: RefObject<any>
  strapRef: RefObject<any>
  zPos: number
}

function BadgeJoint({ badgeRef, strapRef, zPos }: BadgeLinkProps) {
  // useDistanceConstraint(a, b, { distance: height })
  // useConeTwistConstraint(badgeRef, strapRef, {
  //   angle: Math.PI / 80,
  //   axisA: [1, 0, 0],
  //   axisB: [1, 0, 0],
  //   pivotA: [0, -0.25, -zPos],
  //   pivotB: [0, -badgeSize.height / 2 + 0.6, zPos],
  //   twistAngle: 0,
  // })
  // usePointToPointConstraint(badgeRef, strapRef, {
  //   axisA: [0, 0, 1],
  //   axisB: [0, 0, 1],
  //   pivotA: [0, badgeSize.height / 2, -zPos * 4],
  //   pivotB: [0, -strapSize.height / 2 - 0, zPos * 2],
  //   twistAngle: 0.1,
  // })

  const [, , hingeApi] = useHingeConstraint(badgeRef, strapRef, {
    axisA: [1, 0, 0],
    axisB: [1, 0, 0],
    collideConnected: false,
    pivotA: [0, 0.25, -zPos],
    pivotB: [0, -0.5, -zPos * 2], //strap
  })

  // const distanceConstraint = useDistanceConstraint(a, b, { distance: height })

  return null
}

type ChainLinkProps = {
  args?: Triplet
  color?: Color | string
  maxMultiplier?: number
  position?: Triplet
}

const ChainLink = forwardRef<Ref<Object3D<Object3DEventMap>>, ChainLinkProps>(
  ({ args, color = 'white' }, ref) => {
    // const position: Triplet = [x, y - height, z]

    // const [ref] = useBox(
    //   () => ({
    //     args,
    //     linearDamping: 0.8,
    //     mass: 1,
    //     position,
    //   }),
    //   useRef<Mesh>(forwardRef)
    // )

    return (
      <>
        <mesh ref={ref}>
          <boxGeometry
            args={[strapSize.width, strapSize.height, strapSize.depth]}
          />
          <meshStandardMaterial color={color} />
        </mesh>
      </>
    )
  }
)

type ChainProps = {
  length: number
  maxMultiplier?: number
  position?: Triplet
  even: Boolean
}

function Chain({
  children,
  length,
  maxMultiplier,
  even,
}: PropsWithChildren<ChainProps>): JSX.Element {
  const color = new Color(`rgb(50%, 0%, 50%)`)

  const side = 2
  const positions = Array.from({ length: length }, (_, index) => [
    side * 0.5 - side,
    strapSize.height,
    side * 0.5 - side,
  ])

  const [strapCoordsLeft, setStrapCoordsLeft] = useState<Triplet[]>()

  const strappositions: Triplet[] = Array.from({ length: length })
  // useEffect(() => {
  //   useBoxApis.current.map((api, i) => {
  //     api.current?.position.subscribe((v) => (strappositions[i] = v))
  //   })
  // }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStrapCoordsLeft(strappositions)
    }, 20)

    return () => clearInterval(interval)
  }, [strappositions])

  // const getCoords = () => {
  //   if (useBoxApis.current) {
  //     const newStrapCoords = useBoxApis.current.map(
  //       (ref) =>
  //         ref.current?.position.copy({
  //           x: 0,
  //           y: 0,
  //           z: 0,
  //         } as Vector3) as unknown as Vector3
  //     )
  //     console.log(newStrapCoords)
  //     if (newStrapCoords) setStrapCoordsLeft(newStrapCoords)
  //   }
  // }

  const useBoxRefs = useRef(
    Array.from({ length: length }).map(() =>
      createRef<Object3D<Object3DEventMap>>()
    )
  )

  const useBoxApis = useRef(
    Array.from({ length: length }).map(() => createRef<PublicApi>())
  )

  const {
    position: [x, y, z],
    parentRef,
    grandparentRef,
  } = useContext(parent)

  const position: Triplet = [x, y, z]
  const boxSize = [
    strapSize.width,
    strapSize.height,
    strapSize.depth,
  ] as Triplet

  return (
    <>
      {positions.map((p, i) => {
        const boxposition: Triplet = [
          position[0] + 0,
          position[1] + 1 + i * -(strapSize.height + 0.1),
          position[2] + 0,
        ]

        const [ref, api] = useBox(
          () => ({
            args: boxSize,
            mass: 1,
            position: boxposition,
            // linearDamping: 0.8,
            type: 'Dynamic',
          }),
          useRef<Mesh>(null)
        )

        useBoxRefs.current[i] = ref

        api.position.subscribe((v) => {
          // if (i === 3) {
          //   console.log('strappositions', strappositions)
          // }
          strappositions[i] = v
        })

        // return null
        return (
          <ChainLink
            key={`chain-${i}`}
            ref={ref}
            color={color}
            maxMultiplier={maxMultiplier}
          ></ChainLink>
        )
      })}

      {useBoxRefs.current.map((ref: any, i: number) => {
        if (i > 0) {
          return (
            <RopeJoint
              a={useBoxRefs.current[i]}
              b={useBoxRefs.current[i - 1]}
              key={`joint-${i}`}
            />
          )
        } else {
          return (
            <RopeJoint
              a={useBoxRefs.current[i]}
              b={parentRef}
              key={`joint-${i}`}
            />
          )
        }
      })}
      <BadgeJoint
        strapRef={useBoxRefs.current[useBoxRefs.current.length - 1]}
        badgeRef={grandparentRef}
        zPos={even ? -0.05 : 0.05}
      />

      {/* {strapCoordsLeft && (
        <BrownianPlane
          strapCoords={strapCoordsLeft}
          // offset={props.position}
        />
      )} */}
    </>
  )
}

const BrownianPlane = ({
  strapCoords = [],
  offset = [0, 0, 0],
}: {
  strapCoords: Triplet[]
  offset?: number[]
}) => {
  const mesh = useRef()
  const [down, setDown] = useState(false)

  const strapWidth = 0.5
  const strapWidthHalf = strapWidth / 2

  const updateBufferGeometry = () => {
    if (strapCoords && strapCoords.length) {
      console.log('strapCoords[0]', strapCoords[0])
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
          newX = strapCoords[jointCount][0] - offset[0] - strapWidthHalf //Math.random() - 0.5
          newY = strapCoords[jointCount][1] - offset[1] //Math.random() - 0.5
          newZ = strapCoords[jointCount][2] //Math.random() - 0.5
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

function PointerHandle({
  children,
  size,
}: PropsWithChildren<{ size: number }>): JSX.Element {
  const position: Triplet = [0, 0, 0]
  const args: Triplet = [size, size, 5]

  const [ref, api] = useBox(
    () => ({ args, position, mass: 1, type: 'Static' }),
    useRef<Mesh>(null)
  )

  useFrame(({ mouse: { x, y }, viewport: { height, width } }) => {
    api.position.set((x * width) / 2, (y * height) / 2, 0)
  })

  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry args={args} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

type StaticHandleProps = {
  position: Triplet
  radius: number
}

function StaticHandle({
  children,
  position,
  radius,
}: PropsWithChildren<StaticHandleProps>): JSX.Element {
  const [ref] = useSphere(
    () => ({ args: [radius], position, type: 'Static' }),
    useRef<Mesh>(null)
  )

  const {
    position: [x, y, z],
    parentRef: parentRef,
  } = useContext(parent)

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial />
      </mesh>
      <parent.Provider
        value={{ position, parentRef: ref, grandparentRef: parentRef }}
      >
        {children}
      </parent.Provider>
    </group>
  )
}

type BadgeProps = {}

function Badge({ children }: PropsWithChildren<BadgeProps>) {
  const position = [0, -4, 0] as Triplet
  const boxSize = [
    badgeSize.width,
    badgeSize.height,
    badgeSize.depth,
  ] as Triplet
  const [refBagde] = useBox(
    () => ({ args: boxSize, position, mass: 1, type: 'Dynamic' }), //'Dynamic' | 'Static' | 'Kinematic';
    useRef<Mesh>(null)
  )

  const [refTop] = useBox(
    () => ({
      args: [0.5, 0.5, 0.1],
      position: [0, 0, 0],
      mass: 1,
      type: 'Dynamic',
    }),
    useRef<Mesh>(null)
  )

  const [refBottom] = useBox(
    () => ({
      args: [0.5, 0.5, 0.1],
      position: [0, -0.55, 0],
      mass: 1,
      type: 'Dynamic',
    }),
    useRef<Mesh>(null)
  )

  const [, , topBottomhingeApi] = useHingeConstraint(refTop, refBottom, {
    axisA: [1, 0, 0],
    axisB: [1, 0, 0],
    collideConnected: true,
    pivotA: [0, -0.3, 0],
    pivotB: [0, 0.3, 0],
  })

  const [, , bottomBadgehingeApi] = useHingeConstraint(refBottom, refBagde, {
    axisA: [1, 0, 0],
    axisB: [1, 0, 0],
    collideConnected: true,
    pivotA: [0, -0.3, 0],
    pivotB: [0, badgeSize.height / 2, 0],
  })

  // useConeTwistConstraint(refTop, refBottom, {
  //   angle: Math.PI / 8,
  //   axisA: [0, 0, 1],
  //   axisB: [0, 0, 1],
  //   pivotA: [0, -0.5, 0],
  //   pivotB: [0, 0.5, 0],
  //   twistAngle: 0.1,
  // })

  return (
    <>
      <mesh ref={refBagde}>
        <boxGeometry args={boxSize} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={refTop}>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <mesh ref={refBottom}>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
      <parent.Provider value={{ position, parentRef: refTop }}>
        {children}
      </parent.Provider>
    </>
  )
}

const style = {
  color: 'white',
  fontSize: '1.2em',
  left: 50,
  position: 'absolute',
  top: 20,
} as const

function ChainScene(): JSX.Element {
  const [resetCount, setResetCount] = useState(0)

  const reset = useCallback(() => {
    setResetCount((prev) => prev + 1)
  }, [])

  const separation = 4

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
      <Canvas
        shadows
        camera={{ fov: 50, position: [0, 5, 20] }}
        onPointerMissed={reset}
        gl={{
          // todo: stop using legacy lights
          useLegacyLights: true,
        }}
      >
        <OrbitControls />
        {/* <color attach="background" args={['#171720']} /> */}
        <ambientLight intensity={1} />
        <pointLight position={[-10, -10, -10]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.8}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Physics allowSleep={false}>
          <Debug color="black" scale={1.1}>
            <PointerHandle size={0.5}></PointerHandle>
            <Badge>
              <>
                {maxMultiplierExamples.map((maxMultiplier, index) => (
                  <StaticHandle
                    key={`${resetCount}-${index}`}
                    radius={0.5}
                    position={[-index, 8, index]}
                  >
                    <Chain
                      maxMultiplier={maxMultiplier}
                      length={12}
                      even={index % 2 === 0}
                    />
                  </StaticHandle>
                ))}
              </>
            </Badge>
          </Debug>
        </Physics>
      </Canvas>
      <div style={style}>
        <pre>
          * move pointer to move the box
          <br />
          and break the chain constraints,
          <br />
          click to reset
        </pre>
      </div>
    </div>
  )
}

export default ChainScene
