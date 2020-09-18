# wdc-vue-app

## npm 命令

开发服务：`npm run dev`

build 项目：`npm run build`

代码检查: `npm run lint`

## 开发规范

-   [Git 规范](http://gitlab.wdcloud.cc:10080/tanghao/style-guides/tree/master/Git)
-   [HTML 规范](http://gitlab.wdcloud.cc:10080/tanghao/style-guides/tree/master/HTML)
-   [JavaScript 规范](http://gitlab.wdcloud.cc:10080/tanghao/style-guides/tree/master/JavaScript)

## 核心依赖

-   框架：[vue](https://www.npmjs.com/package/vue)
-   路由：[vue-router](https://www.npmjs.com/package/vue-router)
-   状态管理： [vuex](https://www.npmjs.com/package/vuex)
-   UI 组件： [iview](https://www.npmjs.com/package/iview)

## 业务文档

### 权限管理

1. 路由和菜单

    路由和菜单中的权限控制，需要在 router 中的 meta 中写入 permission 属性，示例如下：

    ```javascript
    {
        path: '/contents/article',
        name: 'contentsArticle',
        meta: {
            show: true,
            i18n: 'contents.article',
            permission: '2_1',
        },
        component: () => import('../view/contents/index.vue'),
    },

    ```

1. 页面元素

    页面元素对应 code 可在 config/permission 中定义。
    页面中的权限控制，是通过自定义指令 permission 来实现的，使用方式如下：

    ```html
    <div v-permission="{ list: servicePermission, code: '10-01-02' }">
        拥有'1_1'权限的用户才有该元素
    </div>
    ```

    列表页面操作栏权限按钮

    ```javascript
    {
        name: '编辑',
        permission: '10-01-02',
    }

    ```
    
    
    
