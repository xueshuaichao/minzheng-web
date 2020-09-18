/**
 * @file
 * @author tanghao
 * @date 2018/8/11
 */

import { axios } from '../libs/axios';
// import { course } from './course';

export default {
    // ...course,

    createUser(data) {
        return axios.post('/user/admin/createUser', data);
    },
    // updateUser
    updateUser(data) {
        return axios.post('/user/admin/updateUser', data);
    },
    getServicemanList(data) {
        return axios.request('/user/findByConditionWithPage', data);
    },

    getUserStaticInfo() {
        return axios.get('/user/userStaticInfo');
    },

    importUsers(data) {
        return axios.file('/user/admin/importUsers', data);
    },

    downloadImportUsersExcel() {
        return axios.get('/user/admin/downloadImportUserExcelModel');
    },

    exportRegistrationForms(data) {
        return axios.post('/user/admin/exportRegistrationForms', data);
    },

    saveUserInfo(data) {
        return axios.post('/user/admin/userInfo/saveUserInfo', data);
    },

    getUserInfo(data) {
        return axios.get('/user/admin/userInfo/findById', data);
    },

    getCertificateInfo(data) {
        return axios.get('/user/admin/myCertificate', data);
    },

    issueCertificate(data) {
        return axios.request('/user/admin/issueCertificate', data);
    },

    batchIssueCertificate(data) {
        return axios.request('/user/admin/batchIssueCertificate', data);
    },

    exportRegistrationForm(data) {
        return axios.post('/user/admin/exportRegistrationForm', data);
    },

    disableUser(data) {
        return axios.request('/user/admin/ban', data);
    },

    enableUser(data) {
        return axios.request('/user/admin/start', data);
    },

    getUserPermission() {
        return axios.get('/userRole/admin/findAllUserPermission');
    },

    checkExamBeforeIssue(data) {
        return axios.get('/user/admin/checkExamBeforeIssue', data);
    },
};
