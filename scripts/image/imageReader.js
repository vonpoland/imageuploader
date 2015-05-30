(function (ImageProcessing, FileReader) {
    "use strict";

    /**
     * Class is responsible for image reading.
     * @constructor
     */
    function ImageReader() {
    }

    /**
     * Load file and return is as object with name and data URL.
     * @param {File} file - file to be read.
     * @param callback - called when file read.
     */
    ImageReader.prototype.load = function (file, callback) {
        var reader = new FileReader();

        if(!file.type.match(/image.(png|jpeg)/)){
            return;
        }

        reader.onload = function (event) {
            callback({data: event.target.result, name: file.name});
        };

        reader.readAsDataURL(file);
    };

    ImageReader.build = function () {
        return new ImageReader();
    };

    ImageProcessing.ImageReader = ImageReader;
}(window.ImageUploader.ImageProcessing, window.FileReader));