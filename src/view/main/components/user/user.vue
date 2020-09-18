<template>
    <div
        id="user-info"
        class="flex-row"
    >
        <div
            class="certification"
            @click="$router.push('/qualification')"
        >
            <img src="../../../../assets/images/home/rzicon.png">
        </div>
        <Avatar
            icon="ios-person"
            :src="require('@/assets/images/user/photo.png')"
        />
        <Dropdown @on-click="handleClick">
            <a
                href="javascript:void(0)"
                class="flex-row"
                style="font-size: 14px;"
            >
                张三
                <img
                    src="../../../../assets/images/user/drop-down.png"
                    style="width: 18px; height: 18px; margin-left: 4px; margin-top: -4px;"
                >
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>退出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import './user.less';
import { mapActions } from 'vuex';

export default {
    name: 'User',
    data() {
        return {
            identityList: 1,
            url: '',
        };
    },
    computed: {
        userInfo() {
            const { userInfo } = this.$store.state.user;
            if (!userInfo) {
                this.handleClick();
                return {};
            }
            return this.$store.state.user.userInfo;
        },
    },
    methods: {
        ...mapActions(['loginOut']),
        handleClick() {
            this.loginOut().then(() => {
                this.$router.push('/passport');
            });
        },
    },
};
</script>

<style lang="less">
@media screen and (max-width: 1660px) {
}
.certification {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    img {
        width: 60px;
        vertical-align: middle;
    }
}
</style>
