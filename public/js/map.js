ymaps.ready(
    () => {
        let Map = new ymaps.Map('map', {
                center: [55.753994, 37.622093],
                zoom:   10
            }),
            objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize:   32,
            }),
            dots = [
                { "address": "Москва" },
                { "address": "Брянск" },
                { "address": "Санкт-Петербург" }
            ],
            set_dots = new Promise(resolve => {

                let timer;

                for (let i = 0; i < dots.length; i++) {
                    dots[i].id = i + 1;
                    dots[i].type = "Feature";
                    dots[i].geometry = { "type": "Point" };
                    dots[i].properties = {
                        'iconCaption':        "caption",
                        'balloonContentBody': "Balloon",
                    };

                    ymaps.geocode(dots[i].address, { results: 1 })
                        .then(res => {
                            clearTimeout(timer);
                            dots[i].geometry.coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                            console.log('Нашел ' + dots[i].address);

                            timer = setTimeout(() => resolve(), 200);
                        });
                }
            });

        set_dots.then(() => {
            Map.geoObjects.add(objectManager);

            objectManager.add({
                "type":     "FeatureCollection",
                "features": dots
            });
            Map.setBounds(objectManager.getBounds(), { checkZoomRange: true });
        });

    }
);