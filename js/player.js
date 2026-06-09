function playChannel(url){

    const video = document.getElementById("videoPlayer");

    activeChannelUrl = url;

    localStorage.setItem("lastChannel", url);

    document.getElementById("loader").style.display = "block";

    renderChannels();

    // Reset previous stream
    video.pause();
    video.removeAttribute("src");
    video.load();

    if (Hls.isSupported()) {

        const hls = new Hls();

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {

            video.play();

        });

        hls.on(Hls.Events.ERROR, function () {

            document.getElementById("loader").style.display = "none";

        });

    } else {

        video.src = url;

        video.oncanplay = () => {
            document.getElementById("loader").style.display = "none";
            video.play();
        };

    }

    video.onplaying = () => {
        document.getElementById("loader").style.display = "none";
    };
}