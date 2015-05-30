(function (ImageProcessor, ImageReader) {
    'use strict';
    var imageUploader = document.querySelector("#imageUploader");
    var imageProcessor = ImageProcessor.build(ImageReader);

    function onThumbnailCreated(image) {
        var thumbnail = document.createElement("image-thumbnail");

        thumbnail.classList.add("image-thumbnail");
        thumbnail.setImage(image);
        document.querySelector("#thumbnails").appendChild(thumbnail);
    }

    imageUploader.controller.onNewElements(function (elements) {
        elements.detail.forEach(function (file) {
            imageProcessor.createThumbnail(file, onThumbnailCreated);
        });
    });

}(window.ImageUploader.ImageProcessing.ImageProcessor, window.ImageUploader.ImageProcessing.ImageReader));