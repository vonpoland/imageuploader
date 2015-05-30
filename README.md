#Task description
Candidate should implement script that will handle binary image files selected by user. Script should be implemented according to the following instructions.
User should be able to upload multiple selected files to the application using input field or by dragging and dropping them on selected page area.
For every uploaded image, a separate thumbnail image (150px x 150px) should be generated. All thumbnails should be displayed on page. Clicking on thumbnail should open new window with original version of corresponding image.
All data processing should be implemented within the browser, without any backend solutions or additional technologies. Task should be implemented without any third-party libraries or frameworks.
 
#Expectations
JavaScript application that is able to perform all described operations.
 
#Requirements
* Browser support: Firefox, Chrome
* Supported image formats: jpg, png
* Careful code structure
* Commented code
* No third-party code
* Basic UI that allows to test the solution

#How to run application

**Important** : On Firefox you need to enable webcomponents - in about:config tab enable dom.webcomponents.enabled = true

Application needs to hosted on web server example(otherwise you will get cross origin policy error when importing html):

1. npm install -g http-server
2. Go to your application directory and type **http-server**
3. Then go to http://localhost:8080/index.html

