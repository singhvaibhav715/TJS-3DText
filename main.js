import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let donutObj=[]

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls( camera, renderer.domElement );

// const geometry = new THREE.BoxBufferGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// const cube = new THREE.Mesh(geometry, material);
// cube.position.x = (Math.random());
// cube.position.y = (Math.random());
// cube.position.x = (Math.random());
// scene.add(cube);

camera.position.z = 5;


// For Resizing the Window
function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//Create a group for all objects and to ratate simultaniously
const group =new THREE.Group()
scene.add(group)
//Lets Create a Texture Loader
const textureLoader = new THREE.TextureLoader()
const matcapTexture= textureLoader.load('/Images/matCaps/matCap1.png')
const matcapTexture2= textureLoader.load('/Images/matCaps/matCap3.png')

//Lets Create a Font Loader

const fontLoader=new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', 
(font)=>{

  const props={
    font:font,
    size:0.5,
    height:0.2,
    curveSegment:6,
    bevelThickness:0.03,
    bevelSize:0.02,
    bevelOffset:0,
    bevelSegments:4
  }
  const textGeometry0= new TextGeometry(
    "I'm",
    props
  )
  const textGeometry1= new TextGeometry(
    'Vaibhav Singh ,',
    props
  )

  const textGeometry2= new TextGeometry(
    'An Engineer ,',
    props
  )
  const textGeometry3= new TextGeometry(
    'Developer and',
    props
  )
  const textGeometry4= new TextGeometry(
    'Designer',
    props
  )
  
  const textMaterial=new THREE.MeshMatcapMaterial()
  textMaterial.matcap=matcapTexture
  const text0=new THREE.Mesh(textGeometry0,textMaterial)
  const text1=new THREE.Mesh(textGeometry1,textMaterial)
  const text2=new THREE.Mesh(textGeometry2,textMaterial)
  const text3=new THREE.Mesh(textGeometry3,textMaterial)
  const text4=new THREE.Mesh(textGeometry4,textMaterial)
  textGeometry0.center()
  textGeometry1.center()
  textGeometry2.center()
  textGeometry3.center()
  textGeometry4.center()
  text0.position.y=(text0.position.y)+1.8
  text1.position.y=(text1.position.y)+1.2
  // text2.position.y=(text2.position.y)+0.6
  text3.position.y=(text3.position.y)-0.6
  text4.position.y=(text4.position.y)-1.2
  scene.add(text0)
  scene.add(text1)
  scene.add(text2)
  scene.add(text3)
  scene.add(text4)


  const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
  const dounutMaterial = new THREE.MeshMatcapMaterial()
  dounutMaterial.matcap=matcapTexture2

  
  for(let i=0;i<100;i++){
    const donut =new THREE.Mesh(donutGeometry,dounutMaterial)

    donut.position.x=(Math.random()-0.5)*10
    donut.position.y=(Math.random()-0.5)*10
    donut.position.z=(Math.random()-0.5)*10

    donut.rotation.x=Math.random()*Math.PI
    donut.rotation.y=Math.random()*Math.PI

    const scale = Math.random()
    donut.scale.set(scale,scale,scale)

    donutObj.push(donut)
    scene.add(donut)
    group.add(donut)
  }

})

//For Animation Objects
function animate() {
  requestAnimationFrame(animate);
  onWindowResize()
  group.rotation.x+=0.001;
  group.rotation.y+=0.001;
  // donutObj.forEach(donut=>{
  //   donut.rotation.x+=0.01
  //   donut.rotation.y+=0.01
  // })
  renderer.render(scene, camera);
}

animate()