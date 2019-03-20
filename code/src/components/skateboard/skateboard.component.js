import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import anime from 'animejs';
import React from 'react';
import { ReactBasicScroll } from 'react-basic-scroll';
import * as THREE from 'three';
import { OBJLoader } from 'three-obj-mtl-loader';
import DeckBestseller from './deck.bestseller.component';
import DeckKisses from './deck.kisses.component';

class SkateboardComponent extends React.Component {

  constructor() {
    super();



    this.container = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.deck = null;
    this.width = 700;
    this.height = 700;
    this.camera_pivot = null;
    this.Y_AXIS = null;

    this.canvasRotation = 0;
    this.mouseX = 10;
    this.mouseY = 0;
    this.mouseXOnMouseDown = 0;
    this.mouseYOnMouseDown = 0;
    this.targetRotationOnMouseDownX = 0;
    this.targetRotationOnMouseDownY = 0;
    this.defaultRotationY = this.targetRotationY = .01;
    this.defaultRotationX = this.targetRotationX = .005;

    this.animate = this.animate.bind(this);
    this.changeCanvas = this.changeCanvas.bind(this);
    this.shouldUpdateTexture = true;

    this.flipAnimation = this.flipAnimation.bind(this);
    this.flip3Animation = this.flip3Animation.bind(this);
    this.ollieAnimation = this.ollieAnimation.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.scrollChangeOuter = this.scrollChangeOuter.bind(this);
    this.updateDeck = this.updateDeck.bind(this);
    this.spinDeck = this.spinDeck.bind(this);

    this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);

    this.raycaster = new THREE.Raycaster();

    this.textures = [
      '/skateboard-website/_0004_robotron-white.jpg?' + new Date(),
      '/skateboard-website/_0001_Robotron-KissSybilleZach.jpg?' + new Date(),
      '/skateboard-website/_0000_robotron-bestseller.jpg?' + new Date(),
      '/skateboard-website/_0003_robotron-black.jpg?' + new Date(),
    ];

    this.prevActiveDeck = 0;
    this.activeDeck = 0;

    this.decks = [
      {
        c: DeckKisses
      },
      {
        c: DeckBestseller
      },
      {
        c: DeckKisses
      },
      {
        c: DeckBestseller
      }
    ];
  }

  componentDidMount() {


    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.textureOffset = 0;

    this.windowHalfX = this.width / 2;
    this.windowHalfY = this.height / 2;

    this.loadTextures();
    this.init();
    this.animate();

  }

  loadTextures() {
    for (var i = 0; i < this.textures.length; i++) {
      var img = new Image();
      img.src = this.textures[i];
      this.textures[i] = img;
    }
  }
  init() {
    this.container = document.getElementById('skateboard-canvas');

    let canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    // this.scene
    this.scene = new THREE.Scene();



    this.camera_pivot = new THREE.Object3D()
    this.Y_AXIS = new THREE.Vector3(0, 1, 0);

    this.camera = new THREE.PerspectiveCamera(85, this.width / this.height, 1, 2000);




    // this.camera.lookAt(this.scene.position);


    this.scene.add(this.camera_pivot);
    this.camera_pivot.add(this.camera);
    this.camera.position.set(0, 50, 0);
    this.camera.lookAt(this.camera_pivot.position);




    var ambient = new THREE.AmbientLight(0xbbbbbb);
    this.scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffffff, .3);
    directionalLight.position.set(10, 10, 0);
    this.scene.add(directionalLight);

    // texture



    this.texture = new THREE.Texture(canvas);
    var material = new THREE.MeshPhongMaterial({ map: this.texture });

    canvas.width = 2048;
    canvas.height = 2048;

    // model
    var objLoader = new OBJLoader();
    // objLoader.setMaterials(materials)
    objLoader.load('/skateboard-website/fullskateboard.obj?' + new Date(), (object) => {

      object.traverse((child) => {

        if (child instanceof THREE.Mesh) {
          console.log(child.material.map);
          child.material = material;

        }

      });


      var scale = 8;
      object.scale.x = scale;
      object.scale.y = scale;
      object.scale.z = scale;

      object.position.y = 0;

      this.deck = object;

      this.resetDeck();

      this.loadFinished();

      this.scene.add(this.deck);


    });




    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);


    //window.addEventListener('resize', this.onWindowResize, false);
    //document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    //this.renderer.domElement.addEventListener('touchstart', this.onDocumentMouseDown, false);

  }

  onDocumentMouseDown(event) {
    console.log('onDocumentMouseDown', event.type);


    document.addEventListener('touchend', this.removeEventListeners, false);
    document.addEventListener('touchcancel', this.removeEventListeners, false);
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('mouseup', this.removeEventListeners, false);
    document.addEventListener('mouseout', this.removeEventListeners, false);

    if (event.type === "touchstart") {

      this.mouseXOnMouseDown = event.changedTouches[0].clientX - this.windowHalfX;
      this.mouseYOnMouseDown = event.changedTouches[0].clientY - this.windowHalfY;

      var mouse = new THREE.Vector2();

      mouse.x = (event.changedTouches[0].clientX / this.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (event.changedTouches[0].clientY / this.renderer.domElement.clientHeight) * 2 + 1;

      this.raycaster.setFromCamera(mouse, this.camera);

      var intersects = this.raycaster.intersectObjects([this.deck], true);

      if (intersects.length > 0) {
        console.log(intersects[0].object);
        document.addEventListener('touchmove', this.onDocumentMouseMove, { passive: false });
      }


    } else {
      this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
      this.mouseYOnMouseDown = event.clientY - this.windowHalfY;
    }


    this.targetRotationOnMouseDownX = this.targetRotationX;
    this.targetRotationOnMouseDownY = this.targetRotationY;
  }

  onDocumentMouseMove(event) {
    console.log('onDocumentMouseMove', event.type);

    if (event.type === "touchmove") {
      event.preventDefault();
      this.mouseX = event.changedTouches[0].clientX - this.windowHalfX;
      this.mouseY = event.changedTouches[0].clientY - this.windowHalfY;
    } else {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    }

    this.targetRotationX = (this.mouseX - this.mouseXOnMouseDown) * 0.00025;
    this.targetRotationY = (this.mouseY - this.mouseYOnMouseDown) * 0.00025;
  }

  removeEventListeners(event) {
    console.log('removeEventListeners');

    document.removeEventListener('touchmove', this.onDocumentMouseMove, false);
    document.removeEventListener('touchend', this.removeEventListeners, false);
    document.removeEventListener('touchcancel', this.removeEventListeners, false);
    document.removeEventListener('mousemove', this.onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this.removeEventListeners, false);
    document.removeEventListener('mouseout', this.removeEventListeners, false);
  }


  loadFinished() {
    //this.flipAnimation();
  }

  changeCanvas() {
    if (this.shouldUpdateTexture === true || 1 === 1) {
      let hasBase = false;
      for (var i = 0; i < this.decks.length; i++) {
        if (this.decks[i].visiblility >= 100) {

          this.ctx.drawImage(this.decks[i].deck.textureimg, 0, 0, 2048, 2048, 0, 0, 2048, 2048);

          hasBase = true;
        }
      }

      if (hasBase === false) {
        this.ctx.drawImage(this.textures[0], 0, 0, 2048, 2048, 0, 0, 2048, 2048);
      }
      this.ctx.save();
      for (var i = 0; i < this.decks.length; i++) {

        if (this.decks[i].visiblility > 0 && this.decks[i].visiblility < 100) {

          let ttextureBottomOffset = 2048 * (this.decks[i].visiblility / 100);

          const rotMat = new THREE.Matrix4();
          let pivot_rotate = this.camera_pivot.getWorldQuaternion(new THREE.Quaternion(0, 0, 0, 0));
          const rotation = this.camera_pivot.rotation.y;
          const radians = rotation > 0 ? rotation : (2 * Math.PI) + rotation;
          //const degrees = THREE.Math.radToDeg(radians);
          let rotate = pivot_rotate._y;
          //rotate = 45 * Math.PI / 180;
          console.log(this.decks[i].visiblility);


          this.ctx.beginPath();
          this.ctx.moveTo(0, 600);
          this.ctx.lineTo(2048, 600);
          this.ctx.lineTo(2048, 1200);
          this.ctx.lineTo(0, 1200);
          this.ctx.clip();

          const bottomOffset = 1024;

          this.ctx.translate(bottomOffset, 1024);
          this.ctx.rotate(-radians);
          this.ctx.translate(-bottomOffset, -1024);
          this.ctx.beginPath();
          this.ctx.moveTo(0, 2048 - ttextureBottomOffset);
          this.ctx.lineTo(2048, 2048 - ttextureBottomOffset);
          this.ctx.lineTo(2048, 2048);
          this.ctx.lineTo(0, 2048);
          this.ctx.clip();
          this.ctx.translate(bottomOffset, 1024);
          this.ctx.rotate(radians);
          this.ctx.translate(-bottomOffset, -1024);

          let bottom = {
            x: 2048 - ttextureBottomOffset,
            y: 0,
            width: 2048,
            height: 2048,
          }

          this.ctx.drawImage(this.decks[i].deck.textureimg, 0, 0, 2048, 2048, 0, 0, 2048, 2048);
          //this.ctx.drawImage(this.decks[i].deck.textureimg, bottom.x, bottom.y, bottom.width, bottom.height, 2048 - ttextureOffset, 0, 2048, 2048);
          this.ctx.restore();
        }
      }

      this.texture.needsUpdate = true;
      this.shouldUpdateTexture = false;
    }
  }


  loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
      numImages++;
    }
    for (var src in sources) {
      images[src] = new Image();
      images[src].onload = function () {
        if (++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

  flipAnimation() {
    this.resetDeck();
    var obj = this.deck.rotation;
    this.flipanime = anime({
      targets: obj,
      x: Math.PI * 0.5,
      y: 0,
      z: Math.PI * 2,
      easing: 'easeOutCubic',
      duration: 2500,
      delay: 0,
      loop: true,
      autoplay: false,
      update: () => {
        //this.mouseX = obj.mouseX;
        //this.deck.rotation.set(obj.x, obj.y, x.z);
      }
    })
  }

  ollieAnimation() {
    this.resetDeck();

    anime({
      targets: this.deck.rotation,
      x: [
        { value: Math.PI * 0.5, duration: 0 },
        { value: Math.PI * 0.6, duration: 200 },
        { value: Math.PI * 0.5, duration: 500 },
      ],
      y: 0,
      z: 0,
      easing: 'easeOutSine',
      delay: 0,
      update: () => {
        //this.mouseX = obj.mouseX;
        //this.deck.rotation.set(obj.x, obj.y, x.z);
      }
    })
    anime({
      targets: this.deck.position,
      x: 0,
      y: 0,
      z: [
        { value: 0, duration: 0 },
        { value: 10, duration: 200 },
        { value: 0, duration: 200, delay: 500 },
      ],
      easing: 'easeOutSine',
      duration: 500,
      delay: 0,
      update: () => {
        //this.mouseX = obj.mouseX;
        //this.deck.rotation.set(obj.x, obj.y, x.z);
      }
    })

    //setTimeout(this.flipAnimation, 300);
  }

  flip3Animation() {
    this.resetDeck();
    var obj = this.deck.rotation;

    anime({
      targets: obj,
      x: Math.PI * 0.5,
      y: Math.PI * -2,
      z: Math.PI * 2,
      easing: 'easeOutSine',
      duration: 500,
      delay: 0,
      update: () => {
        //this.mouseX = obj.mouseX;
        //this.deck.rotation.set(obj.x, obj.y, x.z);
      }
    })
  }

  resetDeck() {
    //this.deck.rotation.set(Math.PI * 0.5, 0, 0);
    this.deck.position.set(0, 0, 0);
  }


  onWindowResize() {

    this.windowHalfX = this.width / 2;
    this.windowHalfY = this.height / 2;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);

  }



  animate() {

    requestAnimationFrame(this.animate);
    this.renderAnim();
    this.changeCanvas();
    this.slowDownBoard();
  }

  renderAnim() {


    this.renderer.render(this.scene, this.camera);

    let slowingFactor = 0.02;

    if (this.deck && this.camera_pivot) {

      //this.deck.rotation.x += this.targetRotationY;
      this.deck.rotation.x = 1.5;

      //this.renderer.domElement.style.transform = `rotate(${this.canvasRotation}deg)`;
      this.canvasRotation += this.targetRotationX;
      //this.camera.rotation.z = this.canvasRotation;
      this.camera_pivot.rotation.y = this.canvasRotation;
      // this.camera_pivot.rotateOnAxis(this.Y_AXIS, this.targetRotationX * 10);    // radians
      this.deck.rotation.z = 0;
    }
    //this.targetRotationY = this.targetRotationY * (1 - slowingFactor);
    //this.targetRotationX = this.targetRotationX * (1 - slowingFactor);
  }

  rotateAroundWorldAxis(object, axis, radians) {
    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    rotationMatrix.multiply(object.matrix);                       // pre-multiply
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
  }


  scrollChangeOuterInside(percentage, z, y) {
    if (this.deck) {
      //this.deck.position.z = z;
      //this.deck.position.y = y;
    }
    this.scrollChangeOuter(percentage);
  }
  scrollChangeOuter(percentage) {
    this.slowDownBoard();
  }

  slowDownBoard() {
    if (this.targetRotationY > this.defaultRotationY) {
      this.targetRotationY -= .005;
    }
    if (this.targetRotationY < this.defaultRotationY) {
      this.targetRotationY += .005;
    }
    if (this.targetRotationX > this.defaultRotationX) {
      this.targetRotationX -= .005;
    }
    if (this.targetRotationX < this.defaultRotationX) {
      this.targetRotationX += .005;
    }
  }


  updateDeck(i, deck, visiblility) {
    console.log('updateDeck');
    this.shouldUpdateTexture = true;
    this.decks[i].visiblility = visiblility;
    this.decks[i].deck = deck;
  }
  spinDeck() {
    this.targetRotationY = .3;
  }
  render() {


    const outerconfig = {
      from: 'top-top',
      to: 'bottom-middle',
      track: false,
      direct: true,
      inside: (instance, percentage, props) => this.scrollChangeOuterInside(percentage, props['--zpos'], props['--ypos']),
      outside: (instance, percentage, props) => this.scrollChangeOuter(percentage),
      round: 1,
      props: {
        '--zpos': {
          from: 5,
          to: -5
        },
        '--ypos': {
          from: 80,
          to: 0
        }
      }
    };



    return (
      <div>
        <Logo />
        {typeof window !== 'undefined' && ReactBasicScroll && <ReactBasicScroll config={outerconfig}>
          <Hero>
            {/* <div className="bg"></div>
            <div className="bg"></div> */}
          </Hero>
        </ReactBasicScroll>}
        <Wrapper>

          {this.decks.map((deck, i) => <deck.c key={i} spinDeck={this.spinDeck} updateDeck={this.updateDeck.bind(this, i)}></deck.c>)}

          <canvas id="canvas" style={{ display: "block", width: 1024, position: 'fixed', zIndex: 2000, top: 0 }}></canvas>
          <SkateboardCanvas id="skateboard-canvas"></SkateboardCanvas>
        </Wrapper>
      </div>
    )
  }
}

export default SkateboardComponent





const bgAnimation = keyframes`
  0%{
    background-position-x: 0px;
  }
  100%{
    background-position-x: 41vh;
  }
`;

const Hero = styled.div`
  position: relative;
  height: 100vh;

  .bg{
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: url(/skateboard-website/robotron-text-bg.png);
    background-size: 41vh;
    background-position: 0% 1vh;

    animation: ${bgAnimation} 4000ms infinite linear;
  }
  .bg:nth-of-type(2){
    background-position: 0px 11vh;
    animation: ${bgAnimation} 4000ms reverse infinite linear;
  }

  margin-bottom: 6vh;
`;

const Logo = styled.div`
  position: fixed;
  height: 15vh;
  width: 15vh;
  top: 1vh;
  right: 1vh;
  z-index: 80;
  background-image: url(/skateboard-website/robotron-logo.png);
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 200vh;
`;


const Skater = styled.div`
  position: relative;
  height: 200vh;
  background-color: ${props => props.background};

`;


const SkateboardCanvas = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  transform: translate(0%,-50%);

  canvas{
    position: relative;
    z-index: 10;
  }
`;
