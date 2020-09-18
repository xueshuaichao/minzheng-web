/**
 * @file
 * @author tanghao
 * @date 2018/8/11
 */

import { axios } from '../libs/axios';

export default {
    // 课程-列表
    findCourseList(data) {
        return axios.get('/course/admin/findCourseList', data);
    },
    // 课程-全部类型
    courseStaticInfo(data) {
        return axios.get('/course/courseStaticInfo', data);
    },
    // 课程-新增
    courseadd(data) {
        return axios.post('/course/admin/add', data);
    },
    courseupdate(data) {
        return axios.post('/course/admin/update', data);
    },

    //
    saveCourseItem(data) {
        return axios.post('/courseItem/admin/saveCourseItem', data);
    },
    getCourseDetail(data) {
        return axios.get('/course/admin/findById', data);
    },
    getCourseItemDetail(data) {
        return axios.get('/courseItem/admin/findCourseStructure', data);
    },
    findCourseItemInfo(data) {
        return axios.get('/course/student/findCourseItemInfo', data);
    },

    coursepublish(data) {
        return axios.request('/course/admin/publish', data);
    },
    courseunPublish(data) {
        return axios.request('/course/admin/unPublish', data);
    },
    coursedelete(data) {
        return axios.request('/course/admin/delete', data);
    },

    // 全部分类
    getTree() {
        return axios.get('/category/admin/getTree');
    },
    // 新增分类
    categoryadd(data) {
        return axios.post('/category/admin/add', data);
    },
    // 分类-修改
    categoryupdate(data) {
        return axios.post('/category/admin/update', data);
    },

    // 分类-列表
    findCategoryListByParentId(data) {
        return axios.get('/category/admin/findCategoryListByParentId', data);
    },
    // 分类-禁用
    closeCategory(data) {
        return axios.request('/category/admin/closeCategory', data);
    },
    // 分类-启用
    openCategory(data) {
        return axios.request('/category/admin/openCategory', data);
    },
    // 分类-删除
    categorydelete(data) {
        return axios.request('/category/admin/delete', data);
    },
    // 资源-列表
    findByConditionWithPage(data) {
        return axios.request('/resource/admin/findByConditionWithPage', data);
    },
    // 资源-新增
    saveResource(data) {
        return axios.post('/resource/admin/saveResource', data);
    },
    // 资源-修改
    updateResource(data) {
        return axios.post('/resource/admin/update', data);
    },
    // 资源-详情
    findById(data) {
        return axios.get('/resource/admin/findById', data);
    },
    // 资源-下架
    updateStatus(data) {
        return axios.post('/resource/admin/updateStatus', data);
    },
    // 视频
    previewMedia(data) {
        return axios.get('/resource/admin/getVideoPlayURL', data);
    },
    // 标签-列表树
    taggetTree(data) {
        return axios.get('/tag/admin/getTree', data);
    },
    // 标签-列表
    findListByParentId(data) {
        return axios.get('/tag/admin/findListByParentId', data);
    },
    // 标签-新增
    tagadd(data) {
        return axios.post('/tag/admin/add', data);
    },
    // 标签-修改
    tagupdate(data) {
        return axios.post('/tag/admin/update', data);
    },
    // 标签-删除
    tagdelete(data) {
        return axios.request('/tag/admin/delete', data);
    },
    // 标签-启用
    tagopenTag(data) {
        return axios.request('/tag/admin/openTag', data);
    },
    // 标签-禁用
    tagcloseTag(data) {
        return axios.request('/tag/admin/closeTag', data);
    },
};
