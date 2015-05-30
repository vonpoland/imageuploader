(function (ImageProcessor, ImageReader) {
    'use strict';

    var $ = document.querySelector.bind(document);
    var imageUploader = $("#imageUploader");
    var imageProcessor = ImageProcessor.build(ImageReader);

    function onThumbnailCreated(image) {
        var thumbnail = document.createElement("image-thumbnail");

        thumbnail.classList.add("image-thumbnail");
        thumbnail.controller.setImage(image);
        thumbnail.controller.onImageClicked(function () {
            window.open(image.original);
        });

        $("#thumbnails").appendChild(thumbnail);
    }

    function onFilesUpload(elements) {
        elements.detail.forEach(function (file) {
            imageProcessor.createThumbnail(file, onThumbnailCreated);
        });
    }

    imageUploader.controller.onNewElements(onFilesUpload);

}(window.ImageUploader.ImageProcessing.ImageProcessor, window.ImageUploader.ImageProcessing.ImageReader));