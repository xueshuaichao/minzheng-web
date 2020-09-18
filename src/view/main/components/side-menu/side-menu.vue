<template>
    <div class="side-menu-wrapper">
        <slot />
        <i-menu
            ref="menu"
            :active-name="activeName"
            :open-names="openedNames"
            :theme="theme"
            width="auto"
            class="side-menu"
            :class="menuitemClasses"
            :accordion="true"
            @on-select="handleSelect"
            @on-open-change="handleOpenChange"
        >
            <template v-for="item in menuList">
                <!-- 显示二级菜单 -->
                <submenu
                    v-if="showChildren(item)"
                    :key="item.i18n"
                    :name="item.i18n"
                >
                    <template slot="title">
                        <common-icon
                            v-if="item.icon"
                            :name="item.icon"
                        />
                        <span>{{ showTitle(item) }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <menu-item
                            :key="child.name"
                            :name="child.name"
                        >
                            <icon
                                v-if="child.icon"
                                :type="child.icon"
                            />
                            <span style="padding-left: 12px;">{{
                                showTitle(child)
                            }}</span>
                        </menu-item>
                    </template>
                </submenu>

                <!-- 隐藏二级菜单 -->
                <menu-item
                    v-else
                    :key="item.i18n"
                    :name="item.i18n"
                >
                    <icon
                        v-if="item.icon"
                        :type="item.icon"
                    />
                    <span>{{ showTitle(item) }}</span>
                </menu-item>
            </template>
        </i-menu>
    </div>
</template>
<script>
import './side-menu.less';

export default {
    name: 'SideMenu',
    props: {
        menuList: {
            type: Array,
            default() {
                return [];
            },
        },
        accordion: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: String,
            default: 'dark',
        },
        iconSize: {
            type: Number,
            default: 16,
        },

        activeName: {
            type: String,
            default: '',
        },
        openNames: {
            type: Array,
            default: () => [],
        },
        isCollapsed: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            openedNames: this.openNames,
            storeInfo: '',
        };
    },

    computed: {
        menuitemClasses() {
            return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
        },
    },

    watch: {
        openNames(newNames) {
            this.openedNames = this.openedNames.concat(newNames);
        },

        openedNames() {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
            });
        },

        isCollapsed(value) {
            this.$store.commit('setCollapsed', value);
        },
    },

    created() {},

    mounted() {},

    methods: {
        handleSelect(name) {
            this.$emit('on-select', name);
        },

        handleOpenChange(name) {
            this.openedNames = name;
        },

        showTitle(item) {
            return item.i18n ? this.$t(item.i18n) : this.$t(item.name);
        },

        showChildren(item) {
            return !item.redirect && item.meta && item.meta.show;
        },

        updateActiveName() {
            this.$refs.menu.updateActiveName();
        },
    },
};
</script>
