(function (ImageProcessing, FileReader) {
    "use strict";

    /**
     * Class is responsible for file reading.
     * @constructor
     */
    function ImageReader() {
    }

    /**
     * Load file and return is as object with name and data URI.
     * It's image reader so if it won't find image with png jpg format it will set first argument of callback as true.
     * Which means that we had an error.
     *
     * @param {File} file - file to be read.
     * @param callback - called when file read.
     */
    ImageReader.prototype.load = function (file, callback) {
        var reader = new FileReader();

        if(!file.type.match(/image.(png|jpeg)/)){
            callback(true, file);
            return;
        }

        reader.onload = function (event) {
            callback(null, {data: event.target.result, name: file.name});
        };

        reader.readAsDataURL(file);
    };

    /**
     * Create instance of image reader.
     * @returns {ImageReader}
     */
    ImageReader.build = function () {
        return new ImageReader();
    };

    ImageProcessing.ImageReader = ImageReader;
}(window.ImageUploader.ImageProcessing, window.FileReader));