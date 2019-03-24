(function ($) {
    $(document).ready(function () {

        let list = $('.videos-list'),
            loadVideo = name => new Promise(resolve => {
                let video = $(`<video controls><source src="/video/sample (${name}).mp4" type="video/mp4"></video>`)
                    .appendTo(list)
                    .on('loadeddata', resolve);

            }),
            p = Promise.resolve();


        for (let i = 1; i <= 18; i++)
            p = p.then(() => loadVideo(i));

        // for (let i = 1; i <= 18; i++)
        //     setTimeout(() => list.append($(`<video controls><source src="/video/sample (${i}).mp4" type="video/mp4"></video>`)), 1);


    });
})(jQuery);
