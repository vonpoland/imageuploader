(function (ImageProcessing) {
    "use strict";

    var maxWidth = 150;
    var maxHeight = 150;

    /**
     * Create thumbnail.
     *
     * Uses canvas to resize the image.
     * @param {Boolean} error - indicates whether there was error while reading file.
     * @param {String} originalImage - Base64 string.
     * @param {Function} onThumbnailCreated - called when we have re-sized image.
     * If error is set it will do nothing.
     */
    function createThumbnail(error, originalImage, onThumbnailCreated) {
        if(error) {
            onThumbnailCreated(error, originalImage);
            return;
        }

        var canvas = document.createElement("canvas");
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement("canvas");

            if (image.height > image.width && image.height > maxHeight) {
                image.width *= maxHeight / image.height;
                image.height = maxHeight;
            } else if (image.width > maxWidth) {
                image.height *= maxWidth / image.width;
                image.width = maxWidth;
            }

            var context = canvas.getContext("2d");

            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            onThumbnailCreated(null, {name: originalImage.name, thumbnail: canvas.toDataURL(), original: originalImage.data});
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

    /**
     * Create image thumbnail.
     * @param {File} file - File to be converted to thumbnail.
     * @param {Function} onThumbnailCreated - Returns
     * {
     *  name - Name of the image.
     *  thumbnail - Data URI of thumbnail image.
     *  original image - Data URI of original image.
     * }
     */
    ImageProcessor.prototype.createThumbnail = function (file, onThumbnailCreated) {
        this.imageReader.load(file, function (error, image) {
            createThumbnail(error, image, onThumbnailCreated);
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