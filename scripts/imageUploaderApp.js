(function (ImageUploadService, $) {
    'use strict';

    // Attach callback which will handle upload.
    $("#imageUploader").controller.onNewElements(ImageUploadService.build().onFilesUpload);

}(window.ImageUploader.ImageProcessing.ImageUploadService, window.ImageUploader.UIHelper.$));