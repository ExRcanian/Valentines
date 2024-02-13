$(document).ready(function() {
    var envelope = $(".envelope");
    var envelope_wrap = $(".envelope-wrapper");
    var block = $(".blocker")

    envelope.click(function() {
        open();
    });

    function open() {
        envelope.addClass("open")
            .removeClass("close");
        envelope_wrap.addClass("open")
            .removeClass("close");
        block.addClass("show")
            .removeClass("hidden")
    }

})

const track = document.getElementById("track")

window.onmousedown = e => {
    track.dataset.mouseDownAt =e.clientX;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt ==="0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100 )

    track.dataset.percentage = nextPercentage

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`}, {duration: 1200, fill: "forwards"});
    

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`}, {duration: 1200, fill: "forwards"});
        
    }
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage
} 



