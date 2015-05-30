(function (ImageProcessing, $, UIHelper) {
    'use strict';

    var imageProcessor = ImageProcessing.ImageProcessor.build(ImageProcessing.ImageReader);

    function createThumbnailComponent(image) {
        var thumbnail = UIHelper.create("image-thumbnail");

        thumbnail.classList.add("image-thumbnail");
        thumbnail.controller.setImage(image);
        thumbnail.controller.onImageClicked(function () {
            UIHelper.windowOpen(image.original);
        });

        return thumbnail;
    }

    function onThumbnailCreated(error, image) {
        if (error) {
            window.console.warn("Image cannot be created check extension", image);
            return;
        }

        $("#thumbnails").appendChild(createThumbnailComponent(image));
    }

    /**
     * Constructor of image upload service.
     * @constructor
     */
    function ImageUploadService() {
    }

    /**
     * Create instance of image upload service.
     * @returns {ImageUploadService}
     */
    ImageUploadService.build = function () {
        return new ImageUploadService();
    };

    /**
     * Handle the upload.
     * Go through all files and create thumbnail.
     * @param elements
     */
    ImageUploadService.prototype.onFilesUpload = function (elements) {
        elements.detail.forEach(function (file) {
            imageProcessor.createThumbnail(file, onThumbnailCreated);
        });
    };

    ImageProcessing.ImageUploadService = ImageUploadService;

}(window.ImageUploader.ImageProcessing,
    window.ImageUploader.UIHelper.$,
    window.ImageUploader.UIHelper));