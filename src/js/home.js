import config from '../config/';
import customAjax from '../middlewares/customAjax';

function homeInit(f7) {
    const $$ = Dom7;
    let catType = 2;
    customAjax.init($$);

    const callback = (data, status) => {
        if (data.data && data.data.list && status && catType === 2) {
            catType = 1;
            customAjax.ajax({
                apiCategory: 'demandInfo',
                api: 'getDemandInfoList',
                data: ["", "", 1, "", 10, 1],
                type: 'get'
            }, callback);
        }
    }
    customAjax.ajax({
        apiCategory: 'demandInfo',
        api: 'getDemandInfoList',
        data: ["", "", 2, "", 10, 1],
        type: 'get'
    }, callback);

}

module.exports = {
    homeInit: homeInit
}
