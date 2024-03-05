'use client'
import {
  PublicApi,
  Triplet,
  useBox,
  useDistanceConstraint,
  useParticle,
  usePointToPointConstraint,
} from '@react-three/cannon'
import {
  MeshTransmissionMaterial,
  Sphere,
  useScroll,
  useTexture,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import type { MutableRefObject, PropsWithChildren, RefObject } from 'react'
import {
  createContext,
  createRef,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  Mesh,
  Object3D,
  Object3DEventMap,
  Shape,
} from 'three'

const resolutionX = 2
const resolutionY = 51
const strapLength = 14
const linearDamping = 0.3
const angularDamping = 0.5
const strapColor = '#111111'
const badgeColor = '#000000'
const badgeOpacity = 1
const strapSize = {
  width: 0.8,
  height: 1,
  depth: 0.2,
}

const badgeSize = {
  width: 4,
  height: 6,
  depth: 0.04,
  margin: 0.1,
  radius: 0.4,
}

const parent = createContext({
  parentposition: [0, 0, 0] as Triplet,
  parentRef: createRef<Mesh | Group>(),
  // grandparentRef: createRef<Mesh>(),
  // refLeft: createRef<Mesh>(),
  // refRight: createRef<Mesh>(),
})

type ParticleType = {
  particle: RefObject<Object3D<Object3DEventMap>>
  api: PublicApi
}

type StitchProps = {
  p1: RefObject<ParticleType>
  p2: RefObject<ParticleType>
  distance: number
}

const Stitch = memo(({ p1, p2, distance = 0.1 }: StitchProps) => {
  if (p1.current && p2.current) {
    useDistanceConstraint(p1.current.particle, p2.current.particle, {
      distance,
    })
  }

  return null
})

type BadgeStitchProps = {
  particle: RefObject<ParticleType>
  badge: RefObject<Mesh | Group>
  zPos: number
  xPos: number
}

const BadgeStitch = memo(
  ({ particle, badge, zPos = 0.1, xPos }: BadgeStitchProps) => {
    // useDistanceConstraint(badge, particle.current.particle, {
    //   distance: 0.0,
    //   wakeUpBodies: true,
    // })
    if (particle.current) {
      usePointToPointConstraint(badge, particle.current.particle, {
        collideConnected: false,
        pivotA: [xPos, badgeSize.height / 2 + 0.2, zPos], //badge
        pivotB: [0, 0, 0],
        // maxForce: 1000,
        // maxMultiplier: 100000,
      })
      // useConeTwistConstraint
      // useHingeConstraint(badge, particle.current.particle, {
      //   axisA: [1, 1, 1], //badge
      //   axisB: [1, 1, 1],
      //   collideConnected: false,
      //   pivotA: [xPos, badgeSize.height / 2 + 0.4, zPos], //badge
      //   pivotB: [0, 0, 0],
      //   // maxForce: 5000,
      // })
    }
    return null
  }
)

interface PropsDummy {}

interface ParticleProps {
  mass: number
  position: Triplet
  color: string
}

const Particle = memo(
  forwardRef<ParticleType, ParticleProps>(({ mass, position, color }, ref) => {
    let forwardedRef = ref as MutableRefObject<ParticleType>

    let [particle, api] = useParticle(() => ({
      mass,
      position,
      linearDamping: linearDamping,
      angularDamping: angularDamping,
    }))

    if (forwardedRef && particle.current) {
      forwardedRef.current = { particle, api }
    }
    return null
    // return (
    //   <Sphere ref={particle} args={[0.05]} position={position}>
    //     <meshStandardMaterial color={color} />
    //   </Sphere>
    // )
  })
)

const strappositions: Triplet[][] = new Array(resolutionY)
  .fill(false)
  .map(() => new Array(resolutionY).fill(false))
// [
//   Array.from({
//     length: 2 * 16,
//   }) as Triplet,
// ].fill(
//   Array.from({
//     length: 2 * 16,
//   }) as Triplet
// )

const getPosition = (width: number, height: number): Triplet => {
  if (window.innerWidth < window.innerHeight) {
    return [width / 4, height / 4, 0]
  } else {
    return [width / 4, height / 3, 0]
  }
}

const Cloth = memo(
  forwardRef(({ delay }: { delay: number }, ref) => {
    const strapRef = useRef<Mesh>(null!)
    const groupRef = useRef<Group>(null!)
    const [readyForStitches, setReadyForStitches] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const { parentposition, parentRef } = useContext(parent)

    const strapDistance = 1.5
    const { width, height } = useThree((state) => state.viewport)

    const [position, setPosition] = useState(getPosition(width, height))
    useEffect(() => {
      setPosition(getPosition(width, height))
    }, [width])

    const particles = useRef<RefObject<ParticleType>[][]>(
      Array.from({ length: resolutionX }, () =>
        Array.from({ length: resolutionY }, () => createRef<ParticleType>())
      )
    )

    useEffect(() => {
      setReadyForStitches(true)
    }, [])

    const setupSubscribe = (
      particles: { subscribe: (arg0: (v: any) => void) => void },
      x: number,
      y: number
    ) => {
      particles.subscribe((v: Triplet) => {
        strappositions[x][y] = v
      })
    }

    const getStrapPosition = (
      isFirst: boolean,
      x: number,
      position: number[]
    ): [x: number, y: number, z: number] => {
      if (isFirst) {
        if (x === 0) {
          return [
            position[0] - strapDistance / 2 - strapSize.width,
            position[1] + strapLength / 2,
            position[2],
          ]
        } else {
          return [
            position[0] - strapDistance / 2,
            position[1] + strapLength / 2,
            position[2],
          ]
        }
      } else {
        if (x === 0) {
          return [
            position[0] + strapDistance / 2,
            position[1] + strapLength / 2,
            position[2] - strapDistance,
          ]
        } else {
          return [
            position[0] + strapDistance / 2 + strapSize.width,
            position[1] + strapLength / 2,
            position[2] - strapDistance,
          ]
        }
      }
    }
    useEffect(() => {
      if (position && readyForStitches) {
        // console.log(
        //   'Cloth position',
        //   position,
        //   particles.current[0][0].current.api
        // )
        particles.current[0][0].current?.api.position.set(
          ...getStrapPosition(true, 0, position)
        )
        particles.current[1][0].current?.api.position.set(
          ...getStrapPosition(true, 1, position)
        )
        particles.current[0][
          particles.current[0].length - 1
        ].current?.api.position.set(...getStrapPosition(false, 0, position))
        particles.current[1][
          particles.current[0].length - 1
        ].current?.api.position.set(...getStrapPosition(false, 1, position))
      }
    }, [position])

    useEffect(() => {
      let counter = 0
      particles.current.forEach((particleX, xi) => {
        particleX.forEach((particleY, i) => {
          // console.log('setupSubscribe y', counter)
          if (particleY.current) {
            // console.log(particleX.current?.api.position)
            setupSubscribe(particleY.current.api.position, xi, i)
          }
          counter++
        })
      })

      const timeoutId = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }, [readyForStitches])

    useFrame((_, delta) => {
      if (readyForStitches) {
        updatePlane()
      }
    })
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     updatePlane()
    //     // console.log(strappositions)
    //   }, 50)

    //   return () => clearInterval(interval)
    // }, [readyForStitches])

    const updatePlane = () => {
      if (particles.current[0][0] && strapRef.current) {
        const geom = strapRef.current.geometry

        let pos = geom.attributes.position

        let y = 0
        let x = 0
        for (let i = 0; i < pos.count; i++) {
          if (i % resolutionX === 0) {
            x = 0
          }
          // console.log(y, x)
          if (particles.current[x][y] && particles.current[x][y].current) {
            // console.log(y, x)
            // console.log(i, strappositions[x])
            if (strappositions[x]) {
              // vec2.fromBufferAttribute(uv, i).add(uvShift).multiplyScalar(multiplier)
              pos.setXYZ(
                i,
                strappositions[x][y][0],
                strappositions[x][y][1],
                strappositions[x][y][2]
              )
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

        geom.attributes.position.needsUpdate = true //;.verticesNeedUpdate = true
        geom.computeVertexNormals()
        // }
      }
    }

    const distanceY = strapLength / resolutionY
    const distanceDiagonal = Math.sqrt(
      strapSize.width * strapSize.width + distanceY * distanceY
    )

    const textureprops = useTexture({ map: 'strapimage.png' })

    const halfY = Math.floor(resolutionY / 2)

    return (
      <group position={[0, 0, 0]} ref={groupRef}>
        <mesh
          ref={strapRef}
          position={[0, 0, 0]}
          castShadow={isVisible}
          receiveShadow
        >
          <planeGeometry
            args={[strapSize.width, strapLength, 1, resolutionY - 1]}
          />
          <meshStandardMaterial
            // color={strapColor}
            transparent={!isVisible}
            opacity={0}
            side={DoubleSide}
            // roughness={1}
            // metalness={0.6}
            // roughness={0.6}
            // metalness={0.6}
            {...textureprops}
          />
        </mesh>
        {particles.current.map((y, yi) =>
          y.map((x, xi) => {
            const isFirst = xi === 0
            const isLast = xi === y.length - 1
            let xpos = position[0] + strapSize.width * yi
            let ypos = position[1] + xi * distanceY
            let zpos = isLast ? position[2] - 1.5 : position[2] //xi === 0 || xi === y.length - 1 ? 0 : 1
            // zpos = zpos - strapSize.width * yi

            let mass = 5

            if (isFirst) {
              ypos = position[1] + strapLength / 2
              let pos = getStrapPosition(true, yi, position)
              if (yi === 0) {
                xpos = pos[0]
                zpos = pos[2]
              } else {
                xpos = pos[0]
                zpos = pos[2]
              }
              // zpos = position[2]
              // xpos = position[0]
              mass = 0
            }

            if (isLast) {
              ypos = position[1] + strapLength / 2
              let pos = getStrapPosition(false, yi, position)
              if (yi === 0) {
                xpos = pos[0]
                zpos = pos[2]
              } else {
                xpos = pos[0]
                zpos = pos[2]
              }
              // xpos = position[0] + 2
              // zpos = position[2] + 0.5 - strapSize.width
              mass = 0
            }
            return (
              <Particle
                color={
                  xi === halfY
                    ? yi === 0
                      ? 'blue'
                      : 'hotpink'
                    : `#${xi}${xi}${xi}${xi}${xi}${xi}`
                }
                ref={x}
                mass={mass}
                key={yi + '-' + xi}
                position={[xpos, ypos, zpos]}
              />
            )
          })
        )}
        {readyForStitches && parentRef && (
          <>
            <BadgeStitch
              particle={particles.current[0][halfY]}
              badge={parentRef}
              xPos={-strapSize.width / 2}
              // zPos={-badgeSize.depth / 1}
              zPos={0}
            />
            <BadgeStitch
              particle={particles.current[1][halfY]}
              badge={parentRef}
              xPos={strapSize.width / 2}
              // zPos={-badgeSize.depth / 1}
              zPos={0}
            />
            {/* <BadgeStitch
              particle={particles.current[0][halfY + 1]}
              badge={parentRef}
              xPos={-strapSize.width / 2}
              zPos={badgeSize.depth / 1}
            />
            <BadgeStitch
              particle={particles.current[1][halfY + 1]}
              badge={parentRef}
              xPos={strapSize.width / 2}
              zPos={badgeSize.depth / 1}
            /> */}
          </>
        )}
        {readyForStitches &&
          particles.current.map((x, xi) =>
            x.map((y, yi) => {
              const particleBase = y
              const sameRowNext: RefObject<ParticleType> =
                yi < resolutionY - 1
                  ? particles.current[xi][yi + 1]
                  : createRef()
              const nextRowSame: RefObject<ParticleType> =
                xi < resolutionX - 1
                  ? particles.current[xi + 1][yi]
                  : createRef()
              const nextRowNext: RefObject<ParticleType> =
                xi < resolutionX - 1 && yi < resolutionX - 1
                  ? particles.current[xi + 1][yi + 1]
                  : createRef()
              const prevRowNext: RefObject<ParticleType> =
                xi > 0 && yi < resolutionY - 1
                  ? particles.current[xi - 1][yi + 1]
                  : createRef()

              // if (yi === halfY) {
              //   return null
              // }
              return (
                <>
                  {/* neighbor */}
                  {yi < resolutionY - 1 && (
                    <Stitch
                      key={yi + '-' + xi + 'x'}
                      p1={particleBase}
                      p2={sameRowNext}
                      distance={distanceY}
                    />
                  )}

                  {xi < resolutionX - 1 && yi !== halfY && (
                    <Stitch
                      key={yi + '-' + xi + 'y'}
                      p1={particleBase}
                      p2={nextRowSame}
                      distance={strapSize.width}
                    />
                  )}
                  {/* shear */}
                  {xi < resolutionX - 1 &&
                    yi < resolutionX - 1 &&
                    yi !== halfY && (
                      <Stitch
                        key={yi + '-' + xi + 's1'}
                        p1={particleBase}
                        p2={nextRowNext}
                        distance={distanceDiagonal}
                      />
                    )}
                  {xi > 0 && yi < resolutionY - 1 && yi !== halfY && (
                    <Stitch
                      key={yi + '-' + xi + 's2'}
                      p1={particleBase}
                      p2={prevRowNext}
                      distance={distanceDiagonal}
                    />
                  )}

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
      </group>
    )
  })
)

function roundedBoxFlat(
  w: number,
  h: number,
  d: number,
  r: number,
  s: number,
  q?: number
) {
  let qu = q || 1 // qu: start quadrant regarding u, optional
  const pi = Math.PI
  let indices: any[] = []
  let positions: any[] = []
  let uvs: any[] = []

  makeFronts(s, 1, 0) // smoothness, front is 1, start index  center front
  makeFronts(s, -1, 4 * (s + 3) + 1) // smoothness, back is -1, start index center back
  makeFrame(s, 2 * (4 * (s + 3) + 1), 1, 4 * (s + 3) + 2) // smoothness, start index framing ,start index front, start index back

  const geometry = new BufferGeometry()
  geometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1))
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(positions), 3)
  )
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))

  // add multimaterial groups for front, back, framing

  const vtc = 4 * (s + 2) * 3
  geometry.addGroup(0, vtc, 0)
  geometry.addGroup(vtc, vtc, 1)
  geometry.addGroup(2 * vtc, 2 * vtc + 3, 2)

  geometry.computeVertexNormals()

  return geometry

  function makeFronts(s: number, side: number, idx: number) {
    const d0 = side === 1 ? 0 : 1
    const d1 = side === 1 ? 1 : 0

    let id = 0

    for (let q = 1; q < 5; q++) {
      // quadrants

      id++

      for (let j = 0; j < s + 2; j++) {
        indices.push(idx, idx + d0 + id, idx + d1 + id)
        id++
      }
    }

    positions.push(0, 0, (side * d) / 2) // center
    uvs.push(0.5, 0.5)

    let x, y, z, sgnX, sgnY
    let phi = 0
    const u0 = side === 1 ? 0 : 1

    for (let q = 1; q < 5; q++) {
      sgnX = q === 1 || q === 4 ? 1 : -1
      sgnY = q < 3 ? 1 : -1

      x = (Math.cos(phi) * w) / 2
      y = (Math.sin(phi) * h) / 2
      z = (side * d) / 2

      positions.push(x, y, z)
      uvs.push(u0 + side * (0.5 + x / w), 0.5 + y / h)

      for (let j = 0; j < s + 1; j++) {
        const c = {
          x: sgnX * (w / 2 - r),
          y: sgnY * (h / 2 - r),
          z: (side * d) / 2,
        } // quadrant center

        const dPhi = ((pi / 2) * j) / s

        x = c.x + r * Math.cos(phi + dPhi)
        y = c.y + r * Math.sin(phi + dPhi)
        z = c.z
        positions.push(x, y, z)
        uvs.push(u0 + side * (0.5 + x / w), 0.5 + y / h)
      }

      phi = phi + pi / 2

      x = (Math.cos(phi) * w) / 2
      y = (Math.sin(phi) * h) / 2
      z = (side * d) / 2

      positions.push(x, y, z)
      uvs.push(u0 + side * (0.5 + x / w), 0.5 + y / h)
    }
  }

  function makeFrame(s: number, sidx: number, sif: number, sib: number) {
    let a, b, c, d, xf, yf, zf, xb, yb, zb
    const pif = sif * 3 // position start index front
    const pib = sib * 3 // position start index back

    let idx = sidx

    for (let q = 1; q < 5; q++) {
      for (let j = 0; j < s + 2; j++) {
        a = idx
        b = idx + 1
        c = idx + 2
        d = idx + 3

        indices.push(a, b, d, a, d, c)

        idx += 2
      }

      idx += 2
    }

    const ls = 2 * r * Math.sin(pi / (s * 4)) // length of the outer line of a corner segment
    const w2r = w / 2 - r
    const h2r = h / 2 - r
    const peri = 4 * w2r + 4 * h2r + 4 * s * ls // perimeter

    let u
    idx = 0 // reset

    for (let q = 1; q < 5; q++) {
      // console.log ( 'qu', qu );

      u = qu / 4

      for (let j = 0; j < s + 3; j++) {
        xf = positions[pif + idx]
        yf = positions[pif + idx + 1]
        zf = positions[pif + idx + 2]

        xb = positions[pib + idx]
        yb = positions[pib + idx + 1]
        zb = positions[pib + idx + 2]

        positions.push(xf, yf, zf, xb, yb, zb)

        idx += 3

        // console.log ( 'u ', u );

        uvs.push(u, 0, u, 1)

        if (j === 0) {
          u -= q === 1 || q === 3 ? h2r / peri : w2r / peri
        }
        if (j === s + 1) {
          u -= q === 1 || q === 3 ? w2r / peri : h2r / peri
        }
        if (j > 0 && j < s + 1) {
          u -= ls / peri
        }
      }

      qu = 4 - ((5 - qu) % 4) // cyclic next quadrant with respect to u
    }
  }
}

function Extrusion({ ...props }) {
  const curve = badgeSize.radius
  const badgeXright = 0 + badgeSize.width / 2
  const badgeXLeft = 0 - badgeSize.width / 2
  const start = [badgeXright - curve, badgeSize.height / 2]
  const badgePaths: number[][] = []

  badgePaths.push([start[0], start[1]])
  badgePaths.push([badgeXright, start[1], badgeXright, start[1] - curve])
  badgePaths.push([badgeXright, start[1] - badgeSize.height + curve]) //line
  // paths.push([start[0], start[1] - badgeSize.height])

  badgePaths.push([
    badgeXright,
    start[1] - badgeSize.height,
    start[0],
    start[1] - badgeSize.height,
  ])

  badgePaths.push([badgeXLeft + curve, start[1] - badgeSize.height]) //line
  // paths.push([start[0] - badgeSize.width, start[1] - badgeSize.height + curve])

  badgePaths.push([
    badgeXLeft,
    start[1] - badgeSize.height,
    badgeXLeft,
    start[1] - badgeSize.height + curve,
  ])

  badgePaths.push([badgeXLeft, start[1] - curve]) //line
  // paths.push([badgeXLeft, start[1]])

  badgePaths.push([badgeXLeft, start[1], badgeXLeft + curve, start[1]])

  const zero = 0
  const topWidthBottom = strapSize.width + 0.5
  const topWidthMid = topWidthBottom - 0.2
  const topWidthTop = topWidthMid - 0.2
  const topStartBottom = zero - topWidthBottom / 2
  const topStartMid = zero - topWidthMid / 2
  const topStartTop = zero - topWidthTop / 2
  const topSlope = 0.1
  const topSlopeHalf = 0.05

  badgePaths.push([topStartBottom, start[1]])

  badgePaths.push([
    topStartMid - topSlopeHalf,
    start[1],
    topStartMid,
    start[1] + topSlope,
  ])
  badgePaths.push([
    topStartTop - topSlopeHalf,
    start[1] + topSlope + topSlope,
    topStartTop,
    start[1] + topSlope + topSlope,
  ])
  badgePaths.push([topStartTop + topWidthTop, start[1] + topSlope + topSlope])

  badgePaths.push([
    topStartMid + topWidthMid - topSlopeHalf,
    start[1] + topSlope + topSlope,
    topStartMid + topWidthMid,
    start[1] + topSlope,
  ])

  badgePaths.push([
    topStartMid + topWidthMid + topSlopeHalf,
    start[1],
    topStartBottom + topWidthBottom,
    start[1],
  ])
  badgePaths.push([start[0], start[1]])

  // HOLE
  const holeWidth = 0.6
  const holeHeight = 0.1
  const holeHeightHalf = holeHeight / 2
  const holeXright = 0 + holeWidth / 2
  const holeXLeft = 0 - holeWidth / 2
  const holeStart = [holeXLeft, start[1]]
  const badgeHolePaths = []
  badgeHolePaths.push([holeStart[0], holeStart[1]])
  badgeHolePaths.push([holeXright - holeHeightHalf, holeStart[1]]) // Bottom right
  badgeHolePaths.push([
    holeXright,
    holeStart[1],
    holeXright,
    holeStart[1] + holeHeightHalf,
  ])
  badgeHolePaths.push([
    holeXright,
    holeStart[1] + holeHeight,
    holeXright - holeHeightHalf,
    holeStart[1] + holeHeight,
  ])
  // badgeHolePaths.push([
  //   holeStart[0] + holeWidth - holeHeightHalf,
  //   holeStart[1] + holeHeight,
  // ])
  badgeHolePaths.push([
    holeStart[0] + holeHeightHalf,
    holeStart[1] + holeHeight,
  ])

  badgeHolePaths.push([
    holeStart[0],
    holeStart[1] + holeHeight,
    holeStart[0],
    holeStart[1] + holeHeightHalf,
  ])
  badgeHolePaths.push([
    holeStart[0],
    holeStart[1],
    holeStart[0] + holeHeightHalf,
    holeStart[1],
  ])

  const shape = useMemo(() => {
    const shape = new Shape()

    badgePaths.forEach((path: number[], i: number) => {
      if (i === 0) {
        shape.moveTo(...(path as [x: number, y: number]))
      } else {
        if (path.length > 2) {
          return shape.quadraticCurveTo(
            ...(path as [aCPx: number, aCPy: number, aX: number, aY: number])
          )
        }
        return shape.lineTo(...(path as [x: number, y: number]))
      }
    })

    let roundedshape = roundedPlaneShape(false)
    shape.holes = [roundedshape]

    return shape
  }, [start, badgePaths])

  const textureprops = useTexture({ map: 'badgeimage.png' })

  const imageshape = roundedBoxFlat(
    badgeSize.width - badgeSize.margin * 4,
    badgeSize.height - badgeSize.margin * 4,
    0.01,
    badgeSize.radius - badgeSize.margin,
    5
  )
  // let imageshape = roundedPlaneShape(true)
  const { gl } = useThree()
  return (
    <group>
      <mesh receiveShadow castShadow position={[0, 0, -badgeSize.depth]}>
        <extrudeGeometry
          args={[
            shape,
            {
              bevelEnabled: true,
              bevelThickness: 0.01,
              bevelSize: 0.01,
              depth: badgeSize.depth * 2,
            },
          ]}
        />
        <MeshTransmissionMaterial
          distortion={0}
          distortionScale={0.5}
          temporalDistortion={0}
          color={badgeColor}
          // background={new Color(1, 1, 1)}
          transmissionSampler={true}
          transmission={1}
          thickness={0.1}
          roughness={0.2}
          metalness={0}
          backside={false}
          // chromaticAberration={0.7}
          // anisotropicBlur={0.7}
          transparent={true}
          opacity={badgeOpacity}
        />

        {/* <meshStandardMaterial
          color={badgeColor}
          metalness={0}
          roughness={0.3}
          transparent={true}
          opacity={0.3}
        /> */}
      </mesh>

      <mesh geometry={imageshape} castShadow position={[0, 0, 0]}>
        <meshStandardMaterial {...textureprops} metalness={0} roughness={0.2} />
        {/* <meshStandardMaterial color={'red'} metalness={0} roughness={0.3} /> */}
      </mesh>
    </group>
  )
}

function roundedPlaneShape(reverse: boolean | undefined) {
  let radius = badgeSize.radius - badgeSize.margin
  let basewidth = badgeSize.width - badgeSize.margin
  let baseheight = badgeSize.height - badgeSize.margin
  let width = basewidth - radius * 2
  let height = baseheight - radius * 2
  let basex = 0 //width / -2
  let basey = 0 //height / -2
  let x = basex - width / 2 + radius / 2
  let y = basey - height / 2 - radius / 2

  const points = []
  points.push([x, y])
  points.push([x + width - radius, y])
  points.push([x + width, y, x + width, y + radius])
  points.push([x + width, y + height])
  points.push([
    x + width,
    y + height + radius,
    x + width - radius,
    y + height + radius,
  ])
  points.push([x, y + height + radius])
  points.push([x - radius, y + height + radius, x - radius, y + height])
  points.push([x - radius, y + radius])
  points.push([x - radius, y, x, y])

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

  points.forEach((path, i) => {
    if (i === 0) {
      shape.moveTo(...(path as [x: number, y: number]))
    } else {
      if (path.length > 2) {
        return shape.quadraticCurveTo(
          ...(path as [aCPx: number, aCPy: number, aX: number, aY: number])
        )
      }
      return shape.lineTo(...(path as [x: number, y: number]))
    }
  })

  if (reverse === true) {
    const newpoints = shape.getPoints()
    const newshape = new Shape(newpoints.reverse())

    return newshape
  }

  // shape.moveTo(x, y)
  // shape.lineTo(x + width - radius, y) //Line
  // shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  // shape.lineTo(x + width, y + height) //Line
  // shape.quadraticCurveTo(
  //   x + width,
  //   y + height + radius,
  //   x + width - radius,
  //   y + height + radius
  // )
  // shape.lineTo(x, y + height + radius) //Line
  // shape.quadraticCurveTo(
  //   x - radius,
  //   y + height + radius,
  //   x - radius,
  //   y + height
  // )
  // shape.lineTo(x - radius, y + radius) //Line

  // shape.quadraticCurveTo(
  //   x - radius,
  //   y,

  //   x,
  //   y
  // )

  return shape
}

type BadgeProps = {
  delay: number
}

function Badge({ children, delay }: PropsWithChildren<BadgeProps>) {
  // const position = [0, 0, 0] as Triplet

  const data = useScroll()

  const { width, height } = useThree((state) => state.viewport)
  const [position, setPosition] = useState(getPosition(width, height))

  const boxSize = [
    badgeSize.width,
    badgeSize.height,
    badgeSize.depth,
  ] as Triplet

  const topbarSize = {
    width: strapSize.width,
    height: 0.2,
    depth: 0.05,
  }
  // const [refTop] = useBox(
  //   () => ({
  //     args: [topbarSize.width, topbarSize.height, topbarSize.depth],
  //     position: [position[0], position[1], position[2]],
  //     mass: 1,
  //     type: 'Dynamic',
  //     linearDamping: 0,
  //     angularDamping: 0,
  //   }),
  //   useRef<Mesh>(null)
  // )

  const [refBagde, badgeApi] = useBox(
    () => ({
      args: [boxSize[0], boxSize[1], boxSize[2]],
      position: [position[0] + 4, position[1] + 5, position[2]],
      rotation: [0, 0, 1.5],
      mass: 0,
      type: 'Dynamic',
      // type: 'Static',
      linearDamping: linearDamping,
      angularDamping: angularDamping,
    }), //'Dynamic' | 'Static' | 'Kinematic';
    useRef<Group>(null!)
  )

  // useFrame((state, delta) => {
  //   console.log('data', data.delta)
  //   badgeApi.applyImpulse([0, data.delta, 0], position)
  // })

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      badgeApi.mass.set(10)
      if (refBagde.current) refBagde.current.visible = true
    }, delay)

    console.log('data', data.delta)
    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId)
  }, []) // Empty dependency array ensures the effect runs only once

  // const [refBottom] = useBox(
  //   () => ({
  //     args: [strapSize.width, 0.5, 0.05],
  //     // position: [0, position[1] - 0.5, 0],
  //     mass: 1,
  //     type: 'Dynamic',
  //   }),
  //   useRef<Mesh>(null)
  // )

  // const [refSphereLeft] = useBox(
  //   () => ({
  //     args: [0.05, 0.05, 0.5],
  //     position: [position[0] - strapSize.width / 2, position[1] + 0.1, 0],
  //     mass: 1,
  //     type: 'Dynamic',
  //     linearDamping: linearDamping,
  //     angularDamping: angularDamping,
  //   }),
  //   useRef<Mesh>(null)
  // )
  // const [refSphereRight] = useBox(
  //   () => ({
  //     args: [0.05, 0.05, 0.5],
  //     position: [position[0] + strapSize.width / 2, position[1] + 0.1, 0],
  //     mass: 1,
  //     type: 'Dynamic',
  //     linearDamping: linearDamping,
  //     angularDamping: angularDamping,
  //   }),
  //   useRef<Mesh>(null)
  // )
  // useDistanceConstraint(refTop, refSphereLeft, { distance: 0.1 })
  // useDistanceConstraint(refTop, refSphereRight, { distance: 0.1 })

  // useHingeConstraint(refBagde, refSphereRight, {
  //   axisA: [0, 0, 1], //badge
  //   axisB: [0, 0, 1],
  //   collideConnected: false,
  //   pivotA: [topbarSize.width / 2, badgeSize.height / 2, 0], //badge
  //   pivotB: [0, -0.025, 0],
  //   maxForce: 5000,
  // })
  // useHingeConstraint(refBagde, refSphereLeft, {
  //   axisA: [0, 0, 1], //badge
  //   axisB: [0, 0, 1],
  //   collideConnected: false,
  //   pivotA: [-topbarSize.width / 2, badgeSize.height / 2, 0],
  //   pivotB: [0, -0.025, 0],
  //   maxForce: 5000,
  // })
  // useHingeConstraint(refTop, refSphereRight, {
  //   axisA: [1, 0, 0],
  //   axisB: [0, 1, 0],
  //   collideConnected: false,
  //   pivotA: [topbarSize.width / 2, topbarSize.height / 2, 0], //topbar
  //   pivotB: [0, 0.025, 0],
  //   // maxForce: 0.5,
  // })
  // useHingeConstraint(refTop, refSphereLeft, {
  //   axisA: [1, 0, 0],
  //   axisB: [0, 1, 0],
  //   collideConnected: false,
  //   pivotA: [-topbarSize.width / 2, topbarSize.height / 2, 0],
  //   pivotB: [0, 0.025, 0],
  //   // maxForce: 0.5,
  // })
  // usePointToPointConstraint(refBagde, refSphereLeft, {
  //   collideConnected: false,
  //   pivotA: [topbarSize.width / 2, badgeSize.height / 2, 0], //badge
  //   pivotB: [0, 0.025, 0],
  //   // maxForce: 1000,
  //   // maxMultiplier: 100000,
  // })
  // usePointToPointConstraint(refBagde, refSphereRight, {
  //   collideConnected: false,
  //   pivotA: [-topbarSize.width / 2, badgeSize.height / 2, 0], //badge
  //   pivotB: [0, 0.025, 0],
  //   // maxForce: 1000,
  //   // maxMultiplier: 100000,
  // })
  // useLockConstraint(refTop, refSphereRight, {
  //   collideConnected: true,
  // })
  // useLockConstraint(refTop, refSphereLeft, {
  //   collideConnected: true,
  // })

  // const [, , topBottomhingeApi] = useHingeConstraint(refTop, refBottom, {
  //   axisA: [1, 0, 0],
  //   axisB: [1, 0, 0],
  //   collideConnected: true,
  //   pivotA: [0, -0.255, 0],
  //   pivotB: [0, 0.255, 0],
  // })

  // const [, , bottomBadgehingeApi] = useHingeConstraint(refTop, refBagde, {
  //   axisA: [0, 0, 1],
  //   axisB: [0, 0, 1],
  //   collideConnected: false,
  //   pivotA: [0, -topbarSize.height, 0], //topbar
  //   pivotB: [0, badgeSize.height / 2, 0],
  // })

  return (
    <>
      <group ref={refBagde} visible={false}>
        <Extrusion />
      </group>

      <parent.Provider
        value={{
          parentposition: position,
          // refLeft: refSphereLeft,
          // refRight: refSphereRight,
          parentRef: refBagde,
        }}
      >
        <Cloth delay={delay} />
      </parent.Provider>
    </>
  )
}

export default Badge
