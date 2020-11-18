"use strict";
{
    const midashi = document.getElementById("midashi");

    function bomb() {
        if (tappedDog) {
            return;
        }
        const bombImg = document.getElementById("bombImg");
        const bombImg2 = document.getElementById("bombImg2");
        const gameover = document.getElementById("gameover");
        const cancel1 = document.getElementById("cancel1");
        const cancel2 = document.getElementById("cancel2");
        const cancel3 = document.getElementById("cancel3");
        const dog = document.getElementById("dog");
        const result = document.getElementById("result");
        const tweetbutton = document.getElementById("tweetbutton");
        const bike = document.getElementById("bike");

        bombImg.style.display = "none";
        bombImg2.style.display = "block";
        gameover.style.display = "block";
        cancel1.style.display = "none";
        cancel2.style.display = "none";
        cancel3.style.display = "none";
        dog.style.display = "none";
        result.style.display = "block";
        bike.style.display = "none";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/bakudan/&text=爆弾解除失敗…";
    }
    

    let mLeft = 10;
    let bikeM = 10;
    let tappedDog = false;
    let tappedBike = false;

    function changeDog() {
        const dog = document.getElementById("dog");
        dog.src = "img/heartDog.jpg";
    }
    function dieDog() {

        const gameover = document.getElementById("gameover");
        const dog = document.getElementById("dog");
        const result = document.getElementById("result");
        const tweetbutton = document.getElementById("tweetbutton");

        dog.src = "img/ohaka.jpg";
        gameover.style.display = "block";
        midashi.textContent = "残念…";
        result.style.display = "block";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/bakudan/&text=爆弾解除失敗…";
    }
    function moveDog() {
        
        const cancel3 = document.getElementById("cancel3");
        const dog = document.getElementById("dog");
        const bike = document.getElementById("bike");

        mLeft -= 5;
        bikeM += 5;
        dog.style.marginLeft = mLeft + "px";
        bike.style.marginLeft = bikeM + "px";

        if (mLeft === -40) {
            cancel3.style.boxShadow = "none";
        }
        if (mLeft === -60) {
            sound_of_bike();
        }
        if (mLeft === -65) {
            running();
        }
        if (mLeft === -70) {
            clearInterval(movingId);
            dieDog();

        }
        
    }
    function runBike() {
        bikeM -= 10;
        bike.style.marginLeft = bikeM + "px";
    }
    function sound_of_bike() {
        var bikesound = new Audio('bikesound.wav');
        bikesound.play();

    }
    let movingId;
    let bikeId;

    function moving() {
        movingId = setInterval(moveDog, 500);
    }
    function running() {
        bikeId = setInterval(runBike, 10);
    }

    const bombVue = new Vue({
        el: "#bomb",
        data: {
            hoverFlag: false,
        },
        methods: {
            tapBomb() {
                if ((tappedDog) || (tappedBike)) {
                    return;
                }
                midashi.textContent = "気安く触んじゃねえよ。殺すぞ。";
                this.hoverFlag = false;
                bomb();
            },
            mouseOverAction() {
                if ((tappedDog) || (tappedBike)){
                    return;
                }
                this.hoverFlag = true;
            },
            mouseLeaveAction() {
                if ((tappedDog) || (tappedBike)) {
                    return;
                }
                this.hoverFlag = false;
            },
        },
    });

    const itemVue = new Vue({
        el: "#items",
        data: {
        },
        methods: {
            tapCancel() {
                if ((tappedDog) || (tappedBike)) {
                    return;
                }
                bomb();
                midashi.textContent = "残念…";
            },
            tapDog() {
                if ((tappedDog) || (tappedBike)){
                    return;
                }
                changeDog();
                setTimeout(moving, 1000);
                tappedDog = true;
            },
            tapBike() {
                if ((tappedDog) || (tappedBike)) {
                    return;
                }
                sound_of_bike();
                setTimeout(running, 300);
                setTimeout(dieDog, 800);
                tappedDog = true;
            }
        },
    });


}