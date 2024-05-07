//@ts-nocheck
import type {Engine} from "@babylonjs/core/Engines/engine";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Scene} from "@babylonjs/core/scene";
import {
    Animatable,
    Color3,
    DeviceSourceManager,
    DeviceType,
    DynamicTexture,
    Mesh,
    MeshBuilder,
    SceneLoader,
    ShadowGenerator,
    StandardMaterial,
    Texture,
    Tools,
    TransformNode
} from "@babylonjs/core";
import {clamp, firstPersonCamera, lerp, lerp3, thirdPersonCamera} from "../../babylon/lib/utils";
import {BaseScene} from "../../babylon/lib/base-scene.ts";
import {useGlobalStore} from "../../store/useGlobalStore";
import {PROXY} from "../../utils/contants.ts";

export class HomeScene extends BaseScene {
    coordinatesWithInteraction = []

    startRenderLoop = ({engine, scene, setIsShowInfoModal, isShowInfoModal, coordinates}: {
        engine: Engine,
        isShowInfoModal?: any,
        coordinates: any,
        scene: Scene,
        setIsShowInfoModal: (_?: any) => void
    }) => {
        engine.runRenderLoop(() => {
            if (scene && scene.activeCamera) scene.render();
            this.existCollision = false;
            for (let i = 0; i < coordinates.length; i++) {
                if (this.main.position._x >= coordinates[i].x_min && this.main.position._x <= coordinates[i].x_max) {
                    if (this.nfts && this.main.position._z >= coordinates[i].z_min && this.main.position._z <= coordinates[i].z_max) {
                        if (!isShowInfoModal)
                            setIsShowInfoModal(true)
                        this.existCollision = true;
                        this.collisionWith = {
                            ...((this.nfts && this.nfts[i]) ? {...this.nfts[i]} : {}),
                            ...coordinates[i],
                        };
                        break;
                    } else {
                        this.existCollision = false
                        setIsShowInfoModal(false)
                    }
                } else {
                    this.existCollision = false
                    setIsShowInfoModal(false)
                }
            }
        });
    };

    createEnv = (scene: Scene) => {
        const helper = scene.createDefaultEnvironment({
            enableGroundShadow: true,
            enableGroundMirror: true,
            groundMirrorFallOffDistance: 0,
            groundSize: 3000,
            skyboxSize: 3000,
        });
        helper!.setMainColor(scene.fogColor);
        helper!.groundMaterial!.diffuseTexture = null;
        helper!.groundMaterial!.alpha = 1;
        helper!.groundMaterial!.fogEnabled = true;
        helper!.ground!.checkCollisions = true;
        helper!.skybox!.checkCollisions = true;
        return helper
    }

    addShadows = (mesh: Mesh) => {
        mesh.receiveShadows = true;
        this.shadowGenerator.addShadowCaster(mesh);
    };

    addToMirror = (mesh: Mesh) => {
        this.helper.groundMirrorRenderList.push(mesh);
    };

    registerBeforeRender = (engine: Engine) => {
        this.firstPerson = localStorage.getItem('first-person') === 'true'
        const dsm = new DeviceSourceManager(engine);
        this.deltaTime = engine.getDeltaTime();
        this.target.rotation = lerp3(
            this.target.rotation,
            new Vector3(
                Tools.ToRadians(this.mouseY),
                Tools.ToRadians(this.mouseX),
                0
            ),
            this.cameraSpeed * this.deltaTime
        );

        if (this.character != null) {
            const keyboard = dsm.getDeviceSource(DeviceType.Keyboard);
            if (keyboard) {
                if (this.firstPerson == true) {
                    this.firstPersonMovement(
                        keyboard.getInput(87), //W
                        keyboard.getInput(83), //S
                        keyboard.getInput(65), //A
                        keyboard.getInput(68), //D
                        keyboard.getInput(16), //Shift
                    );
                } else {
                    this.thirdPersonMovement(
                        keyboard.getInput(87), //W
                        keyboard.getInput(83), //S
                        keyboard.getInput(65), //A
                        keyboard.getInput(68), //D
                        keyboard.getInput(16), //Shift
                    );
                }
            }
        }
    }

    importAvatar = ({scene, smallLight}: { scene: Scene, smallLight: any }) => {
        SceneLoader.ImportMesh(
            "",
            "",
            '../models/ybot.babylon',
            scene,
            (newMeshes, _, skeletons) => {
                this.skeleton = skeletons[0];
                const body = newMeshes[1];
                const joints = newMeshes[0];
                body.scaling = new Vector3(0.01, 0.01, 0.01);
                body.rotation.y = Tools.ToRadians(180);
                joints.parent = body;
                body.parent = this.character;
                body.material = new StandardMaterial("character", scene);
                joints.material = new StandardMaterial("joints", scene);
                // @ts-ignore
                body.material.diffuseColor = new Color3(0.81, 0.24, 0.24);
                // @ts-ignore
                joints.material.emissiveColor = new Color3(0.19, 0.29, 0.44);
                this.addToMirror(this.character);
                this.addShadows(this.character);

                const idleRange = this.skeleton.getAnimationRange("None_Idle");
                const walkRange = this.skeleton.getAnimationRange("None_Walk");
                const runRange = this.skeleton.getAnimationRange("None_Run");
                const sprintRange = this.skeleton.getAnimationRange("None_Sprint");

                this.idleAnim = scene.beginWeightedAnimation(
                    this.skeleton,
                    idleRange.from + 1,
                    idleRange.to,
                    1.0,
                    true
                );
                this.walkAnim = scene.beginWeightedAnimation(
                    this.skeleton,
                    walkRange.from + 1,
                    walkRange.to,
                    0,
                    true
                );
                this.runAnim = scene.beginWeightedAnimation(
                    this.skeleton,
                    runRange.from + 1,
                    runRange.to,
                    0,
                    true
                );
                this.sprintAnim = scene.beginWeightedAnimation(
                    this.skeleton,
                    sprintRange.from + 1,
                    sprintRange.to,
                    0,
                    true
                );

                this.main.ellipsoid = new Vector3(0.5, 0.9, 0.5);
                this.main.ellipsoidOffset = new Vector3(0, this.main.ellipsoid.y, 0);
                this.main.checkCollisions = true;

                smallLight.parent = this.main;
                this.character.parent = this.main;
                this.target.parent = this.main;

                if (this.firstPerson == true) {
                    this.camera.parent = this.character;
                    this.switchCamera(firstPersonCamera.middle);
                } else {
                    this.camera.parent = this.target;
                    this.switchCamera(thirdPersonCamera.leftRun);
                }

                this.main.position = new Vector3(6, 0, 6);
            },
            () => {
            }
        );
    }

    setImages = ({nfts, isLoading = false}: {
        nfts: any, isLoading: any
    }) => {
        this.nfts = nfts
        const housesCount = useGlobalStore.getState().housesCount
        let newCoordinates = this.coordinatesWithInteraction

        for (let i = 0; i < newCoordinates.length; i++) {
            const n = nfts.find((item: any) => item.position_index === i)

            if (n) {
                const img = n?.image_url.includes('https://')
                    ? n?.image_url
                    : !n?.image_url.includes('apenft')
                        ? `${PROXY}https://gateway.btfs.io/btfs/` + n?.image_url
                        : ''

                this.createImagePlane(
                    newCoordinates[i].xp,
                    newCoordinates[i].yp,
                    newCoordinates[i].zp,
                    newCoordinates[i].xr,
                    newCoordinates[i].yr,
                    newCoordinates[i].zr,
                    this.scene!,
                    this.shadowGenerator,
                    img,
                    n.position_index,
                    nfts?.length
                )

                this.showDataDescriptionOrLoading(
                    {
                        scene: this.scene!,
                        txt: n?.image_name ?? '',
                        position: new Vector3(
                            newCoordinates[i].xp,
                            newCoordinates[i].yp + 0.6,
                            newCoordinates[i].zp
                        ),
                        rotation: {
                            xr: newCoordinates[i].xr,
                            yr: newCoordinates[i].yr,
                            zr: newCoordinates[i].zr
                        },
                        index: i,
                        isLoading,
                    })
            } else {
                this.createImagePlane(
                    newCoordinates[i].xp,
                    newCoordinates[i].yp,
                    newCoordinates[i].zp,
                    newCoordinates[i].xr,
                    newCoordinates[i].yr,
                    newCoordinates[i].zr,
                    this.scene!,
                    this.shadowGenerator,
                    '../back.jpg',
                    i,
                    nfts?.length
                )
            }
        }
    }

    importRoom = async (scene: Scene) => {
        const housesCount = useGlobalStore.getState().housesCount

        const HOUSES_COORDINATES = [
            {y: 0, x: 0, z: 0},
            {y: 0, x: 35, z: 0},
            {y: 0, x: 70, z: 0},
            {y: 0, x: 105, z: 0},
            {y: 0, x: 140, z: 0},
        ]

        const housesClones: any = []

        SceneLoader.ImportMesh(
            "",
            "../models/",
            "open_gallery.glb",
            scene,
            (newMeshes) => {
                const daeHouse = MeshBuilder.CreateBox("dae-housdedd", {
                    size: 0.1
                });
                for (let i = 0; i < newMeshes?.length; i++) {
                    newMeshes[i].isPickable = true;
                    newMeshes[i].setParent(daeHouse)
                    newMeshes[i].checkCollisions = true;
                }
                daeHouse.scaling = new Vector3(0.015, 0.015, 0.015);
                daeHouse.position.y = 0
                daeHouse.position.x = 0
                daeHouse.position.z = 0
                daeHouse.rotation.y = Math.PI

                if (housesCount !== 0) {


                    for (let i = 1; i < housesCount; i++) {
                        housesClones[i] = daeHouse.clone("daeHouse-" + i)
                        housesClones[i].position.x = HOUSES_COORDINATES[i].x
                        housesClones[i].position.y = HOUSES_COORDINATES[i].y
                        housesClones[i].position.z = HOUSES_COORDINATES[i].z
                        this.engine.hideLoadingUI();
                    }
                } else {
                    this.engine.hideLoadingUI();
                }
            });
    }

    createScene = async ({engine, setIsShowModal, setSelectedObjectName, setIsShowInfoModal, isShowInfoModal, coordinates}: {
        isShowInfoModal?: any,
        engine: Engine,
        setIsShowModal: (_?: any) => void,
        setSelectedObjectName: (_?: any) => void,
        setIsShowInfoModal: (_?: any) => void,
        coordinates: any
    }) => {
        this.coordinatesWithInteraction = coordinates
        this.firstPerson = true
        const scene = new Scene(engine);
        engine.displayLoadingUI();
        scene.collisionsEnabled = true;
        scene.gravity = new Vector3(0, -9.81, 0);
        scene.fogEnabled = true;
        scene.fogMode = Scene.FOGMODE_EXP2;
        scene.fogDensity = 0.001;
        scene.fogColor = new Color3(0.8, 0.9, 1.0);
        // @ts-ignore
        scene.clearColor = scene.fogColor;

        this.camera = this.createCamera(scene);

        // @ts-ignore
        const [hemLight, dirLight, smallLight] = this.createLight(scene);

        this.shadowGenerator = new ShadowGenerator(3072, dirLight);
        this.shadowGenerator.usePercentageCloserFiltering = true;
        this.helper = this.createEnv(scene);

        this.main = new Mesh("parent", scene);
        this.target = new TransformNode("", undefined, undefined);
        this.character = new Mesh("character", scene);

        scene.registerBeforeRender(() => this.registerBeforeRender(engine));
        scene.detachControl();
        this.importAvatar({scene: scene, smallLight: smallLight})
        this.importRoom(scene);

        this.setupPointerLock();

        scene.onPointerDown = (evt) => {
            if (document.pointerLockElement !== this.canvas) {
                this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.msRequestPointerLock || this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock || false;
                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                }
            }

        };

        this.createPostEffects(scene)

        document.onkeydown = (evt: any) => {
            evt = evt || window.event;
            let isPressedE = false;
            if ("key" in evt) {
                isPressedE = (evt.keyCode === 69);
            } else {
                isPressedE = (evt.keyCode === 69);
            }
            if (isPressedE && this.existCollision && (['image-nft']?.includes(this.collisionWith?.name) || this.collisionWith?.name?.includes('building'))) {
                setSelectedObjectName(this.collisionWith)
                useGlobalStore.setState({selectedCoordinate: this.collisionWith.index})
                setIsShowModal((prev: any) => {
                    if (!prev) this.engine.exitPointerlock()
                    return !prev
                })
            }
        };

        document.onkeydown = (evt: any) => {
            evt = evt || window.event;
            let isPressedE = false;
            if ("key" in evt) {
                isPressedE = (evt.keyCode === 69);
            } else {
                isPressedE = (evt.keyCode === 69);
            }
            if (
                isPressedE &&
                this.existCollision &&
                (
                    ['image-nft']?.includes(this.collisionWith?.name) ||
                    this.collisionWith?.name?.includes('building'))
            ) {
                setSelectedObjectName(this.collisionWith)
                useGlobalStore.setState({selectedCoordinate: this.collisionWith.index})
                const isOpenNftModal = useGlobalStore.getState().isOpenNftModal
                const param = window.location.href.split("/").pop();
                if (!isOpenNftModal && window?.tronWeb?.defaultAddress && (window?.tronWeb?.defaultAddress?.base58 === param)) {
                    this.engine.exitPointerlock()
                }
                {
                    (window?.tronWeb?.defaultAddress?.base58 === param) &&
                    useGlobalStore.setState((state) => ({isOpenNftModal: window?.tronWeb?.defaultAddress ? !state.isOpenNftModal : false}))
                }
            }
        };

        this.startRenderLoop({
            engine: this.engine,
            scene: this.scene!,
            setIsShowInfoModal,
            isShowInfoModal: isShowInfoModal,
            coordinates: coordinates
        })
        return scene;
    };

    protected tempCoord = null

    deleteAllPlans = () => {
        this.scene?.meshes?.forEach(async item => item?.name?.includes('plane1') ? await item.dispose() : {})
        this.scene?.materials?.forEach(async item => item?.name?.includes('plane2') ? await item.dispose() : {})
        this.scene?.meshes?.forEach(async item => item?.name?.includes('plane-text') ? await item.dispose() : {})
        this.scene?.meshes?.forEach(async item => item?.name?.includes('mat') ? await item.dispose() : {})
        this.scene?.textures?.forEach(async item => item?.name?.includes('DynamicTexture') ? await item.dispose() : {})
    }

    createImagePlane = async (xp: any, yp: any, zp: any, xr: any, yr: any, zr: any, scene: Scene, shadowGenerator: ShadowGenerator, image = '../back.jpg', index, length) => {
        try {
            const img = new Image();
            img.src = image;
            img.onload = function () {
                const height = img.height;
                const width = img.width;
                const plane = MeshBuilder.CreatePlane("plane1" + index, {
                    height: 3,
                    width: Math.min(3 * width / height, 4)
                }, scene);
                const mat = new StandardMaterial("plane2" + index, scene);
                mat.diffuseTexture = new Texture(image, scene);
                plane.material = mat;
                plane.rotation = new Vector3(xr, yr, zr);
                plane.position.x = xp
                plane.position.y = yp + 2.5
                plane.position.z = zp
            }

            img.onerror = function () {
                const img2 = new Image();
                img2.src = '../back.jpg';
                img2.onload = function () {
                    const height = img.height;
                    const width = img.width;
                    const plane = MeshBuilder.CreatePlane("plane1" + index, {
                        height: 3,
                        width: 3 * width / height
                    }, scene);
                    const mat = new StandardMaterial("plane2" + index, scene);
                    mat.diffuseTexture = new Texture(image, scene);
                    plane.material = mat;
                    plane.rotation = new Vector3(xr, yr, zr);
                    plane.position.x = xp
                    plane.position.y = yp + 2
                    plane.position.z = zp
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    createPlaneText = async (text: string, position: Vector3, rotation: any) => {
        if (text && text !== '') {
            const fontData = await (await fetch("https://assets.babylonjs.com/fonts/Droid Sans_Regular.json")).json();
            if (this.scene?.meshes?.filter(item => item?.name === `myText-${position.x}-${position.y}-${position.z}`)?.length === 1) {
                this.scene?.meshes?.find(item => item?.name === `myText-${position.x}-${position.y}-${position.z}`)!.dispose()
                this.scene?.removeMesh(this.scene.meshes.find(item => item?.name === `myText-${position.x}-${position.y}-${position.z}`)!)
            }

            const myText = MeshBuilder.CreateText(`myText-${position.x}-${position.y}-${position.z}`, text, fontData, {
                size: 0.4,
                resolution: 64,
                depth: 0.03,
            });

            // @ts-ignore
            const material = new StandardMaterial(this.scene!);
            material.alpha = 1;
            material.diffuseColor = new Color3(1, 0.5, 0);
            // @ts-ignore
            myText!.material = material;
            myText!.rotation.y = rotation
            myText!.position.y = position.y + 0.2
            myText!.position.x = position.x
            myText!.position.z = position.z
        }
    }

    showDataDescriptionOrLoading = ({scene, txt, position, rotation, width = 4, fontSize, index, isLoading}: {
        scene: Scene,
        txt: string,
        position: any,
        rotation: any,
        width?: number,
        fontSize?: any,
        index?: any,
        isLoading?: boolean
    }) => {
        if (txt || isLoading) {
            const planeWidth = width;
            const planeHeight = 0.6;
            const plane = MeshBuilder.CreatePlane("plane-text" + index, {
                width: planeWidth,
                height: planeHeight,
            }, scene);
            const DTWidth = planeWidth * 1000;
            const DTHeight = planeHeight * 1000;
            plane.position = position
            plane.rotation.x = rotation.xr
            plane.rotation.y = rotation.yr
            plane.rotation.z = rotation.zr
            const text = isLoading ? 'Loading...' : txt;
            const dynamicTexture = new DynamicTexture("DynamicTexture", {width: DTWidth, height: DTHeight}, scene);
            const ctx = dynamicTexture.getContext();
            const size = 5;
            ctx.font = size + "px Arial";
            const textWidth = ctx.measureText(text.length <= 28 ? `${' '.repeat((28 - text.length) / 2)}${text}${' '.repeat((28 - text.length) / 2)}` : text).width;
            const ratio = textWidth / size;
            const font_size = fontSize ?? Math.floor(DTWidth / (ratio));
            const font = font_size + "px Arial";
            dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);
            const mat = new StandardMaterial("mat", scene);
            mat.diffuseTexture = dynamicTexture;
            plane.material = mat;
        }
    }

    switchCamera = (type: { position: Vector3, fov: number, mouseMin: number, mouseMax: number }) => {
        this.camera.position = type.position.divide(this.camera.parent.scaling);
        this.camera.fov = type.fov;
        (this.mouseMin = type.mouseMin), (this.mouseMax = type.mouseMax);
    }

    firstPersonMovement = (up: number, down: number, left: number, right: number, run: number) => {
        const directionZ = up - down;
        const directionX = right - left;
        let vectorMove = new Vector3(0, 0, 0);
        const direction = Math.atan2(directionX, directionZ);
        let currentState = this.idleAnim;
        if (directionX != 0 || directionZ != 0) {
            if (up == 1) {
                if (run != 1) {
                    currentState = this.walkAnim;
                    this.speed = lerp(this.speed, this.walkSpeed, this.walkAnim.weight);
                } else {
                    currentState = this.runAnim;
                    this.speed = lerp(this.speed, this.runSpeed, this.runAnim.weight);
                }
            }
            vectorMove = new Vector3(
                Math.sin(this.target.rotation.y + direction - Tools.ToRadians(180)),
                0,
                Math.cos(this.target.rotation.y + direction - Tools.ToRadians(180))
            );
        }

        this.character.rotation.y = this.target.rotation.y - Tools.ToRadians(180);
        this.camera.rotation.x = this.target.rotation.x;
        const m = vectorMove.multiply(new Vector3().setAll(this.speed * this.deltaTime));
        this.main.moveWithCollisions(m.add(new Vector3(0, -0.09, 0)));
        this.switchAnimation(currentState);
    }

    thirdPersonMovement(up: number, down: number, left: number, right: number, run: number) {
        const directionZ = up - down;
        const directionX = right - left;

        let vectorMove = new Vector3(0, 0, 0);
        const direction = Math.atan2(directionX, directionZ);

        let currentState = this.idleAnim;

        if (directionX != 0 || directionZ != 0) {
            if (run != 1) {
                currentState = this.runAnim;
                this.speed = lerp(this.speed, this.runSpeed, this.runAnim.weight);
            } else {
                currentState = this.sprintAnim;
                this.speed = lerp(this.speed, this.sprintSpeed, this.sprintAnim.weight);
            }

            const rotation = (this.target.rotation.y + direction) % 360;
            this.character.rotation.y = lerp(this.character.rotation.y, rotation, 0.25);
            vectorMove = new Vector3(
                Math.sin(rotation),
                0,
                Math.cos(rotation)
            );
        } else {
            this.speed = lerp(this.speed, 0, 0.001);
        }

        const m = vectorMove.multiply(new Vector3().setAll(this.speed * this.deltaTime));
        this.main.moveWithCollisions(m.add(new Vector3(0, -0.09, 0)));
        this.switchAnimation(currentState);
    }

    switchAnimation = (anim: Animatable | null) => {
        const animations = [this.idleAnim, this.runAnim, this.walkAnim, this.sprintAnim];
        if (this.idleAnim != undefined) {
            for (var i = 0; i < animations.length; i++) {
                if (animations[i] == anim) {
                    animations[i].weight += this.animationBlend * this.deltaTime;
                } else {
                    animations[i].weight -= this.animationBlend * this.deltaTime;
                }
                animations[i].weight = clamp(animations[i].weight, 0.0, 1.0);
            }
        }
    }

    setupPointerLock = () => {
        const canvas = document.getElementById("renderCanvas");
        document.addEventListener("pointerlockchange", this.changeCallback, false);
        document.addEventListener(
            "mozpointerlockchange",
            this.changeCallback,
            false
        );
        document.addEventListener(
            "webkitpointerlockchange",
            this.changeCallback,
            false
        );

        if (canvas)
            canvas.onclick = () => {
                // @ts-ignore
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                canvas.requestPointerLock();
            };
    }

    changeCallback = () => {
        const canvas = document.getElementById("renderCanvas");
        if (
            // @ts-ignore
            document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas
        )
            document.addEventListener("mousemove", this.mouseMove, false);
        else
            document.removeEventListener("mousemove", this.mouseMove, false);
    }

    mouseMove = (e: any) => {
        const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
        this.mouseX += movementX * this.mouseSensitivity * this.deltaTime;
        this.mouseY += movementY * this.mouseSensitivity * this.deltaTime;
        this.mouseY = clamp(this.mouseY, this.mouseMin, this.mouseMax);
    };
}


