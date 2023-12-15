import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader'
import Hammer from 'hammerjs';


cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

cornerstoneTools.init();

const Point2 = () => {
// Setup image loader
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstone.registerImageLoader('http', cornerstoneWebImageLoader.loadImage)
cornerstone.registerImageLoader('https', cornerstoneWebImageLoader.loadImage)

// Setup tools
const csTools = cornerstoneTools.init();

// Enable Element
const element = document.querySelector('.cornerstone-element');
cornerstone.enable(element);

// Display an image
const imageId = 'https://www.asteris.biz/Keystone/ImageDownload.aspx?ClinicCode=TESTKEYSTONE&ImageId=01b1755e-33d1-4b24-b9af-a4a019689d5f&ImageType=PreviewImage&FrameIndex=0';
cornerstone.loadImage(imageId).then(function (image) {
  cornerstone.displayImage(element, image);
});


  return (
    <div class="cornerstone-element-wrapper">
    <div class="cornerstone-element" data-index="0" oncontextmenu="return false"></div>
  </div>
  );
};

export {Point2};
