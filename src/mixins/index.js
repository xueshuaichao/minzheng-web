/**
 * @des mixins
 */
import Vue from 'vue';
import userApi from '@api/user';
import reourceApi from '@api/resource';
import courseApi from '@api/course';

const cache = {};

export const userMixins = {
    methods: {
        getUserStaticInfo() {
            const { userStaticInfo } = cache;

            if (userStaticInfo) {
                // eslint-disable-next-line no-return-assign
                return (this.userStaticInfo = userStaticInfo);
            }

            // eslint-disable-next-line consistent-return
            return userApi.getUserStaticInfo().then(({ data }) => {
                this.userStaticInfo = data;
                cache.userStaticInfo = data;
                return data;
            });
        },
    },
};

export const courseMixins = {
    data() {
        return { courseListStaticInfo: '' };
    },
    created() {
        this.courseStaticInfo();
    },
    methods: {
        courseStaticInfo() {
            const { courseListStaticInfo } = cache;

            if (courseListStaticInfo) {
                this.courseListStaticInfo = courseListStaticInfo;
                return;
            }

            courseApi.courseStaticInfo().then(({ data }) => {
                this.courseListStaticInfo = data;
                cache.courseListStaticInfo = data;
            });
        },
    },
};

export const resourceMixins = {
    data() {
        return {
            resourceType: {},
            resourceCategory: {},
        };
    },

    created() {
        this.getTree();
        // this.getResourceCategory();
    },

    methods: {
        getTree() {
            const { resourceCategory } = cache;

            if (resourceCategory) {
                this.resourceCategory = resourceCategory;
                return;
            }

            courseApi.getTree().then(({ data }) => {
                this.resourceCategory = data;
                cache.resourceCategory = data;
            });
        },
        getResourceTypeMap() {
            const { resourceType } = cache;

            if (resourceType) {
                this.resourceType = resourceType;
                return;
            }

            reourceApi.getResourceTypeMap().then(({ data }) => {
                this.resourceType = data;
                cache.resourceType = data;
            });
        },

        // getResourceCategory() {
        //     const { resourceCategory } = cache;

        //     if (resourceCategory) {
        //         this.resourceCategory = resourceCategory;
        //         return;
        //     }

        //     reourceApi.getResourceCategory({ level: 1 }).then(({ data }) => {
        //         this.resourceCategory = data;
        //         cache.resourceCategory = data;
        //     });
        // },

        // getCategoryOfCourse() {
        //     return reourceApi.getCategoryOfCourse().then(({ data }) => data);
        //     // this.getCategoryOfCourse = () => Promise.resolve(data);
        //     // data);
        // },

        getCategoryOfPolicy() {
            return reourceApi.getCategoryOfPolicy().then(({ data }) => {
                this.getCategoryOfPolicy = () => Promise.resolve(data);
                return data;
            });
        },
    },
};

const globalMixins = {
    computed: {
        servicePermission() {
            return this.$store.state.user.permission;
        },
    },
};

Vue.mixin(globalMixins);
