<template>
    <div class="icon-wrap" />
</template>

<script>
export default {
    name: 'Index',
    props: {
        name: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less">
.icon-wrap {
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-right: 10px;
    background-size: 22px;
    background-image: url("../../../assets/images/sider/default/xueyuan.png");
    background-repeat: no-repeat;
}
.ivu-menu {
    .ivu-menu-submenu:nth-child(1) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/xueyuan.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/xueyuan.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/xueyuan.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/xueyuan.png");
            }
        }
    }
    .ivu-menu-submenu:nth-child(2) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/ziyuan.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/ziyuan.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/ziyuan.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/ziyuan.png");
            }
        }
    }

    .ivu-menu-submenu:nth-child(3) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/kecheng.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/kecheng.png");
            }
        }
        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/kecheng.png");
            }
        }
        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/kecheng.png");
            }
        }
    }

    .ivu-menu-submenu:nth-child(4) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/kaoshi.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/kaoshi.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/kaoshi.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/kaoshi.png");
            }
        }
    }
    .ivu-menu-submenu:nth-child(5) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/jiuye.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/jiuye.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/jiuye.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/jiuye.png");
            }
        }
    }
    .ivu-menu-submenu:nth-child(6) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/caiwu.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/caiwu.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/caiwu.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/caiwu.png");
            }
        }
    }

    .ivu-menu-submenu:nth-child(7) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/bi.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/bi.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/bi.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/bi.png");
            }
        }
    }

    .ivu-menu-submenu:nth-child(8) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/qunxian.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/quanxian.png");
            }
        }
        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/quanxian.png");
            }
        }
        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/quanxian.png");
            }
        }
    }

    .ivu-menu-submenu:nth-child(9) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/yunying.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/yunying.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/yunying.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/yunying.png");
            }
        }
    }

    .ivu-menu-submenu:nth-child(10) {
        .icon-wrap {
            background-image: url("../../../assets/images/sider/default/shezhi.png");
        }

        &:hover {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/shezhi.png");
            }
        }

        &.ivu-menu-child-item-active {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/hover/shezhi.png");
            }
        }

        &.ivu-menu-opened {
            .icon-wrap {
                background-image: url("../../../assets/images/sider/active/shezhi.png");
            }
        }
    }
}
</style>
