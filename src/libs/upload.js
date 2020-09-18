/**
 * @des upload file
 */

import api from '@api/resource';

class UploadFile {
    // eslint-disable-next-line class-methods-use-this
    upload(data) {
        return api.uploadFile(data);
    }
}

export const clientUpload = new UploadFile();

export default {
    clientUpload,
};
