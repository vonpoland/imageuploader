(function (ImageProcessing) {
    "use strict";
    var maxWidth = 150;
    var maxHeight = 150;

    /**
     * Create thumbnail.
     *
     * Uses canvas to resize the image.
     * @param {String} originalImage - Base64 string.
     * @param {Function} onThumbnailCreated - called when we have re-sized image.
     */
    function createThumbnail(originalImage, onThumbnailCreated) {
        var canvas = document.createElement("canvas");
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement("canvas");

            if (image.height > image.width  && image.height > maxHeight) {
                image.width *= maxHeight / image.height;
                image.height = maxHeight;
            } else if(image.width > maxWidth) {
                image.height *= maxWidth /image.width;
                image.width = maxWidth;
            }

            var context = canvas.getContext("2d");

            context.drawImage(image, 0, 0, image.width, image.height);
            onThumbnailCreated({name: originalImage.name, data: canvas.toDataURL()});
        };

        image.src = originalImage.data;
    }

    /**
     * Image processor constructor.
     *
     * Class is responsible for image processing such us creating thumbnails.
     * @constructor
     */
    function ImageProcessor(imageReader) {
        this.imageReader = imageReader;
    }

    ImageProcessor.prototype.createThumbnail = function (file, onThumbnailCreated) {
        this.imageReader.load(file, function (image) {
            createThumbnail(image, onThumbnailCreated);
        });
    };

    ImageProcessor.build = function (ImageReader, options) {
        options = options || {};
        maxWidth = options.maxWidth || maxWidth;
        maxHeight = options.maxHeight || maxHeight;

        return new ImageProcessor(ImageReader.build());
    };

    ImageProcessing.ImageProcessor = ImageProcessor;
}(window.ImageUploader.ImageProcessing, window.FileReader));