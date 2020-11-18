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

        bombImg.style.display = "none";
        bombImg2.style.display = "block";
        gameover.style.display = "block";
        cancel1.style.display = "none";
        cancel2.style.display = "none";
        cancel3.style.display = "none";
        dog.style.display = "none";
        result.style.display = "block";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/bakudan/&text=爆弾解除失敗…";
    }
    

    let mLeft = 30;
    let tappedDog = false;

    function changeDog() {
        const dog = document.getElementById("dog");
        dog.src = "img/heartDog.jpg";
    }
    function moveDog() {
        const cancel1 = document.getElementById("cancel1");
        const cancel2 = document.getElementById("cancel2");
        const cancel3 = document.getElementById("cancel3");
        const dog = document.getElementById("dog");
        const result = document.getElementById("result");
        const tweetbutton = document.getElementById("tweetbutton");

        mLeft -= 5;
        dog.style.marginLeft = mLeft + "px";
        if (mLeft === -70) {
            cancel3.style.boxShadow = "none";
        }
        if (mLeft === -170) {
            cancel2.style.boxShadow = "none";
        }
        if (mLeft === -270) {
            cancel1.style.boxShadow = "none";
        }
        if (mLeft == -400) {
            midashi.textContent = "解除成功！";
            result.style.display = "block";

            tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/bakudan/&text=爆弾解除成功！";
        }
    }
    let movingId;
    function moving() {
        movingId = setInterval(moveDog, 100);
    }

    const bombVue = new Vue({
        el: "#bomb",
        data: {
            hoverFlag: false,
        },
        methods: {
            tapBomb() {
                if (tappedDog) {
                    return;
                }
                midashi.textContent = "気安く触んじゃねえよ。殺すぞ。";
                this.hoverFlag = false;
                bomb();
            },
            mouseOverAction() {
                if (tappedDog) {
                    return;
                }
                this.hoverFlag = true;
            },
            mouseLeaveAction() {
                if (tappedDog) {
                    return;
                }
                this.hoverFlag = false;
            },
        },
    });

    const itemVue = new Vue({
        el: "#items",
        data: {
            dogHoverFlag: false,
        },
        methods: {
            tapCancel() {
                if (tappedDog) {
                    return;
                }
                bomb();
                midashi.textContent = "残念…";
            },
            tapDog() {
                this.dogHoverFlag = false;
                if (tappedDog) {
                    return;
                }
                changeDog();
                setTimeout(moving, 1000);
                tappedDog = true;
            }
        },
    });

}