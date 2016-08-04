const configs = {
    url: 'http://api.test.yudada.com/',
    backgroundImgUrl: '../img/app_icon_108.png',
    timeout: 6000, //api timeout, unit: ms
    'demandInfo': {
        'getDemandInfoList': [
            "fishTypeId",
            "cityId",
            "type",
            "keyvalue",
            "pageSize",
            "pageNo",
        ]
    }

}
export default configs;
