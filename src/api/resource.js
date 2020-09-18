/* eslint-disable import/no-cycle */
/**
 * @file
 * @author tanghao
 * @date 2018/8/11
 */

import { axios } from '../libs/axios';

export default {
    getResourcesList(data) {
        return axios.post('/resource/admin/findByConditionWithPage', data);
    },

    getBindStatusMap() {
        return axios.get('/admin/v1/resource/findBindStatusMap');
    },

    getResourceTypeMap() {
        return axios.get('/admin/v1/resource/findResourceTypeMap');
    },

    getResourceCategory(data) {
        return axios.post('/admin/v1/resource/findCategoryByCondition', data);
    },

    getUploadVideoParam(data) {
        return axios.post('/resource/admin/createUploadVideo', data);
    },

    refreshUploadVideo(data) {
        return axios.get('/resource/admin/refreshUploadVideo', data);
    },

    saveResource(data) {
        return axios.post('/admin/v1/resource/saveResource', data);
    },

    updateResourceStatus(data) {
        return axios.post('/resource/updateStatus', data);
    },

    uploadFile(data) {
        return axios.file('/resource/admin/uploadFile', data);
    },

    previewUploadFile(data) {
        return axios.post('/resource/previewUploadFile', data);
    },

    previewMedia(data) {
        return axios.get('/resource/getVideoPlayURL', data);
    },

    updateStatus(data) {
        return axios.post('/resource/updateStatus', data);
    },

    updateResourceCategory(data) {
        return axios.post('/resource/update', data);
    },

    getCategoryOfCourse() {
        return axios.get('/category/getTree');
    },

    getCategoryOfPolicy(data) {
        return axios.get('/resourceCategory/getTree', data);
    },
};
