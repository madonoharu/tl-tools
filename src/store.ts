import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import type { CompState } from "@/simulator";

export interface Timeline {
  items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  frameCount: number;
}

export const compStateAtom = atom<CompState>({});

export const timelineStateAtom = atomWithImmer<Timeline>({
  items: [],
} as Timeline);
