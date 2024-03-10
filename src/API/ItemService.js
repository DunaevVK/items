import axios from "axios";
import {headers} from "./auth";
export default class ItemService {
    static async getBrandsName() {
        const requestBrandIds = {
            "action": "get_fields",
            "params": {"field": "brand"}}
        const responseBrands = await axios.post('http://api.valantis.store:40000/', requestBrandIds, {headers})
        const brandArr = responseBrands.data.result.filter(el => el != null)
        const arrUniqBrand = [...new Set(brandArr)];
        return arrUniqBrand
    }
    static async getPriceItems(price) {
        const requestPriceItemsIds = {
            "action": "filter",
            "params": {"price": price}}
        const responsePriceItemsIds = await axios.post('http://api.valantis.store:40000/', requestPriceItemsIds, {headers})
        const requestBrandItems = {
            "action": "get_items",
            "params": {"ids": responsePriceItemsIds.data.result}}
        const responsePriceItems = await axios.post('http://api.valantis.store:40000/', requestBrandItems, {headers})
        const priceItemsArr =[...new Set(responsePriceItems.data.result)]
        return priceItemsArr
    }
    static async getNameItems(name) {
        const requestNameItemsIds = {
            "action": "filter",
            "params": {"product": name}}
        const responseNameItemsIds = await axios.post('http://api.valantis.store:40000/', requestNameItemsIds, {headers})
        const arrUniqNameId = [...new Set(responseNameItemsIds.data.result)]
        const requestNameItems = {
            "action": "get_items",
            "params": {"ids": arrUniqNameId}}
        const responseNameItems = await axios.post('http://api.valantis.store:40000/', requestNameItems, {headers})
        const nameItemsArr = responseNameItems.data.result
        return nameItemsArr
    }
    static async getBrandItems(brand) {
        const requestBrandItemIds = {
            "action": "filter",
            "params": {"brand": brand}}
        const responseBrandItemsIds = await axios.post('http://api.valantis.store:40000/', requestBrandItemIds, {headers})
        const requestBrandItems = {
            "action": "get_items",
            "params": {"ids": responseBrandItemsIds.data.result}}
        const responseBrandItems = await axios.post('http://api.valantis.store:40000/', requestBrandItems, {headers})
        const brandItemsArr = responseBrandItems.data.result.filter(el => el.brand != null)
        return brandItemsArr
    }
    static async getItems(limit = 10, page = 1, offset = 0) {
            const request_ids = {
                "action": "get_ids",
                "params": {"offset": offset, "limit": limit}}
            const responseIds = await axios.post('http://api.valantis.store:40000/', request_ids, {headers})
            const arrUniqId1 = [...new Set(responseIds.data.result)]
            const requestItems = {
                "action": "get_items",
                "params": {"ids": arrUniqId1}}
            const responseItems = await axios.post('http://api.valantis.store:40000/', requestItems, {headers})
            const arrUniqItem = responseItems.data.result.filter(({ id }) => (!responseItems.data.result[id] && (responseItems.data.result[id] = 1)))
            return arrUniqItem
    }
}