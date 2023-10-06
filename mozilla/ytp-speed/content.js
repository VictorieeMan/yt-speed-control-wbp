console.log("Content script running");

function addSpeedControl() {
    let controls = document.querySelector(".ytp-right-controls");
    if (controls && !document.querySelector(".custom-speed-adjuster")) {
        let btn = document.createElement("button");
        btn.className = "ytp-button custom-speed-adjuster";
        btn.innerText = "1.0x";
        btn.onclick = function() {
            let video = document.querySelector("video");
            if (video) {
                if (video.playbackRate === 1) {
                    video.playbackRate = 1.25;
                    btn.innerText = "1.25x";
                } else {
                    video.playbackRate = 1;
                    btn.innerText = "1.0x";
                }
            }
        };
        controls.insertBefore(btn, controls.firstChild);
    }
}

setInterval(addSpeedControl, 1000);