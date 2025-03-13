import { create } from 'zustand'

const useStore = create<{contractAddresses:`0x${string}`} & {
  insertNewContract: (newContractAddress:`0x${string}`) => void,
  removeAllBears: () => void,
  updateContracts: (addresses:`0x${string}`[] ) => void,
}>((set) => ({
  contractAddresses: [],
  insertNewContract: (newContractAddress) => set((state) => ({ contractAddresses: [...state.contractAddresses, newContractAddress] })),
  removeAllBears: () => set({ contractAddresses: [] }),
  updateContracts: (addresses) => set({ contractAddresses: addresses }),
}))