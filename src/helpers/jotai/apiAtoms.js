import { atom } from "jotai";

export const bannerListAtom = atom([])

export const unitListAtom = atom([])

export const categoryListAtom = atom([])

export const productListAtom = atom([])

export const storeListAtom = atom([])

export const roleListAtom = atom([])

export const orderListAtom = atom([]);

export const orderListPaginateAtom = atom({
    page: 0,
    limit: 10,
    page_count: 0,
    total_count: 0,
    status: 'ALL',
    search: null
});

export const employeeListAtom = atom([])

export const settingListAtom = atom([])

export const exchangeListAtom = atom([])

export const exclusiveOfferListAtom = atom([])

export const bestSellingListAtom = atom([])

export const mostPopularListAtom = atom([])

export const usersListAtom = atom([])

export const userDataByIdAtom = atom({})

export const userPaymentDataAtom = atom({})

export const userTransactionsAtom = atom({})

export const userIdsAtom = atom({})

export const allInactiveIdsAtom = atom({})

export const searchListAtom = atom([])

