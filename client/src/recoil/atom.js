import { atom } from "recoil";

// export const auth = atom({
//     key: "auth",
//     default: {
//         isLoggedIn: false,
//         role: null
//     }
// })

export const isLoggedIn = atom({
    key: "isLoggedIn",
    default: {
        isLoggedIn: false
    }
})

export const rolesAtom = atom({
    key: "roleAtom",
    default: {
        role: null
    }
})