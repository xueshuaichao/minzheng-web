<template>
    <div class="common-area">
        <Select
            :value="code.provinceCode"
            placeholder="请选择省"
            @on-change="handleProvinceChange"
        >
            <Option
                v-for="item in provinceList"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </Option>
        </Select>
        <Select
            v-if="resource >= 2"
            :value="code.cityCode"
            placeholder="请选择市"
            @on-change="handleCityChange"
        >
            <Option
                v-for="item in cityList"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </Option>
        </Select>
        <Select
            v-if="resource >= 3"
            :value="code.countryCode"
            placeholder="请选择区/县"
            @on-change="handleCountryChange"
        >
            <Option
                v-for="item in countryList"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </Option>
        </Select>
    </div>
</template>

<script>
import Area from '@/config/data';

export default {
    name: 'Index',
    props: {
        resource: {
            // 显示 几级 1 省 2 市 3 区
            type: Number,
            default: 3,
        },
        provinceCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            provinceList: [],
            cityList: [],
            countryList: [],
            code: {
                provinceCode: '',
                cityCode: '',
                countryCode: '',
            },
        };
    },
    created() {
        this.provinceList = Area;
        if (this.provinceCode) {
            this.code.provinceCode = this.provinceCode;
            this.handleProvinceChange(this.provinceCode);
        }
    },
    methods: {
        getSelectList(list, value) {
            return list.find(v => v.value === value);
        },
        setDefaultArea(data) {
            const [provinceCode, cityCode, countryCode] = data;
            if (provinceCode && cityCode) {
                this.handleProvinceChange(provinceCode);
                this.handleCityChange(cityCode);
                this.handleCountryChange(countryCode);
            }
        },
        handleProvinceChange(data) {
            const { code, provinceList } = this;
            const city = this.getSelectList(provinceList, data);
            this.code = this.$assign(code, {
                provinceCode: city ? city.value : '',
                cityCode: '',
                countryCode: '',
            });
            this.cityList = city ? city.children : [];
            this.$emit('on-change', [data]);
        },
        handleCityChange(data) {
            const { cityList, code } = this;
            const country = this.getSelectList(cityList, data);
            this.code = this.$assign(code, {
                cityCode: country ? country.value : '',
                countryCode: '',
            });
            this.countryList = country ? country.children : [];
            this.$emit('on-change', [code.provinceCode, data]);
        },
        handleCountryChange(data) {
            const { provinceCode, cityCode } = this.code;
            if (data) {
                this.code.countryCode = data;
                this.$emit('on-change', [provinceCode, cityCode, data]);
            }
        },
    },
};
</script>

<style scoped></style>
