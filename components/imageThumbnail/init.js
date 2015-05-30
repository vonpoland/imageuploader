/**
 * Image thumbnail viewer.
 *
 * Shows the image thumbnail.
 */
(function (document) {
    "use strict";

    /**
     * Controller is responsible for interacting with thumbnail component.
     * @constructor
     */
    function ThumbnailController() {
        this.view = null;
    }

    /**
     * Set the view for the controller
     * @param view {HTMLElement}
     */
    ThumbnailController.prototype.setView = function (view) {
        this.view = view;
    };

    /**
     * Set the thumbnail image and name.
     * @param {Object} image. Should have following properties:
     * {
     *  thumbnail - Data Uri to be set on img.
     *  name - Name of the image.
     * }
     */
    ThumbnailController.prototype.setImage = function (image) {
        this.view.querySelector('img').src = image.thubmnail;
        this.view.querySelector('.image-thumbnail-name').textContent = image.name;
    };

    /**
     * Enables to catch event whenever image on thumbnail is clicked.
     * @param callback {Function}.
     */
    ThumbnailController.prototype.onImageClicked = function (callback) {
        this.view.querySelector("img").addEventListener("click", callback);
    };

    function getImageThumbnailPrototype() {
        var controller = new ThumbnailController();

        return Object.create(HTMLElement.prototype, {
            createdCallback: {
                value: function () {
                    var template = document.querySelector('#imageThumbnailTemplate').import.querySelector("template");
                    var shadowElement = this.createShadowRoot();

                    shadowElement.appendChild(document.importNode(template.content, true));
                    controller.setView(shadowElement);
                }
            },
            controller: {
                value: controller
            }
        });
    }

    document.registerElement('image-thumbnail', {prototype: getImageThumbnailPrototype()});
}(window.document));