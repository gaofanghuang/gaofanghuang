<template>
    <div class="home-wrap flex flex-x flex-y">
        <div class="home-summary tc">
            <div class="webmaster-avatar">
                <img src="../../assets/carrot.jpg" alt="avatar">
            </div>
            <div class="webmaster-name">Gaofang Huang</div>
            <div class="webmaster-career">Developer & Designer</div>
        </div>
    </div>
</template>

<style lang="scss">
    .home-wrap {
        height: calc(100vh - 80px);

        .home-summary {
            height: 30vh;
        }

        .webmaster-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid $white;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 40px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .webmaster-name {
            font-size: 36px;
            font-weight: 200;
            color: $white;
            font-weight: 200;
            margin-bottom: 14px;
        }
        .webmaster-career {
            font-size: 18px;
            font-weight: 800;
            color: $white;
        }
    }
</style>