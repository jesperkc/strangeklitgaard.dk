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
  useParticle,
} from '@react-three/cannon'
import { Canvas, useFrame } from '@react-three/fiber'
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
  Vector2,
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

const Stitch = memo(({ p1, p2, distance = 0.1 }) => {
  useDistanceConstraint(p1.current.particle, p2.current.particle, {
    distance,
  })

  return null
})

const Particle = memo(
  forwardRef(
    (
      {
        mass,
        position,
        color,
      }: { mass: number; position: Triplet; color: string },
      ref
    ) => {
      let [particle, api] = useParticle(() => ({
        mass,
        position,
        // args: [0.3],
        // linearDamping: 0.2,
      }))

      if (ref && particle.current) {
        ref.current = { particle, api }
      }

      return (
        <Sphere ref={particle} args={[0.1]} position={position}>
          <meshStandardMaterial color={color} />
        </Sphere>
      )
    }
  )
)

const strappositions: Triplet[] = Array.from({
  length: 2 * 16,
})

const Cloth = memo(
  forwardRef(({}: {}, ref) => {
    const width = 1
    const height = 6
    const resolutionX = 2
    const resolutionY = 16
    const box = useRef<Ref<Mesh>>(() => createRef<Ref<Mesh>>())
    const [readyForStitches, setReadyForStitches] = useState(false)

    const particles = useRef(
      Array.from({ length: resolutionX }, () =>
        Array.from({ length: resolutionY }, createRef)
      )
    )

    useEffect(() => {
      const interval = setInterval(() => {
        // updatePlane()
        // console.log(strappositions)
      }, 200)

      return () => clearInterval(interval)
    }, [])

    useEffect(() => {
      setReadyForStitches(true)
    }, [])

    const setupSubscribe = (particles, counter) => {
      particles.subscribe((v) => {
        strappositions[counter] = v
      })
    }

    useEffect(() => {
      let counter = 0
      particles.current.forEach((particleX, xi) => {
        particleX.forEach((particleY, i) => {
          console.log('setupSubscribe y', counter)
          if (particleY.current) {
            // console.log(particleX.current?.api.position)
            setupSubscribe(particleY.current.api.position, counter)
          }
          counter++
        })
        // console.log('setupSubscribe x', counter)
        // if (particleX.current) {
        //   setupSubscribe(particleX.current.api.position, counter)
        // }
        // counter++
      })
    }, [readyForStitches])

    function setNoise(g, uvShift, multiplier, amplitude) {
      let pos = g.attributes.position
      let uv = g.attributes.uv
      let col = g.attributes.color
      let vec2 = new Vector2()
      let height
      let y = 0
      let x = 0
      console.log('pos', pos.count)
      for (let i = 0; i < pos.count; i++) {
        if (i % resolutionX === 0) {
          x = 0
        }
        // console.log(y, x)
        if (particles.current[x][y] && particles.current[x][y].current) {
          // console.log(y, x)
          console.log(i, strappositions[i])
          if (strappositions[i]) {
            // vec2.fromBufferAttribute(uv, i).add(uvShift).multiplyScalar(multiplier)
            height = Math.random()
            pos.setXYZ(
              i,
              strappositions[i][0],
              strappositions[i][1],
              strappositions[i][2]
            )
            // pos.setY(i, strappositions[i][1])
            // pos.setX(i, x + strappositions[i][0])
            // pos.setZ(i, strappositions[i][2])
          }
        }
        if (i % resolutionX === 1) {
          y++
        }
        x++
        // You can play with the values here to get some funky colours or different gradient strengths
        // This basic example renders it black and white
        // col.setXYZ(i, height, height, height)
      }

      return g
    }

    const updatePlane = () => {
      const now = performance.now()

      const totalSegmentsX = resolutionX
      const totalSegmentsZ = resolutionY

      if (particles.current[0][0] && box.current) {
        const geom = setNoise(box.current.geometry, 1, 1, 1)
        // for (let z = 0; z < totalSegmentsZ; z++) {
        //   for (let x = 0; x < totalSegmentsX; x++) {
        //     const index = 3 * (z * totalSegmentsX + x)

        //     geom.attributes.position.array[index + 1] = index
        //   }
        // }

        // const positionAttribute = geom.getAttribute('position')
        // console.log(
        //   'box.current.geometry.vertices',
        //   box.current.geometry.vertices
        // )
        // const vertex = new Vector3()

        // for (let i = 0; i < positionAttribute.count; i++) {
        //   vertex.fromBufferAttribute(positionAttribute, i) // read vertex

        //   // do something with vertex

        //   positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z) // write coordinates back
        // }

        // if (geom.vertices) {
        //   geom.vertices.forEach((v, vi) => {
        //     let x = vi % resolutionX
        //     let y = Math.floor(vi / resolutionX)
        //     v.copy(particles.current[y][x].current.particle.current.position)
        //   })
        geom.attributes.position.needsUpdate = true //;.verticesNeedUpdate = true
        geom.computeVertexNormals()
        // }
      }
    }

    const distanceX = width / resolutionX
    const distanceY = height / resolutionY
    const distanceDiagonal = Math.sqrt(
      distanceX * distanceX + distanceY * distanceY
    )

    // function setPosition(x = 0, y = 0, z = 0) {
    //   particles.current[0].forEach((p, i) => {
    //     if (i < 2 || i > particles.current[0].length - 3)
    //       p.current.api.position.set(
    //         (-distanceX * resolutionX) / 2 + x + distanceX * i,
    //         y,
    //         z
    //       )
    //   })
    // }

    // if (ref) {
    //   ref.current = {
    //     setPosition,
    //   }
    // }

    return (
      <>
        <mesh ref={box} position={[0, 0, 0]}>
          <planeGeometry args={[distanceX, height, 1, 15]} />
          <meshStandardMaterial color={'red'} side={DoubleSide} />
        </mesh>
        {particles.current.map((x, xi) =>
          x.map((y, yi) => (
            <Particle
              color={xi === 0 ? `#${yi}${yi}${yi}${yi}${yi}${yi}` : 'hotpink'}
              ref={y}
              mass={yi}
              // mass={yi === 0 ? 0 : (1 / width) * height}
              key={yi + '-' + xi}
              position={[distanceX * xi, distanceY * -yi, 0]}
            />
          ))
        )}
        {readyForStitches &&
          particles.current.map((x, xi) =>
            x.map((y, yi) => {
              return (
                <>
                  {/* neighbor */}
                  {yi < resolutionY - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 'x'}
                      p1={y}
                      p2={particles.current[xi][yi + 1]}
                      distance={distanceY}
                    />
                  )}
                  {xi < resolutionX - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 'y'}
                      p1={y}
                      p2={particles.current[xi + 1][yi]}
                      distance={distanceX}
                    />
                  )}
                  {/* shear */}
                  {xi < resolutionX - 1 && yi < resolutionX - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 's1'}
                      p1={y}
                      p2={particles.current[xi + 1][yi + 1]}
                      distance={distanceDiagonal}
                    />
                  )}
                  {xi > 0 && yi < resolutionY - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 's2'}
                      p1={y}
                      p2={particles.current[xi - 1][yi + 1]}
                      distance={distanceDiagonal}
                    />
                  )}

                  {/* neighbor */}
                  {/* {xi < resolutionX - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 'x'}
                      p1={x}
                      p2={particles.current[yi][xi + 1]}
                      distance={distanceX}
                    />
                  )}
                  {yi < resolutionY - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 'y'}
                      p1={x}
                      p2={particles.current[yi + 1][xi]}
                      distance={distanceY}
                    />
                  )}
                  {/* shear */}
                  {/* {yi < resolutionY - 1 && xi < resolutionX - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 's1'}
                      p1={x}
                      p2={particles.current[yi + 1][xi + 1]}
                      distance={distanceDiagonal}
                    />
                  )}
                  {yi > 0 && xi < resolutionX - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 's2'}
                      p1={x}
                      p2={particles.current[yi - 1][xi + 1]}
                      distance={distanceDiagonal}
                    />
                  )} */}
                  {/* flex */}
                  {/* {xi < resolutionX - 2 && (
                    <Stitch key={yi + '-' + xi + 'f1'} p1={x} p2={particles.current[yi][xi + 2]} distance={distanceX * 2} />
                  )}
                  {yi < resolutionY - 2 && (
                    <Stitch key={yi + '-' + xi + 'f2'} p1={x} p2={particles.current[yi + 2][xi]} distance={distanceY * 2} />
                  )}{' '} */}
                </>
              )
            })
          )}
      </>
    )
  })
)

function MousePointer({
  children,
  size,
}: PropsWithChildren<{ size: number }>): JSX.Element {
  const position: Triplet = [0, 0, 0]
  const args: Triplet = [size, size, 2]

  const [ref, api] = useBox(
    () => ({ args, position, mass: 5, type: 'Static' }),
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
  const cloth = useRef()

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
            <MousePointer size={0.5}></MousePointer>
            <Cloth ref={cloth} />
            <Badge>
              <></>
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
