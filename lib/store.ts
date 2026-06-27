import { create } from "zustand";

type Filter = "all" | "unread";

interface FeedUIState {
  filter: Filter;
  setFilter: (f: Filter) => void;
}

export const useFeedStore = create<FeedUIState>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));