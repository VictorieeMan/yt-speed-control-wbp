console.log("YouTube Playback Speed Adjuster loaded");

function styleButton(btn) {
    btn.style.background = 'transparent';
        btn.style.border = 'none';
        btn.style.color = '#FFF'; // white text color to match other controls
        btn.style.fontSize = '16px'; // adjust as necessary
        btn.style.cursor = 'pointer';
        btn.style.marginRight = '10px'; // space between this button and next control
        btn.style.verticalAlign = 'middle';
        btn.style.margin = '0';
        btn.style.padding = '0';
        btn.style.display = 'inline-block';
        btn.style.float = 'left'; // Since we're adding to the beginning of controls, float left might be appropriate.


        btn.onmouseover = function() {
            this.style.opacity = '0.7';
        };
        btn.onmouseout = function() {
            this.style.opacity = '1';
        };
}

// Create the button
function createSpeedButton() {
    let btn = document.createElement("button");

    btn.className = "ytp-button custom-speed-adjuster";
    btn.innerText = "1.0x";
    btn.onclick = function() {
        let video = document.querySelector("video");
        if (video) {
            let newSpeed;
            switch (video.playbackRate) {
                case 1: newSpeed = 1.25; break;
                case 1.25: newSpeed = 1.5; break;
                case 1.5: newSpeed = 1.75; break;
                case 1.75: newSpeed = 2; break;
                default: newSpeed = 1; break;
            }
            video.playbackRate = newSpeed;
            btn.innerText = newSpeed + "x";
        }
    };
    return btn;
}

// Create the reset button
function createResetButton() {
    let resetBtn = document.createElement("button");
    resetBtn.className = "ytp-button custom-reset-speed";
    resetBtn.innerText = "Reset Speed";
    resetBtn.onclick = function() {
        let video = document.querySelector("video");
        if (video) {
            video.playbackRate = 1;
            let speedBtn = document.querySelector(".custom-speed-adjuster");
            if (speedBtn) {
                speedBtn.innerText = "1x";
            }
        }
    };
    return resetBtn;
}

let speedBtn = createSpeedButton();
styleButton(speedBtn);

let resetBtn = createResetButton();
styleButton(resetBtn);

// Use a MutationObserver to watch for changes in the YouTube player controls
const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
            const controls = document.querySelector(".ytp-right-controls");
            if (controls && !document.querySelector(".custom-speed-adjuster")) {
                controls.insertBefore(speedBtn, controls.firstChild);
                controls.insertBefore(resetBtn, controls.firstChild);
            }
        }
    }
});

const config = { childList: true, subtree: true };
observer.observe(document.body, config);