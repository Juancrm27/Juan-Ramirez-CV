import './style.css'
import * as THREE from 'three'
import { time } from 'three/tsl'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()


//Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) =>
{
cursor.x = event.clientX / sizes.width - 0.5
cursor.y = - (event.clientY / sizes.height - 0.5)

})



//Canvas
const canvas = document.querySelector('canvas')

//Scene
const scene = new THREE.Scene()



/**
 * Object
 */


const geometry = new THREE.BufferGeometry()
const count = 666
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: '#00FF41', wireframe: true })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const parameters = {
  count: 666
}

gui.add(parameters, 'count')
  .min(10)
  .max(5000)
  .step(1)
  .name('complex')
  .onChange(() => {
  const newPositionsArray = new Float32Array(parameters.count * 3 * 3);
  for(let i = 0; i < parameters.count * 3 * 3; i++) {
    newPositionsArray[i] = (Math.random() - 0.5) * 4;
  }

  // Reemplazar completamente la geometría
  const newGeometry = new THREE.BufferGeometry();
  newGeometry.setAttribute('position', new THREE.BufferAttribute(newPositionsArray, 3));

  mesh.geometry.dispose(); // Limpia la geometría anterior
  mesh.geometry = newGeometry;
});






//Sizes Screen
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        console.log('go fullscreen')
    }
    else
    {
        console.log('leave fullscreen')
    }
})

//Camera
const  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
        canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*
// GSAP
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })
*/

// Clock

const clock = new THREE.Clock()

// Animations clock
const tick = () =>
{
    /*
    //Update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)
    */
    
    // Update controls
    controls.update()

    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime * Math.PI * 0.1 
    
    
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick ()










