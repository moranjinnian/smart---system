<template>
    <div class="whtconst" style="width: 100%;height: 100%">
        <div class="htmleaf-container">
            <div class="pic">
                <div @click="open" name="http://222.218.31.24:8081/permission/main.jsp?systemCode=ljjgjk" class="imgclass">某某</div>
                <div @click="open" name="http://222.218.31.24:8081/permission/main.jsp?systemCode=bridge" class="imgclass">某某</div>
                <div @click="open" name="http://222.218.31.24:8081/permission/main.jsp?systemCode=ntbz" class="imgclass">某某</div>
                <div @click="open" name="http://222.218.31.24:8081/permission/main.jsp?systemCode=gsjg" class="imgclass">某某</div>
                <div @click="open" name="http://222.218.31.24:7781/main.html" class="imgclass">扬尘</div>
                <div @click="open" name="http://222.218.31.24:7780/main.html" class="imgclass">城管</div>
                <div @click="open" name="http://222.218.31.24:8088/Frame/MainPage.aspx" class="imgclass">广告</div>
                <div @click="open" name="http://222.218.31.24:8082/Frame/MainPage.aspx" class="imgclass">执法</div>
                <div @click="open" name="http://222.83.228.177:8008/carmonitor/login.aspx?systemCode=clgl&rest=http://222.218.31.24:8081" class="imgclass">车辆</div>
                <p></p>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from '@/components/kaleidoscope/js/jquery-1.11.0.min.js'
    export default {
        name: "wanhuat",
        methods: {
            open(e){
                console.log(e)
            },
            int(){
                $(function () {
                    var imgL = $(".pic div").size();
                    var deg = 360 / imgL;
                    var roY = 0, roX = -10;
                    var xN = 0, yN = 0;
                    var play = null;

                    $(".pic div").each(function (i) {
                        $(this).css({
                            // <!--translateZ 定义2d旋转沿着z轴-->
                            "transform": "rotateY(" + i * deg + "deg) translateZ(300px)"
                        });
                        // <!--防止图片被拖拽-->
                        $(this).attr('ondragstart', 'return false');
                    });

                    $(document).mousedown(function (ev) {
                        var x_ = ev.clientX;
                        var y_ = ev.clientY;
                        clearInterval(play);
                        $(this).bind('mousemove', function (ev) {
                            /*获取当前鼠标的坐标*/
                            var x = ev.clientX;
                            var y = ev.clientY;
                            /*两次坐标之间的距离*/
                            xN = x - x_;
                            yN = y - y_;
                            roY += xN * 0.2;
                            roX -= yN * 0.1;
                            // console.log('移动');
                            //$('body').append('<div style="width:5px;height:5px;position:absolute;top:'+y+'px;left:'+x+'px;background-color:red"></div>');
                            $('.pic').css({
                                transform: 'perspective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                            });
                            /*之前的鼠标坐标*/
                            x_ = ev.clientX;
                            y_ = ev.clientY;
                        });
                    }).mouseup(function () {
                        $(this).unbind('mousemove');
                        var play = setInterval(function () {
                            xN *= 0.95;
                            yN *= 0.95
                            if (Math.abs(xN) < 1 && Math.abs(yN) < 1) {
                                clearInterval(play);
                            }
                            roY += xN * 0.2;
                            roX -= yN * 0.1;
                            $('.pic').css({
                                transform: 'perspective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                            });

                        }, 30);

                    });

                });
            }
        }
    }
</script>

<style>
    .imgclass{
        width: 200px;
        height: 200px;
        border: 1px solid red;
        line-height: 200px;
    }
    .whtconst{
        margin-top: 5%;
    }
    .pic {
        width: 120px;
        height: 180px;
        margin: 0px auto 0;
        position: relative;
        /*transform 旋转元素*/
        transform-style: preserve-3d;
        transform: perspective(800px) rotateX(-10deg) rotateY(0deg);
    }

    .pic div {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-shadow: 0px 0px 10px #fff;
        /*倒影的设置*/
        -webkit-box-reflect: below 10px -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .5) 100%);
    }

    .pic p {
        width: 1200px;
        height: 1200px;
        background: -webkit-radial-gradient(center center, 600px 600px, rgba(255, 255, 255, .5), rgba(0, 0, 0, 0));
        position: absolute;
        top: 100%;
        left: 50%;
        margin-top: -600px;
        margin-left: -600px;
        border-radius: 600px;
        transform: rotateX(90deg);
    }
</style>
