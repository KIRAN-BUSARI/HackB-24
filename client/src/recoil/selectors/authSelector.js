import { selector } from "recoil";
import { isLoggedInAtom, rolesAtom } from "./atom";

export const rolesSelector = selector({
    key: "rolesSelector",
    get: ({ get }) => get(rolesAtom),
});

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({ get }) => get(isLoggedInAtom)
})