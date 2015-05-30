/**
 * Helper for ui operations such as querying dom or opening new window.
 */
(function (UIHelper, document, window) {
    'use strict';

    // who uses jQuery?
    UIHelper.$ = document.querySelector.bind(document);
    UIHelper.windowOpen = window.open.bind(window);
    UIHelper.create = document.createElement.bind(document);
}(window.ImageUploader.UIHelper, window.document, window));