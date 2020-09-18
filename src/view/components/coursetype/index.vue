<template>
    <div class="common-Type">
        <Select
            :value="code.courseType1"
            placeholder="请选择第一级分类"
            @on-change="handleChange1"
        >
            <Option
                v-for="item in resourceCategory"
                :key="item.id"
                :value="item.id"
            >
                {{ item.name }}
            </Option>
        </Select>
        <Select
            v-if="resource >= 2"
            :value="code.courseType2"
            placeholder="请选择第二级分类"
            @on-change="handleChange2"
        >
            <Option
                v-for="item in typelist2"
                :key="item.id"
                :value="item.id"
            >
                {{ item.name }}
            </Option>
        </Select>
        <Select
            v-if="resource >= 3"
            :value="code.courseType3"
            placeholder="请选择第三级分类"
            @on-change="handleChange3"
        >
            <Option
                v-for="item in typelist3"
                :key="item.id"
                :value="item.id"
            >
                {{ item.name }}
            </Option>
        </Select>
        <Select
            v-if="resource >= 4"
            :value="code.courseType4"
            placeholder="请选择第四级分类"
            @on-change="handleChange4"
        >
            <Option
                v-for="item in typelist4"
                :key="item.id"
                :value="item.id"
            >
                {{ item.name }}
            </Option>
        </Select>
    </div>
</template>

<script>
// import Area from '@/config/coursetype';
import { resourceMixins } from '@/mixins';

export default {
    name: 'Index',
    mixins: [resourceMixins],
    props: {
        resource: {
            // 显示 几级 1 省 2 市 3 区
            type: Number,
            default: 4,
        },
        courseType1: {
            type: String,
            default: '',
        },
        categoycode: {
            type: Object,
            default() {},
        },
    },
    data() {
        return {
            // typelist1: [],
            typelist2: [],
            typelist3: [],
            typelist4: [],
            code: {
                courseType1: '',
                courseType2: '',
                courseType3: '',
                courseType4: '',
            },
        };
    },
    mounted() {
        const that = this;
        if (this.categoycode) {
            this.code = this.categoycode;
            setTimeout(() => {
                that.handleChange1(that.code.courseType1, '1');
                that.handleChange2(that.code.courseType2, '1');
                that.handleChange3(that.code.courseType3, '1');
                that.handleChange4(that.code.courseType4, '1');
            }, 500);
        } else if (this.courseType1) {
            this.code.courseType1 = this.courseType1;
            this.handleChange1(this.courseType1);
        }
    },
    created() {},
    methods: {
        typrresetbtn() {
            this.typelist2 = [];
            this.typelist3 = [];
            this.typelist4 = [];
            this.code = {
                courseType1: '',
                courseType2: '',
                courseType3: '',
                courseType4: '',
            };
        },
        getSelectList(list, id) {
            return list.find(v => v.id === id);
        },
        setDefaultArea(data) {
            const [courseType1, courseType2, courseType3, courseType4] = data;
            if (courseType1 && courseType2) {
                this.handleChange1(courseType1);
                this.handleChange2(courseType2);
                this.handleChange3(courseType3);
                this.handleChange4(courseType4);
            }
        },
        handleChange1(data, type) {
            const { code, resourceCategory } = this;
            const city = this.getSelectList(resourceCategory, data);
            if (!type) {
                this.code = this.$assign(code, {
                    courseType1: city ? city.id : '',
                    courseType2: '',
                    courseType3: '',
                    courseType4: '',
                });
            }

            this.typelist2 = city ? city.children : [];
            if (!type) {
                this.$emit('on-change', [data]);
            }
            this.$forceUpdate();
        },
        handleChange2(data, type) {
            const { typelist2, code } = this;
            const country = this.getSelectList(typelist2, data);
            if (!type) {
                this.code = this.$assign(code, {
                    courseType2: country ? country.id : '',
                    courseType3: '',
                    courseType4: '',
                });
            }

            this.typelist3 = country ? country.children : [];
            if (!type) {
                this.$emit('on-change', [code.courseType1, data]);
            }
            this.$forceUpdate();
        },
        handleChange3(data, type) {
            const { typelist3, code } = this;
            const country = this.getSelectList(typelist3, data);
            if (!type) {
                this.code = this.$assign(code, {
                    courseType3: country ? country.id : '',
                    courseType4: '',
                });
            }

            this.typelist4 = country ? country.children : [];
            if (!type) {
                this.$emit('on-change', [code.courseType2, data]);
            }
            this.$forceUpdate();
        },
        handleChange4(data, type) {
            const { courseType1, courseType2, courseType3 } = this.code;
            if (data) {
                this.code.courseType4 = data;
                if (!type) {
                    this.$emit('on-change', [
                        courseType1,
                        courseType2,
                        courseType3,
                        data,
                    ]);
                }
            }
            this.$forceUpdate();
        },
    },
};
</script>

<style scoped lang="less">
.common-Type {
    .ivu-select {
        margin-right: 20px;
    }
}
</style>
