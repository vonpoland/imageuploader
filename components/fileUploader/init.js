/**
 * Image uploader element.
 *
 * It's purpose it's to handle files from user and validate whether they have valid extension.
 */
(function (document) {
    "use strict";

    function ImageUploaderController() {
        this.view = null;
    }

    ImageUploaderController.prototype.setView = function(view) {
        this.view = view;
    };

    ImageUploaderController.prototype.onNewElements = function(callback) {
        this.view.addEventListener('newElements', callback);
    };


    function dispatchNewElements(files) {
        files = Array.prototype.slice.apply(files);
        this.dispatchEvent(new CustomEvent('newElements', {'detail': files}));
    }

    function showDropZone(drag) {
        drag.setAttribute("dragging", "true");

    }

    function hideDropZone(drag) {
        drag.removeAttribute("dragging");
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
        drag.addEventListener("dragenter", function (e) {
            e.preventDefault();
            showDropZone(drag);
        }, true);
        drag.addEventListener("dragleave", function (e) {
            e.preventDefault();
            hideDropZone(drag);
        }, true);
        drag.addEventListener('drop', function (event) {
            event.preventDefault();
            hideDropZone(drag);
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