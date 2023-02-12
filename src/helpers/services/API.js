import CustomToast from '../toast'
const Repository = require('../api')
const api = new Repository()
const toast = new CustomToast()
import Joi from 'joi'
import JotaiNexus, { readAtom, writeAtom } from "jotai-nexus";
import { allInactiveIdsAtom, bannerListAtom, bestSellingListAtom, categoryListAtom, employeeListAtom, exchangeListAtom, exclusiveOfferListAtom, mostPopularListAtom, orderListAtom, orderListPaginateAtom, productListAtom, roleListAtom, searchListAtom, settingListAtom, storeListAtom, unitListAtom, userDataByIdAtom, userIdsAtom, userPaymentDataAtom, usersListAtom, userTransactionsAtom } from '../jotai/apiAtoms'
import { userDataAtom } from '../jotai/atom'

const { auth, product, store, user, order } = {
    product: "product",
    store: "store",
    auth: "auth",
    user: "user",
    order: "order"
}

export default {
    login: ({ body, params }, cb) => {
        api
            .post('auth/login', body, params)
            .then(d => {
                if (d.status) {
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },


    uploadBanner: (body, cb) => {
        toast.loading("Uploading...")
        api
            .uploadFile("auth/upload-banner", body)
            .then(d => {

                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },










    userList: ({ params }, cb) => {
        api
            .get('/user', params)
            .then(d => {
                if (d.status) {
                    writeAtom(usersListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    bannerList: ({ params }, cb) => {
        api
            .get('auth/list-banners', params)
            .then(d => {
                if (d.status) {
                    writeAtom(bannerListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    deleteBanner: ({ params }, cb) => {
        api
            .get('auth/delete-banner', params)
            .then(d => {
                if (d.status) {

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addBanner: ({ body, params }, cb) => {
        const Schema = Joi.object({
            image: Joi.string().required(),
            active: Joi.boolean().required(),
            type: Joi.string().required(),
            value: Joi.string().required(),
            link: Joi.string().required()
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post('auth/add-banner', body, params)
            .then(d => {
                if (d.status) {

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateBanner: ({ body, params }, cb) => {
        const Schema = Joi.object({
            _id: Joi.string().required(),
            image: Joi.string().required(),
            active: Joi.boolean().required(),
            type: Joi.string().required(),
            value: Joi.string().required(),
            link: Joi.string().required()
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post('auth/update-banner', body, params)
            .then(d => {
                if (d.status) {

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateBannerStatus: ({ params }, cb) => {
        toast.loading("Updating")
        api
            .get('auth/update-banner-status', params)
            .then(d => {
                console.log(d)
                if (d.status) {

                    toast.success(d.message)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    // Exchange APIs

    uploadFile: (body, cb) => {
        toast.loading("Uploading...")
        api
            .uploadFile(product + "/upload-file", body)
            .then(d => {

                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    exchangeList: ({ params }, cb) => {
        api
            .get('exchange-list', params)
            .then(d => {
                if (d.status) {
                    writeAtom(exchangeListAtom, d.data)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    exclusiveOfferList: ({ params }, cb) => {
        api
            .get(product + '/exclusive-offer', params)
            .then(d => {
                if (d.status) {
                    writeAtom(exclusiveOfferListAtom, d.data)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addExclusiveOfferList: ({ params }, cb) => {
        toast.loading("Adding....")
        api
            .get(product + '/add/exclusive-offer', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    removeExclusiveOfferList: ({ params }, cb) => {
        toast.loading("Removing....")
        api
            .get(product + '/remove/exclusive-offer', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },




    bestSellingList: ({ params }, cb) => {
        api
            .get(product + '/best-selling', params)
            .then(d => {
                if (d.status) {
                    writeAtom(bestSellingListAtom, d.data)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addbestSellingList: ({ params }, cb) => {
        toast.loading("Adding....")
        api
            .get(product + '/add/best-selling', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    removebestSellingList: ({ params }, cb) => {
        toast.loading("Removing....")
        api
            .get(product + '/remove/best-selling', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },



    mostPopularList: ({ params }, cb) => {
        api
            .get(product + '/most-popular', params)
            .then(d => {
                if (d.status) {
                    writeAtom(mostPopularListAtom, d.data)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addmostPopularList: ({ params }, cb) => {
        toast.loading("Adding....")
        api
            .get(product + '/add/most-popular', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    removemostPopularList: ({ params }, cb) => {
        toast.loading("Removing....")
        api
            .get(product + '/remove/most-popular', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },











    defaultExchange: ({ params }, cb) => {
        api
            .get('default-exchange', params)
            .then(d => {
                console.log(d)
                if (d.status) {
                    return cb(d)
                } else {
                    // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    exchangeById: ({ params }, cb) => {
        api
            .get(`exchange`, params)
            .then(d => {
                console.log(d)
                if (d.status) {
                    return cb(d)
                } else {
                    // Router.back()
                    // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addExchange: ({ body, params }, cb) => {
        const Schema = Joi.object({
            name: Joi.string().required(),
            photo: Joi.string().required(),
            domain: Joi.string().required()
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post('add-exchange', body, params)
            .then(d => {
                if (d.status) {
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateExchange: ({ body, params }, cb) => {
        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            photo: Joi.string().required(),
            domain: Joi.string().required()
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post('update-exchange', body, params)
            .then(d => {
                if (d.status) {
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    updateExchangeStatus: ({ params }, cb) => {
        toast.loading("Updating")
        api
            .get('update-exchange-status', params)
            .then(d => {
                console.log(d)
                if (d.status) {

                    toast.success(d.message)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    deleteExchange: ({ params }, cb) => {
        api
            .get('delete-exchange', params)
            .then(d => {
                if (d.status) {

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    // User APIs

    getAllUser: ({ params }, cb) => {
        api
            .get('user', params)
            .then(d => {
                if (d.status) {
                    writeAtom(usersListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    searchUser: ({ params }, cb) => {
        api
            .get('search-user', params)
            .then(d => {
                if (d.status) {
                    writeAtom(searchListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateUser: ({ body, params }, cb) => {
        toast.loading("Updating...")

        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.any().optional().allow(null).allow(""),
            username: Joi.any().optional().allow(null).allow(""),
            avatar: Joi.any().optional().allow(null).allow(""),
            email: Joi.any().optional().allow(null).allow(""),
            email_verified: Joi.any().optional().allow(null).allow(""),
            phone: Joi.any().optional().allow(null).allow(""),
            payment_methods: Joi.any().optional().allow(null).allow(""),
            user_type: Joi.any().optional().allow(null).allow(""),
            sys_user: Joi.any().optional().allow(null).allow(""),
            level: Joi.any().optional().allow(null).allow(""),
            profile_completed: Joi.any().optional().allow(null).allow(""),
        }).validate(body);

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post('update-user', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    userDataById: ({ params }, cb) => {
        api
            .get('user-data', params)
            .then(d => {
                if (d.status) {
                    writeAtom(userDataAtom, d.data)

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    }
    ,
    userPaymentData: ({ params }, cb) => {
        api
            .get('user-payment-data', params)
            .then(d => {
                if (d.status) {
                    writeAtom(userPaymentDataAtom, d.data)

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateUserBankStatus: ({ body, params }, cb) => {
        toast.loading("Updating...")

        const Schema = Joi.object({
            user_id: Joi.string().required(),
            status: Joi.string().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post('user-bank-status', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    userTransactions: ({ params }, cb) => {
        api
            .get('user-transactions', params)
            .then(d => {
                if (d.status) {
                    writeAtom(userTransactionsAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    userIds: ({ params }, cb) => {
        api
            .get('user-ids', params)
            .then(d => {
                if (d.status) {
                    writeAtom(userIdsAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    allIdsWithStatus: ({ params }, cb) => {
        api
            .get('id-list', params)
            .then(d => {
                if (d.status) {
                    writeAtom(allInactiveIdsAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateIdStatus: ({ params }, cb) => {
        api
            .get('update-id-status', params)
            .then(d => {
                if (d.status) {

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },


    unitList: ({ params }, cb) => {
        api
            .get(product + '/units', params)
            .then(d => {
                if (d.status) {
                    writeAtom(unitListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    deleteUnit: ({ params }, cb) => {
        toast.loading("Deleting...")
        api
            .get(product + '/delete-unit', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addUnit: ({ body, params }, cb) => {
        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(product + '/unit', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateUnit: ({ body, params }, cb) => {
        toast.loading("Updating...")


        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),

        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(product + '/update-unit', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },


    categoryList: ({ params }, cb) => {
        api
            .get(product + '/categories', params)
            .then(d => {
                if (d.status) {
                    writeAtom(categoryListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    deleteCategory: ({ params }, cb) => {
        toast.loading("Deleting...")
        api
            .get(product + '/delete-category', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addCategory: ({ body, params }, cb) => {
        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            photo: Joi.string().required(),
            active: Joi.boolean().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(product + '/category', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateCategory: ({ body, params }, cb) => {
        toast.loading("Updating...")


        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            photo: Joi.string().required(),
            active: Joi.boolean().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(product + '/update-category', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateCategoryStatus: ({ params }, cb) => {
        toast.loading("Updating")
        api
            .get(product + '/update-category-status', params)
            .then(d => {
                console.log(d)
                if (d.status) {

                    toast.success(d.message)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },





    productList: ({ params }, cb) => {
        api
            .get(product + '/list-products', params)
            .then(d => {
                if (d.status) {
                    console.log(d.data)
                    writeAtom(productListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    deleteProduct: ({ params }, cb) => {
        toast.loading("Deleting...")
        api
            .get(product + '/delete-product', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addProduct: ({ body, params }, cb) => {
        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            photo: Joi.array().min(1).required(),
            price: Joi.number().required(), //10 rs
            unit: Joi.string().required(), //kg
            unit_value: Joi.number().required(), //1
            weight: Joi.string().required(),
            category: Joi.string().required(),
            quantity: Joi.number().required(),
            details: Joi.array().required(),
            options: Joi.array().required(),
            discount: Joi.number().required(),
            store: Joi.string().required(),
            active: Joi.boolean().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(product + '/add-product', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateProduct: ({ body, params }, cb) => {
        toast.loading("Updating...")


        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            photo: Joi.array().min(1).required(),
            price: Joi.number().required(), //10 rs
            unit: Joi.string().required(), //kg
            unit_value: Joi.number().required(), //1
            weight: Joi.string().required(),
            category: Joi.string().required(),
            quantity: Joi.number().required(),
            details: Joi.array().required(),
            options: Joi.array().required(),
            discount: Joi.number().required(),
            store: Joi.string().required(),
            active: Joi.boolean().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(product + '/update-product', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateProductStatus: ({ params }, cb) => {
        toast.loading("Updating")
        api
            .get(product + '/update-product-status', params)
            .then(d => {
                console.log(d)
                if (d.status) {

                    toast.success(d.message)
                    return cb(d)
                } else {
                    // // return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },




    //
    storeList: ({ params }, cb) => {
        api
            .get(store + '/stores', params)
            .then(d => {
                if (d.status) {
                    writeAtom(storeListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    deleteStore: ({ params }, cb) => {
        toast.loading("Deleting...")
        api
            .get(store + '/delete-store', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addStore: ({ body, params }, cb) => {
        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            apartment: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),

            pin_code: Joi.number().required(),
            employee_count: Joi.number().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(store + '/store', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateStore: ({ body, params }, cb) => {
        toast.loading("Updating...")


        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            apartment: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),

            pin_code: Joi.number().required(),
            employee_count: Joi.number().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(store + '/update-store', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    //

    //
    settingList: ({ params }, cb) => {
        api
            .get(auth + '/list-settings', params)
            .then(d => {
                if (d.status) {
                    writeAtom(settingListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    deleteSetting: ({ params }, cb) => {
        toast.loading("Deleting...")
        api
            .get(auth + '/delete-setting', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addSetting: ({ body, params }, cb) => {
        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
            value: Joi.any().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(auth + '/add-setting', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    updateSetting: ({ body, params }, cb) => {
        toast.loading("Updating...")


        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            value: Joi.any().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(store + '/update-setting', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                        .catch(err => console.log(err))
                }
            })
    },

    //

    employeeList: ({ params }, cb) => {
        api
            .get(user + '/employee', params)
            .then(d => {
                if (d.status) {
                    writeAtom(employeeListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    roleList: ({ params }, cb) => {
        api
            .get(user + '/role', params)
            .then(d => {
                if (d.status) {
                    writeAtom(roleListAtom, d.data)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    orderList: ({ params }, cb) => {
        api
            .get(order + '/', params)
            .then(d => {
                if (d.status) {
                    writeAtom(orderListAtom, d.data)
                    let opt = readAtom(orderListPaginateAtom)
                    writeAtom(orderListPaginateAtom, {
                        ...opt,
                        page: d.meta.page,
                        page_count: d.meta.total_pages,
                        total_count: d.meta.total_count
                    });

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    orderById: ({ params }, cb) => {
        api
            .get(order + `/${params?._id}`, {})
            .then(d => {
                if (d.status) {

                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    deleteStore: ({ params }, cb) => {
        toast.loading("Deleting...")
        api
            .get(store + '/delete-store', params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    addEmployee: ({ body, params }, cb) => {

        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
            store: Joi.string().required(),
            role: Joi.string().required(),
            phone: Joi.string().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(user + '', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },


    addRole: ({ body, params }, cb) => {
        toast.loading("Saving...")
        const Schema = Joi.object({
            name: Joi.string().required(),
            salary: Joi.number().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(user + '/add-role', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },
    updateStore: ({ body, params }, cb) => {
        toast.loading("Updating...")


        const Schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            apartment: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),

            pin_code: Joi.number().required(),
            employee_count: Joi.number().required(),
        }).validate(body)

        if (Schema.error) {
            return toast.error(Schema.error.message)
        }

        api
            .post(store + '/update-store', body, params)
            .then(d => {
                if (d.status) {
                    toast.success(d.message)
                    return cb(d)
                } else {
                    return toast.error(d.message)
                }
            })
            .catch(err => console.log(err))
    },

    //
}
