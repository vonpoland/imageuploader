/**
 * Image uploader element.
 *
 * It's purpose it's to handle files from user and validate whether they have valid extension.
 */
(function (document) {
    "use strict";

    /**
     * Controller of the image uploader.
     * @constructor
     */
    function ImageUploaderController() {
        this.view = null;
    }

    /**
     * Set the view so it can be used by controller.
     * @param {HTMLElement} view.
     */
    ImageUploaderController.prototype.setView = function(view) {
        this.view = view;
    };

    /**
     * Function used to fire callback when new elements are returned by the component.
     * @param callback
     */
    ImageUploaderController.prototype.onNewElements = function(callback) {
        this.view.addEventListener('newElements', callback);
    };


    function dispatchNewElements(files) {
        files = Array.prototype.slice.apply(files);
        this.dispatchEvent(new CustomEvent('newElements', {'detail': files}));
    }

    function setChildrenEventHandlers() {
        var input = this.querySelector("input");
        var drag = this.querySelector("#drag");

        input.addEventListener('change', function () {
            dispatchNewElements.call(this, this.files);
        });

        drag.addEventListener("dragover", function (e) {
            e.preventDefault();
        }, true);

        drag.addEventListener('drop', function (event) {
            event.preventDefault();
            dispatchNewElements.call(this, event.dataTransfer.files);
        });
    }

    function getImageUploaderPrototype() {
        var controller = new ImageUploaderController();

        return Object.create(HTMLElement.prototype, {
            createdCallback: {
                value: function () {
                    var shadow = this.createShadowRoot();
                    var template = document.querySelector('#imageUploaderTemplate').import.querySelector("template");
                    var imageUploader = document.importNode(template.content, true);

                    shadow.appendChild(imageUploader);
                    setChildrenEventHandlers.call(shadow);
                    controller.setView(this);
                }
            },
            controller: {
                value: controller
            }
        });
    }

    document.registerElement('file-uploader', {prototype: getImageUploaderPrototype()});
}(window.document));