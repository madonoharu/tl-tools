import { useAtom } from "jotai";

import { collectionAtomsAtom } from "@/store";
import { useImmerAtom } from "jotai-immer";

export function useCollection() {
  const [collectionAtoms, _dispatch] = useAtom(collectionAtomsAtom);
  const collectionAtom = collectionAtoms[0];
  return useImmerAtom(collectionAtom);
}
