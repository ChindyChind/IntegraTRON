import {create} from "zustand";
import {Scene} from "@babylonjs/core/scene";

export const useGlobalStore = create<{
    isOpenNftModal: boolean,
    selectedCoordinate: any,
    gameScene: Scene | null,
    housesCount: number,
    nfts: {image: string, token_id: string, name: string}[],
    setIsOpenNftModal: (isOpen: boolean) => void,
    setSelectedCoordinate: (x: any) => void,
    setGameScene: (scene: any) => void,
    setHousesCount: (couunt: any) => void,
    setNfts: (nfts: any) => void,
}>((set) => ({
    isOpenNftModal: false,
    gameScene: null,
    selectedCoordinate: null,
    housesCount: 0,
    nfts: [],
    setNfts: (nfts) => {
        set({nfts: nfts})
    },
    setGameScene: (scene) => {
        set({gameScene: scene})
    },
    setHousesCount: (couunt) => {
        set({housesCount: couunt})
    },
    setSelectedCoordinate: (x) => {
        set({selectedCoordinate: x})
    },
    setIsOpenNftModal: (isOpen) => {
        set({isOpenNftModal: isOpen})
    },
}))