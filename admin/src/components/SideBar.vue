<template>
    <div class="sidebar-wrap">
        <div class="sidebar-head">
            <div class="logo"></div>
            <div class="sideba">后台管理系统</div>
        </div>
        <div class="sidebar-list">
            <router-link class="sidebar-item" to="/data-count"><i class="sidebar-icon">🍒</i> 数据统计</router-link>
            <router-link class="sidebar-item" to="/project-list"><i class="sidebar-icon">🍻</i> 项目列表</router-link>
            <router-link class="sidebar-item" to="/tags"><i class="sidebar-icon">🍟</i> 标签管理</router-link>
            <router-link class="sidebar-item" to="/img-box"><i class="sidebar-icon">🍧</i> 图片库</router-link>
        </div>
    </div>
</template>

<style lang="scss">
    .sidebar-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        .sidebar-head {
            padding-top: 28px;
            padding-bottom: 28px;
            text-align: left;
            border-bottom: 1px solid #292929;
            padding-left: 14px;
            font-size: 14px;
            background: #262626;
            .logo {
                height: 30px;
                background: url("../assets/GAOFANG.png") no-repeat;
            }
        }
        .sidebar-item {
            display: block;
            height: 48px;
            line-height: 48px;
            padding-left: 14px;
            color: #ffffff;
            border-bottom: 1px solid #292929;
            text-decoration: none;
            font-size: 14px;
            transition: 0.2s;
            &:hover {
                background: #393939;
            }
            &.router-link-active {
                background: linear-gradient(45deg, #23BED5, #23CCA9);
            }
        }
        .sidebar-icon {
            display: inline-block;
            width: 24px;
            font-style: normal;
        }
    }
</style>