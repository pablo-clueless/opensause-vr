import { createReportableStore } from "../middleware";

interface ControlStore {
  selected: string | null;
  onSelect: (selected: string) => void;
  keysPressed: Set<string>;
  addKeyPressed: (key: string) => void;
  removeKeyPressed: (key: string) => void;
}

const initialState: ControlStore = {
  selected: null,
  onSelect: () => {},
  keysPressed: new Set<string>(),
  addKeyPressed: () => {},
  removeKeyPressed: () => {},
};

export const useControlStore = createReportableStore<ControlStore>((set) => ({
  ...initialState,
  onSelect: (selected) => set({ selected }),
  keysPressed: new Set<string>(),
  addKeyPressed: (key) =>
    set((state) => {
      const newSet = new Set(state.keysPressed);
      newSet.add(key.toLowerCase());
      return { keysPressed: newSet };
    }),
  removeKeyPressed: (key) =>
    set((state) => {
      const newSet = new Set(state.keysPressed);
      newSet.delete(key.toLowerCase());
      return { keysPressed: newSet };
    }),
}));
