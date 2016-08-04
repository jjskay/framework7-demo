import config from '../config/';
import store from '../utils/locaStorage'

class CustomClass {
    getKey(api, key, val) {
        let res = `${api}`;
        Dom7.each(key, (index, k) => {
            const str = `_${k}_${val[index]}`;
            res += str;
        })
        return res;
    }
    getData(key, val){
    	const obj = {};
    	Dom7.each(key, (index, k) => {
            obj[k] = val[index];
        })
        return obj;
    }
    ajax(obj, callback) {
        const { api, data, apiCategory, type, isMandatory } = obj;
        const key = config[apiCategory][api];
        const saveKey = this.getKey(api, key, data);
        const url = `${config.url}${apiCategory}/${api}/`;
        const newData = this.getData(key, data);

        const cacheData = store.get(saveKey);
        cacheData &&  !isMandatory && callback(cacheData);
        Dom7.ajax({
        	type,
            url,
            data: newData,
            success: function(data){
            	store.set(saveKey, data);
            	callback(JSON.parse(data),true);
            },
            faild: callback
        })
    }
}

const CustomAjax = new CustomClass();



export default CustomAjax;
