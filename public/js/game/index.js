require.config({
    baseUrl: '/js/game',
    paths:   {
        jquery: '/node_modules/jquery/dist/jquery.min',
        // chosen:                  '../node_modules/chosen-js/chosen.jquery.min',
        // uikit:                   '../node_modules/uikit/dist/js/uikit.min',
        // uikiticons:              '../node_modules/uikit/dist/js/uikit-icons.min',
        // '../widgets/datepicker': '../node_modules/jquery-ui/ui/widgets/datepicker',
        // '../keycode':            '../node_modules/jquery-ui/ui/keycode',
        // '../version':            '../node_modules/jquery-ui/ui/version',
        // datepicker_ext:          'jquery.datepicker.extension.range.min',
        // bx_api:                  '//api.bitrix24.com/api/v1/?',
        // ymaps_api:               'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
    },
    shim:    {
        // chosen:         { deps: ['jquery'] },
        // datepicker_ext: { deps: ['jquery', '../widgets/datepicker'] }
    }
});

require(['jquery'], () => require(['main']));
