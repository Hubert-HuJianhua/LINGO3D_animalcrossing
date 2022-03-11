import { World, Cube, Model, OrbitCamera, useLoop, Skybox } from "lingo3d-react"
import { useState, useRef } from "react"

function App() {
  let [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  let [walking, setWalking] = useState(false)
  let modelRef = useRef()

  let handleClick = (ev) => {
    ev.point.y = 0
    setPosition(ev.point)
    setWalking(true)

    let model = modelRef.current
    model.lookAt(ev.point)
  }

  let handleIntersect = () => {
    setWalking(false)
  }

  useLoop(() => {
    let model = modelRef.current
    model.moveForward(-1)

  }, walking)

  return (
    <World>
      <Skybox texture="sky.webp" />
      <Cube width={9999} depth={9999} y={-100} onClick={handleClick}  />
      <Model
       ref={modelRef}
       src="Fox.fbx"
       animations={{ idle: "Idle.fbx", walking: "Walking.fbx" }}
       animation={walking ? "walking" : "idle"}
       intersectIDs={["orangeBox"]}
       onIntersect={handleIntersect}
      />
      <OrbitCamera active z={300} />
      <Cube id="orangeBox" scale={0.5} color="orange" x={position.x} y={position.y} z={position.z} visible={false} />
    </World>
  )
}

export default App
