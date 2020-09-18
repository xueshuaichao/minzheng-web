<template>
    <layout>
        <!-- <page-header>
            <user />
    </page-header>-->
        <layout>
            <sider
                ref="sider"
                v-model="isCollapsed"
                collapsible
                hide-trigger
                :collapsed-width="78"
                width="260"
            >
                <header v-show="!isCollapsed">
                    {{ logo }}
                </header>
                <side-menu
                    ref="menu"
                    :is-collapsed="isCollapsed"
                    :active-name="activeName"
                    :menu-list="menuList"
                    :accordion="false"
                    :open-names="openNames"
                    @on-select="turnToPage"
                />
            </sider>
            <layout id="xmis-content">
                <Header
                    :style="{ padding: 0 }"
                    class="layout-header-bar"
                >
                    <Icon
                        :class="rotateIcon"
                        :style="{ margin: '0 20px' }"
                        type="md-menu"
                        size="24"
                        @click.native="collapsedSider"
                    />
                    <user />
                </Header>
                <i-content style="position: relative;">
                    <breadcrumb>
                        <breadcrumb-item v-if="breadcrumb[0]">
                            {{ $t(breadcrumb[0]) }}
                        </breadcrumb-item>
                        <template v-for="item in breadcrumb[1]">
                            <breadcrumb-item
                                :key="item.name"
                                :to="{ name: item.name }"
                            >
                                {{ $t(item.i18n) }}
                            </breadcrumb-item>
                        </template>
                        <breadcrumb-item v-if="breadcrumb[2]">
                            {{ $t(breadcrumb[2]) }}
                        </breadcrumb-item>
                    </breadcrumb>
                    <router-view />
                    <spin
                        v-if="openSpin"
                        fix
                    >
                        <icon
                            type="ios-loading"
                            size="24"
                            class="spin-icon-load"
                        />
                        <p class="spin-tips">
                            {{ mainSpinText }}
                        </p>
                    </spin>
                </i-content>
            </layout>
        </layout>
    </layout>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import SideMenu from './components/side-menu';
import User from './components/user';
import { getNewTagList } from '../../libs/utils';
import './main.less';

export default {
    name: 'Main',
    components: {
        SideMenu,
        User,
    },
    data() {
        return {
            activeName: this.setActiveName(this.$route),
            isCollapsed: false,
        };
    },
    computed: {
        logo() {
            return window.location.href.indexOf(
                'https://corp.wdcloudnet.com',
            ) !== -1
                ? '模块化开发'
                : '模块化开发';
        },
        rotateIcon() {
            return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
        },
        menuitemClasses() {
            return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
        },
        openSpin() {
            return this.$store.state.app.openMainSpin;
        },
        mainSpinText() {
            return this.$store.state.app.mainSpinText;
        },

        tagNavList() {
            return this.$store.state.app.tagNavList;
        },

        userInfo() {
            return this.$store.state.user.userInfo;
        },

        menuList() {
            return this.$store.getters.menuList;
        },
        breadcrumb() {
            return this.$store.getters.breadCrumbList;
        },
        openNames() {
            let openName = [];
            if (this.$route.name) {
                openName = [this.$route.name];
            }
            if (this.$route.meta) {
                openName = [this.$store.state.app.breadCrumbList[0]] || [];
            }
            return openName;
        },
    },

    watch: {
        $route(newRoute) {
            this.setBreadCrumb(newRoute.matched);
            this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
            this.activeName = this.setActiveName(newRoute);
        },
    },

    mounted() {
        /**
         * @description 初始化设置面包屑导航和标签导航
         */
        console.log(this.$route.matched);

        this.setTagNavList();
        this.addTag(this.$store.state.app.homeRoute);
        this.setBreadCrumb(this.$route.matched);
    },

    methods: {
        ...mapMutations([
            'setBreadCrumb',
            'setTagNavList',
            'addTag',
            'setLoginInfo',
            'setUserPermission',
        ]),
        ...mapActions(['handleLogin']),
        turnToPage(name) {
            this.$router.push({
                name,
            });
            this.$nextTick(() => {
                this.activeName = this.setActiveName(this.$router);
                this.$refs.menu.updateActiveName();
            });
        },

        setActiveName(router) {
            if (router.mode === 'history') {
                return this.activeName;
            }
            const { meta } = router;
            const breadcrumb = meta && meta.breadcrumb;
            return (breadcrumb && breadcrumb[0].name) || router.name;
        },

        collapsedSider() {
            this.$refs.sider.toggleCollapse();
        },
    },
};
</script>
<style>
.ivu-layout-header {
    background: #fff;
    height: 70px;
}
.side-menu-wrapper .side-menu {
    top: 70px;
}
</style>
<style scoped lang="less">
.ivu-breadcrumb {
    margin-bottom: 14px;
}
header {
    height: 70px;
    background: #363e4f;
    color: #fff;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
}
.layout-header-bar {
    margin-bottom: 20px;
    display: flex;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
}
#wdc-vue-mis .side-menu-wrapper,
body .side-menu-wrapper {
    height: 70px;
    background: #363e4f;
}
.ivu-icon {
    line-height: 70px;
}</style
>>
