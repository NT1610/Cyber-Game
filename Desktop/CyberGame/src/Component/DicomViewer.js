import React, { useEffect } from 'react';
import cornerstone from 'cornerstone-core';
// import dicomParser from 'dicom-parser';

const DicomViewer = () => {
  useEffect(() => {
    // Load the DICOM image
    const imageId = 'D0001.dcm'; // Replace with the actual DICOM file name
    const imagePromise = cornerstone.loadImage(`/${imageId}`);

    imagePromise.then(image => {
      // Display the image in a specified element
      cornerstone.displayImage(document.getElementById('dicomImage'), image);
    });

    return () => {
      // Free resources when the component is unmounted
      cornerstone.disable(document.getElementById('dicomImage'));
    };
  }, []);

  return <div id="dicomImage" style={{ width: '512px', height: '512px' }} />;
};

export default DicomViewer;
