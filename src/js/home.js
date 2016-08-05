import config from '../config/';
import customAjax from '../middlewares/customAjax';
import { timeDifference } from '../utils/time';
import { html } from '../utils/string';

function homeInit(f7, view, page) {
    const { backgroundImgUrl, pageSize } = config;
    const $$ = Dom7;
    let catType = 2;

    /*
     *  When the type is equal to give a value.Execute the following method.
     */
    const catListSingle = (data) => {
        const { id, imge_path, price, fish_type_name, specifications, create_time, contact_name, province_name, city_name, personal_authentication_state, enterprise_authentication_state } = data;
        let res = '';
        res += '<a class="row cat-list-info" href="./views/selldetail.html?infoId=' + id + '">' +
            '<div class="col-30"><img data-src="' + `${imge_path || backgroundImgUrl}` + '" src="' + backgroundImgUrl + '" class="lazy-fadeIn lazy lazy-loaded"></div>' +
            '<div class="col-70">' +
            '<div class="cat-list-title row">' +
            '<div class="col-60 goods-name">' + fish_type_name + '</div>' +
            '<div class="col-40 goods-price">' + `${price || '面议'}` + '</div>' +
            '</div>' +
            '<div class="row cat-list-text">' +
            '<div class="col-70 goods-weight">' + specifications + '</div>' +
            '<div class="col-30 goods-create-time">' + timeDifference(create_time) + '</div>' +
            '</div>' +
            '<div class="cat-list-address">' +
            '<span>' + contact_name + '</span> ' + `${province_name}${city_name}` +
            '</div>' +
            '<div class="cat-list-tags">'
        if (personal_authentication_state === 1 || enterprise_authentication_state === 1) {
            res += '<span class="iconfont icon-v button">实名认证</span>'
                //'<span class="button">水产养殖</span>'
        }
        res += '</div></div>';
        return res;
    }

    const buyLisSingle = (data) => {
        const { id, fish_type_name, stock, specifications, create_time, contact_name, province_name, city_name, personal_authentication_state, enterprise_authentication_state } = data;
        const isV = personal_authentication_state === 1 || enterprise_authentication_state === 1;
        let res = '';
        res += '<a href="./views/buydetail.html?id=' + id + '" class="buy-list-info">' +
            '<div class="row">' +
            '<div class="col-65 buy-name">' + fish_type_name + '</div>' +
            '<div class="col-35 buy-price">' + stock + '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-65 buy-spec">规格：' + specifications + '</div>' +
            '<div class="col-35 buy-time">' + timeDifference(create_time) + '</div>' +
            '</div>' +
            '<div class="home-buy-address">' +
            '<span class="' + `${isV && "iconfont icon-v"}` + '">' + `${contact_name || '匿名用户'}` + '</span>' + `指定产地：${province_name}${city_name}` +
            '</div>'
        return res
    }

    const callback = (data, err, type) => {
        if (err) {
            f7.alert('请求失败,请重新发送请求!');
            return;
        }
        //cat sell list
        if (catType === 2) {
            let catListHtml = '';
            $$.each(data.data.list, (index, item) => {
                catListHtml += catListSingle(item);
            })

            html($$('.cat-list-foreach'), catListHtml, f7);
            $$('.ajax-content').show(200);
            $$('.home-loading').hide(100);
        }
        //cat buy list
        if (catType === 1) {
            let butListHtml = '';
            $$.each(data.data.list, (index, item) => {
                butListHtml += buyLisSingle(item);
            })

            html($$('.buy-list-foreach'), butListHtml, f7);
        }
        if (data.data && data.data.list && type && catType === 2) {
            catType = 1;
            customAjax.ajax({
                apiCategory: 'demandInfo',
                api: 'getDemandInfoList',
                data: ["", "", 1, "", 10, 1],
                type: 'get'
            }, callback);
        }

        //pull to refresh done.
        f7.pullToRefreshDone();
        $$('img.lazy').trigger('lazy');
    }

    /*
     * initialization home page and send ajax to get list data.
     */
    customAjax.ajax({
        apiCategory: 'demandInfo',
        api: 'getDemandInfoList',
        data: ["", "", 2, "", 10, 1],
        type: 'get'
    }, callback);

    // pull to refresh.
    const ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function(e) {
        catType = 2;
        customAjax.ajax({
            apiCategory: 'demandInfo',
            api: 'getDemandInfoList',
            data: ["", "", 2, "", 10, 1],
            type: 'get',
            isMandatory: true
        }, callback);
    })

    //load filter; 
    $$('.home-chushou').click(() => {
        view.router.load({
            url: './views/filter.html',
            animatePages: true,
            query:{
                pageSize,
                type: 2
            }
        }) 
    })


}

module.exports = {
    homeInit: homeInit
}
