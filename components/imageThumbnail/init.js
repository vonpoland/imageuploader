/**
 * Image thumbnail viewer.
 *
 * Shows the image thumbnail.
 */
(function (document) {
    "use strict";

    function getImageThumbnailPrototype() {
        var shadowElement;

        return Object.create(HTMLElement.prototype, {
            createdCallback: {
                value: function () {
                    var template = document.querySelector('#imageThumbnailTemplate').import.querySelector("template");

                    shadowElement = this.createShadowRoot();
                    shadowElement.appendChild(document.importNode(template.content, true));
                }
            },
            setImage: {
                value: function (image) {
                    shadowElement.querySelector('img').src = image.data;
                    shadowElement.querySelector('.image-thumbnail-name').textContent = image.name;
                }
            }
        });
    }

    document.registerElement('image-thumbnail', {prototype: getImageThumbnailPrototype()});
}(window.document));