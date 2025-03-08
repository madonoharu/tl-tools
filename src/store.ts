import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import { SkillEffectBuff, StudentState } from "basim";

export interface Collection {
  id: string;
  students: Record<number, StudentState | undefined>;
}

export interface CompEditorState {
  st1?: number;
  st2?: number;
  st3?: number;
  st4?: number;
  sp1?: number;
  sp2?: number;
  buffs: SkillEffectBuff[];
}

export interface Timeline {
  items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  frameCount: number;
}

export const compEditorStateAtom = atom<CompEditorState>({ buffs: [] });

export const timelineStateAtom = atom<Timeline>({
  items: [],
} as Timeline);

export const collectionListAtom = atom<Collection[]>([
  { id: nanoid(), students: {} },
]);

export const collectionAtomsAtom = splitAtom(
  collectionListAtom,
  (state) => state.id
);
