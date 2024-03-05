import Badge from '@/components/badge.component-cloth'
import { Debug, Physics, Triplet, useBox } from '@react-three/cannon'
import {
  Plane,
  Scroll,
  ScrollControls,
  SoftShadows,
  Html,
  useScroll,
  OrbitControls,
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Mesh, NoToneMapping } from 'three'
import ClientsScene from './clients.component'
import Hi from './hi.component'

function Backdrop({}) {
  return (
    <Plane args={[100, 100]} position={[0, 0, -20]} receiveShadow>
      <shadowMaterial
        attach="material"
        color="black"
        transparent
        opacity={0.5}
      />
      {/* <meshStandardMaterial
        color={'red'}
        transparent={false}
        opacity={0.2}
      ></meshStandardMaterial> */}
      {/* <meshStandardMaterial color={'red'} transparent={false} opacity={0.2}> */}
      {/* <canvasTexture
          //ref={textureRef} // <- if you're animating the canvas, you'll need to set needsUpdate to true
          attach="map"
          image={textureRef.current}
        /> */}
      {/* </meshStandardMaterial> */}
    </Plane>
  )
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

function MousePointer({
  children,
  size,
}: PropsWithChildren<{ size: number }>): JSX.Element {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const position: Triplet = [100, 100, 0]
  const args: Triplet = [size, size, 40]

  let hasMoved = false
  // const [hasMoved, setHasMoved] = useState();
  // useEffect(() => {
  //   // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
  //   const timeoutId = setTimeout(() => {
  //     setBadgePosition([5, 4, 10])
  //   }, 1500)

  //   // Cleanup function to clear the timeout if the component unmounts
  //   return () => clearTimeout(timeoutId)
  // }, []) // Empty dependency array ensures the effect runs only once

  const [ref, api] = useBox(
    () => ({ args, position, mass: 10, type: 'Static' }),
    useRef<Mesh>(null)
  )

  useFrame(({ mouse: { x, y } }) => {
    if (!isTouchDevice()) {
      if (x != 0) {
        hasMoved = true
      }
      if (hasMoved) {
        const ypos = (y * height) / 2
        api.position.set((x * width) / 2, ypos - height * data.offset, -1)
      }
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial transparent={true} opacity={0} />
    </mesh>
  )
}

function ContactView() {
  const { width, height } = useThree((state) => state.viewport)

  return (
    <Html
      receiveShadow
      as="div" // Wrapping element (default: 'div')
      //  // The className of the wrapping element (default: undefined)
      prepend={false} // Project content behind the canvas (default: false)
      center={true} // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
      fullscreen={false} // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
      distanceFactor={0} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
      zIndexRange={[1, 1]} // Z-order range (default=[16777271, 0])
      // portal={domnodeRef} // Reference to target container (default=undefined)
      transform={true} // If true, applies matrix3d transformations (default=false)
      sprite={true} // Renders as sprite, but only in transform mode (default=false)
      // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
      // occlude={[ref]} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
      occlude="blending"
      // occlude={false}
      scale={1}
      position={[0, -height, 0.1]}
      // onOcclude={(visible) => null} // Callback when the visibility changes (default: undefined)
      // {...groupProps} // All THREE.Group props are valid
      // {...divProps} // All HTMLDivElement props are valid
      wrapperClass="container"
      // style={{ border: '10px solid black' }}
    >
      <div className="row">
        <div className="cell">
          <div className={'contactinner'}>
            <h2 style={{ width: '70%' }}>
              <a href={'http://www.twitter.com/jesperkc'} target="_blank">
                Twitter
              </a>
              <br />
              <a href={'https://www.linkedin.com/in/jesperkc/'} target="_blank">
                LinkedIn
              </a>
              <br />

              <a href={'mailto:jesper@strangeklitgaard.dk'}>Email</a>
            </h2>
          </div>
        </div>
      </div>
    </Html>
  )
}

function ThreeDeeScene(): JSX.Element {
  const ref = useRef(null)
  const textureRef = useRef()

  const shadowConfig = {
    mapSize: {
      height: 1024,
      width: 1024,
      x: 0,
      y: 0,
    },
    camera: {
      far: 50,
    },
    bias: -0.05,
  }
  const softshadowconfig = {
    size: 15, //{ value: 25, min: 0, max: 100 },
    focus: 2, //{ value: 0, min: 0, max: 2 },
    samples: 5, //{ value: 10, min: 1, max: 20, step: 1 },
  }

  const backgroundColor = '#222222'

  const badgeDelay = 1000

  // useEffect(() => {
  //   // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
  //   const timeoutId = setTimeout(() => {
  //     setBadgePosition([5, 4, 10])
  //   }, 1500)

  //   // Cleanup function to clear the timeout if the component unmounts
  //   return () => clearTimeout(timeoutId)
  // }, []) // Empty dependency array ensures the effect runs only once

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
        // backgroundColor: backgroundColor, //'#222222', //'#28504e',
      }}
    >
      <Canvas
        // shadows
        shadows={{
          enabled: true,
          //type: BasicShadowMap
        }}
        // style={{ pointerEvents: 'none' }}
        // eventSource={ref}
        eventPrefix="offset"
        camera={{ fov: 10, position: [0, 6, 100] }}
        // onCreated={(state) => state.gl.setClearColor('red')}
        gl={{
          antialias: true,
          // toneMapping: NoToneMapping,
          // todo: stop using legacy lights
          // useLegacyLights: true,
          alpha: true,
          // autoClear: true,
          // autoClearColor: true,
          // shadowMapEnabled: true,
        }}
        id="threeCanvas"
        // shadow={shadowConfig}
      >
        <SoftShadows {...softshadowconfig} />
        {/* <OrbitControls /> */}
        {/* <color attach="background" args={['#171720']} /> */}
        <ScrollControls damping={0.1} pages={2}>
          <Scroll html>
            <div className="container introcontainer">
              <div className="row">
                <div className="cell">
                  <div className={'introinner'}>
                    <h1 className={'huge'}>
                      <Hi />
                    </h1>
                    <br />
                    <p style={{ width: '100%' }}>
                      I'm Jesper, a frontend developer who is dedicated to
                      creating websites that are accessible and engaging. I have
                      a strong passion for coding and design, and I'm committed
                      to improving the user experience and visual appeal of the
                      web.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="cell">
                  <div className={'contactinner'}>
                    <p>
                      <a href={'mailto:jesper@strangeklitgaard.dk'}>Email</a>
                      <br />
                      <a
                        href={'http://www.twitter.com/jesperkc'}
                        target="_blank"
                      >
                        Twitter
                      </a>
                      <br />
                      <a
                        href={'https://www.linkedin.com/in/jesperkc/'}
                        target="_blank"
                      >
                        LinkedIn
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Scroll>

          <Scroll>
            <Physics allowSleep={false} gravity={[0, -9.8 * 2, 0]}>
              {/* <Debug color="white" scale={1.01}> */}
              <MousePointer size={0.5}></MousePointer>
              {/* <Extrusion /> */}
              <Badge delay={badgeDelay}></Badge>
              {/* </Debug> */}
            </Physics>
            {/* <ContactView /> */}

            {/* <ClientsScene backgroundColor={backgroundColor} /> */}
          </Scroll>

          <Backdrop />

          <ambientLight intensity={0.2} />

          <directionalLight
            intensity={2}
            position={[-4, 1, 16]}
            shadow-radius={0}
            shadow-mapSize={1024}
            shadow-bias={-0.05}
            castShadow
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-20, 20, -20, 20, 0.1, 100]}
            />
          </directionalLight>
        </ScrollControls>

        {/* <AboutText />
        {textureRef && textureRef.current && <Backdrop />} */}
      </Canvas>
    </div>
  )
}

export default ThreeDeeScene
