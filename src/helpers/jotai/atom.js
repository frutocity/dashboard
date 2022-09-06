import { atom } from "jotai";

export const detailsAtom = atom([{
    title: "",
    description: ""
}])


export const detailsCountAtom = atom(1);

// modals
export const bannerModalAtom = atom(false)
export const unitModalAtom = atom(false)
export const exchangeModalAtom = atom(false)
export const settingModalAtom = atom(false)
export const storeModalAtom = atom(false)
export const employeeModalAtom = atom(false)
export const roleModalAtom = atom(false)
export const productModalAtom = atom(false)
export const categoryModalAtom = atom(false)
export const userModalAtom = atom(false)

// edit purpose

export const BannerDataAtom = atom({})

export const UnitDataAtom = atom({})

export const exchangeDataAtom = atom({})

export const storeDataAtom = atom({})

export const employeeDataAtom = atom({})

export const roleDataAtom = atom({})

export const productDataAtom = atom({})

export const categoryDataAtom = atom({})

export const userDataAtom = atom({})


