<template>
    <div class="index-wrap">
        <div class="index-pane">
            <div class="index-box">
                <a href="https://github.com/gaofanghuang" target="_blank" class="index-avatar-wrap">
                    <img src="../assets/carrot.jpg" alt="carrot">
                    <div class="index-github-icon">
                        <svg width="16" height="16" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </div>
                </a>
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
        padding: 10px;
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
        position: relative;
    }

    .index-github-icon {
        position: absolute;
        left: 50%;
        top: 200px;
        transform: translateX(-50%);
        color: #666;
        text-align: center;
        background: #fff;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 8px #d2d2d2;
        transition: 0.2s ease-in;

        svg {
            fill: currentColor;
        }
    }

    .index-avatar-wrap {
        display: block;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
        &:hover {
            .index-github-icon {
                box-shadow: none;
            }
        }
    }

    .index-avatar-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;

        &:hover {
            animation: aniCircle 5s infinite linear;
        }
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
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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

    .index-btn-item+.index-btn-item {
        margin-left: 10px;
    }
</style>