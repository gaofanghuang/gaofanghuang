<template>
    <div class="index-wrap">
        <div class="index-pane">
            <div class="index-box">
                <div class="index-avatar-wrap">
                    <img src="../assets/carrot.jpg" alt="carrot">
                </div>
                <p class="index-name">GaoFang Huang</p>
                <p class="index-carreer">Developer & Designer</p>
                <div class="index-btn-group">
                    <a href="/blog" class="index-btn-item">blog</a>
                    <a href="/project" class="index-btn-item">project</a>
                    <a href="/skill" class="index-btn-item">skill</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.index-wrap {
    width: 100%;
    height: 100vh;
    background: linear-gradient(0deg, #23cca9, #23bed5);
    padding: 4px;
}

.index-pane {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.index-box {
    text-align: center;
    color: #666;
}

.index-avatar-wrap {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    border: 3px solid #e5e5e5;
}

.index-avatar-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}

.index-avatar-wrap img:hover {
    animation: aniCircle 1s infinite ease;
}

@keyframes aniCircle {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}


.index-name {
    font-size: 64px;
    letter-spacing: 2px;
    margin: 140px 0 14px 0;
    background: linear-gradient(0deg, $green, $primary);
    -webkit-background-clip:text;	
    -webkit-text-fill-color:transparent;
    font-weight: 600;
}

.index-btn-group {
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
}

.index-btn-item {
    display: inline-block;
    border: 1px solid #e9e9e9;
    color: #c5c5c5;
    border-radius: 8px;
    padding: 6px 24px;
    box-shadow: 0 4px 8px #f2f2f2, 0 3px 3px #d9d9d9;
}

.index-btn-item:hover {
    color: #999;
    border: 1px solid #d2d2d2;
    box-shadow: none;
}

.index-btn-item + .index-btn-item {
    margin-left: 10px;
}
</style>

