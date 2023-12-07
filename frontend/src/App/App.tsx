import React, { useEffect } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, KeyboardEventTypes, SceneLoader, StandardMaterial, Color3 } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';
import "./App.css";

const saveScore = (name: string, points: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": name,
    "points": points
  });


  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  

  fetch("http://localhost:3000/scores", requestOptions) // Assurez-vous de spécifier le protocole http://
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};


function App() {
  let score = 0;
  let sphere: Mesh;
  let camera: FreeCamera;
  let cubes: Mesh[] = [];

  const onSceneReady = (scene: Scene) => {
    camera = new FreeCamera("camera1", new Vector3(0, 0, -20), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    sphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.5 }, scene);
    sphere.position.y = -3;
    sphere.position.z = -7;

    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    // Créer des cubes jaunes, verts et bleus
    createFallingCubes(scene);

    // Activer la prise en charge des événements clavier
    scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          handleKeyDown(kbInfo.event.key);
          break;
      }
    });
  };

  const createFallingCubes = (scene: Scene) => {
    const colors = ["yellow", "green", "blue", "red", "purple", "orange"];
    const end = 5;
    for (let i = 0; i < end; i++) {
      const cube = MeshBuilder.CreateBox(`cube${i}`, { size: 1 }, scene);
      cube.position.y = 10; // Position initiale en haut de la scène
      cube.position.x = Math.random() * 10; // Position aléatoire sur l'axe X
      cube.position.z = -7; // Position aléatoire sur l'axe Z
      cube.material = new StandardMaterial(`mat${i}`, scene);
      if (i === 1 && cube.material instanceof StandardMaterial) {
        cube.material.diffuseColor = new Color3(1, 1, 0);
      }


      // ...

      const createFallingCubes = (scene: Scene) => {
        const colors = ["yellow", "green", "blue"];

        for (let i = 0; i < colors.length; i++) {
          const cube = MeshBuilder.CreateBox(`cube${i}`, { size: 1 }, scene);
          cube.position.y = 10; // Position initiale en haut de la scène
          cube.position.x = Math.random() * 6 - 3; // Position aléatoire sur l'axe X
          cube.position.z = -7
          cube.material = new StandardMaterial(`mat${i}`, scene);
          (cube.material as StandardMaterial).diffuseColor = Color3.FromHexString(colors[i]);
          cubes.push(cube);
        }
      };


      cubes.push(cube);
    }
  };

  const handleKeyDown = (key: string) => {
    const speed = 0.2;
    switch (key) {
      case "ArrowLeft":
        sphere.position.x -= speed;
        break;
      case "ArrowRight":
        sphere.position.x += speed;
        break;
      default:
        break;
    }
  };

  const onRender = (scene: Scene) => {
    if (sphere !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      const rpm = 10;
      sphere.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  
      // Ajouter une variable pour vérifier si le jeu est en cours
      let gameRunning = true;
  
      // Faire tomber les cubes
      cubes.forEach(cube => {
        cube.position.y -= 0.05; // Ajuste la vitesse de chute ici
  
        // Vérifier la collision avec la sphère
        if (
          gameRunning &&
          cube.position.y < sphere.position.y + 0.5 && // Assurez-vous que le cube est en dessous de la sphère
          cube.position.y > sphere.position.y - 0.5 &&
          cube.position.x < sphere.position.x + 0.5 &&
          cube.position.x > sphere.position.x - 0.5
        ) {
          if (
            cube.material instanceof StandardMaterial &&
            !cube.material.diffuseColor.equals(new Color3(1, 1, 0)) // Vérifiez si le cube n'est pas jaune
          ) {
            // Si la sphère touche un cube qui n'est pas jaune, arrêter le jeu
            gameRunning = false;
            // Réinitialiser la position du cube
            cube.position.y = 10;
            cube.position.x = Math.random() * 6 - 3;
            console.log("Game Over"); // Ajouter une action de fin de jeu si nécessaire
            console.log("Score: ", score); // Ajouter une action de fin de jeu si nécessaire
            saveScore("BonGrosMatou", score);

          } else if (
            cube.material instanceof StandardMaterial &&
            cube.material.diffuseColor.equals(new Color3(1, 1, 0)) // Vérifiez si le cube est jaune
          ) {
            // Collision avec un cube jaune, incrémentez le score
            score++;
  
            // Réinitialiser la position du cube
            cube.position.y = 10;
            cube.position.x = Math.random() * 6 - 3;
          }
        }
  
        // Réinitialiser la position si le cube atteint le bas
        if (cube.position.y < -5) {
          cube.position.y = 10;
          cube.position.x = Math.random() * 6 - 3;
        }
      });
    }
  };

  useEffect(() => {
    // Nettoyer les observateurs lors du démontage du composant
    return () => {
      if (sphere && camera) {
        sphere.dispose();
        camera.dispose();
        cubes.forEach(cube => cube.dispose());
      }
    };
  }, []);

  return (
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas"
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.91}
    />
  );
}

export default App;
