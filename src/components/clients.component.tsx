'use client'
import { Text, useIntersect, useScroll } from '@react-three/drei'
import { Triplet } from '@react-three/cannon'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Ref, forwardRef, useRef } from 'react'
import { Shape, MathUtils, Group, Mesh } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const clients: any[] = []
clients.push({
  name: 'Falck',
  type: 'consultant',
  height: 3,
})
clients.push({
  name: 'LEGO',
  type: 'consultant',
  height: 6,
})
clients.push({
  name: 'NETS',
  type: 'consultant',
  height: 4,
})
clients.push({
  name: 'Kontrapunkt',
  type: 'freelance',
  height: 2,
})
clients.push({
  name: 'Axcel',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'Chainalysis',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'Paralenz',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'Kontrafej',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'Danish Crown',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'Karimoku',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'Bavarian Nordic',
  type: 'freelance',
  height: 3,
})
clients.push({
  name: 'eBay',
  type: 'employee',
  height: 3,
})

function roundedPlaneShape(
  basewidth: number,
  baseheight: number,
  basedepth: any
) {
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
const SquareWrapper = ({
  square_width,
  square_height,
  square_depth,
  position,
  start,
  client,
  backgroundColor,
}: {
  square_width: number
  square_height: number
  square_depth: number
  position: Triplet
  start: number
  client: any
  backgroundColor: any
}) => {
  // const scroll = useScroll()
  const data = useScroll()
  const group = useRef<Group>(null!)
  const visible = useRef(false)
  // const square = useIntersect<Mesh>(
  //   (isVisible) => (visible.current = isVisible)
  // )
  // const [textureRed, textureBlue] = useTexture([
  //   '/Chroma Red.jpg',
  //   '/Chroma Blue.jpg',
  // ])
  const dist = 0.4
  const end = start + dist

  useFrame((state, delta) => {
    if (group.current != undefined) {
      const r1 = data.range(start, 1 / 6)
      // const r2 = scroll.range(1 / 4, 1 / 4)
      // const r3 = scroll.visible(4 / 5, 1 / 5)

      const rotation = MathUtils.damp(0, Math.PI / 2, 3, r1)
      // ref.current.scale.set(scale, scale, scale)
      // console.log('pos', rotation)
      //(Math.PI / 2) * rsqw(progress)
      if (rotation > 0) {
        group.current.rotation.x = rotation
      } else {
        group.current.rotation.x = 0
      }
      // square1.current.rotation.x = (Math.PI / -2) * rsqw(r1) - Math.PI / -2
      // group.current.rotation.y = MathUtils.damp(group.current.rotation.y, (-Math.PI / 1.45) * r2, 4, delta)
      // group.current.position.x = MathUtils.damp(group.current.position.x, (-width / 7) * r2, 4, delta)
      // group.current.scale.x = group.current.scale.y = group.current.scale.z = MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 4, delta)
    }
  })

  return (
    <group ref={group} position={position}>
      <Text position={[0, square_height / 2, 0.04]} fontSize={0.4}>
        {client.name}
      </Text>
      <Square
        // ref={square}
        {...{ square_width, square_height, square_depth }}
        backgroundColor={backgroundColor}
      ></Square>
    </group>
  )
}

interface SquareProps {
  square_width: number
  square_height: number
  square_depth: number
  backgroundColor: any
}

const Square = forwardRef<Ref<Mesh>, SquareProps>(
  ({ square_width, square_height, square_depth, backgroundColor }, ref) => {
    let shape = roundedPlaneShape(square_width, square_height, square_depth)

    return (
      <mesh
        // ref={ref}
        receiveShadow
        castShadow
        position={[0, square_height / 2, -square_depth + 0.03]}
      >
        <extrudeGeometry
          args={[
            shape,
            {
              bevelEnabled: false,
              bevelThickness: 0.02,
              bevelSize: 0.02,
              depth: square_depth,
            },
          ]}
        />

        <meshStandardMaterial attach={`material-0`} color={backgroundColor} />
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
    )
  }
)

function ClientsCanvas({ backgroundColor }: { backgroundColor: any }) {
  const { width, height } = useThree((state) => state.viewport)

  const offset = 0
  const totalHeight = height * 2
  const squareSize = {
    width: 6,
    height: 6,
    depth: 4,
  }
  const margin = 1.4
  const halfmargin = margin / 2
  // squareSize.height = squareSize.width * 1.5
  // const bottomOfView = height / 2 - height * progress
  const calcStart = (start: number) => {
    const pctPos = start / totalHeight
    console.log('pctPos', start, pctPos)
    const returnvalue = height * 3 - height * pctPos
    // console.log(returnvalue, totalHeight, start)
    return pctPos + 0.1
  }
  // console.log('progress', progress)

  const rows = 2
  let yPos = [0, squareSize.height / 2]
  return (
    <>
      <group position={[0, height / 2 - height, 0]}>
        {/* <Box position={[0, bottomOfView, 0]} args={[10, 0.2, 1]}></Box> */}
        {clients.map((client, i) => {
          yPos[i % rows] += squareSize.height + margin
          // yPos +=
          //   (squareSize.height / 2) * i - squareSize.height - halfmargin * i

          return (
            <SquareWrapper
              square_width={squareSize.width}
              square_height={squareSize.height}
              square_depth={squareSize.depth}
              position={[
                i % 2 === 0
                  ? (squareSize.width + margin) / -2
                  : (squareSize.width + margin) / 2,
                offset - yPos[i % rows],
                0,
              ]}
              start={calcStart(yPos[i % rows])}
              client={client}
              backgroundColor={backgroundColor}
            />
          )
        })}

        {/* <Plane args={[10, 1]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial color={'red'}></meshStandardMaterial>
        </Plane>
        <Plane args={[10, 1]} position={[0, -height, 0]} receiveShadow>
          <meshStandardMaterial color={'blue'}></meshStandardMaterial>
        </Plane> */}
      </group>
    </>
  )
}

const rsqw = (t: number, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

function ClientsScene({
  backgroundColor,
}: {
  backgroundColor: any
}): JSX.Element {
  return <ClientsCanvas backgroundColor={backgroundColor} />
}

export default ClientsScene
