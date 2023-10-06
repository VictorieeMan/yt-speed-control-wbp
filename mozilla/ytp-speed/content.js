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

// Create the reset button
function createResetButton() {
    let resetBtn = document.createElement("button");
    resetBtn.className = "ytp-button custom-reset-speed";
    resetBtn.innerText = "Reset Speed";
    resetBtn.style.display = 'none'; // Initially hidden, because speed starts at 1x
    resetBtn.onclick = function() {
        let video = document.querySelector("video");
        let speedBtn = document.querySelector(".custom-speed-adjuster");
        if (video) {
            video.playbackRate = 1;
            if (speedBtn) {
                speedBtn.innerText = "1x";
            }
            // Remove the reset button after click
            resetBtn.remove();
        }
    };
    return resetBtn;
}

// Create the speed toggle button
function createSpeedButton() {
    let btn = document.createElement("button");
    btn.className = "ytp-button custom-speed-adjuster";
    btn.innerText = "1x";
    btn.onclick = function() {
        let video = document.querySelector("video");
        const controls = document.querySelector(".ytp-right-controls"); // Needed for adding reset button
        let resetBtn = document.querySelector(".custom-reset-speed");
        if (video) {
            let newSpeed;
            switch (video.playbackRate) {
                case 1:
                    newSpeed = 1.25;
                    // Add reset button when speed changes from 1x
                    if (!resetBtn) {
                        resetBtn = createResetButton();
                        styleButton(resetBtn);
                        controls.insertBefore(resetBtn, controls.firstChild);
                    }
                    break;
                case 1.25: newSpeed = 1.5; break;
                case 1.5: newSpeed = 1.75; break;
                case 1.75: newSpeed = 2; break;
                case 2: newSpeed = 3; break;
                // case 3: newSpeed = 4; break;
                // case 4: newSpeed = 5; break;
                // case 5: newSpeed = 6; break;
                // case 6: newSpeed = 7; break;
                // case 7: newSpeed = 8; break;
                // case 8: newSpeed = 9; break; // 9x is max speed for sound.
                // case 9: newSpeed = 10; break;
                default:
                    newSpeed = 1;
                    // Remove reset button when speed returns to 1x
                    if (resetBtn) {
                        resetBtn.remove();
                    }
                    break;
            }
            video.playbackRate = newSpeed;
            btn.innerText = newSpeed + "x";
        }
    };
    return btn;
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
            if (controls) {
                if (!document.querySelector(".custom-speed-adjuster")) {
                    let speedBtn = createSpeedButton();
                    styleButton(speedBtn);
                    controls.insertBefore(speedBtn, controls.firstChild);
                }
            }
        }
    }
});

const config = { childList: true, subtree: true };
observer.observe(document.body, config);