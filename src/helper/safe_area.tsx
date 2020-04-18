import {useSelector, useDispatch} from 'react-redux';
import {select_Image_Dimensions} from '../../redux/slice/labelingSlice';

import {useEffect} from 'react';
// Summary
// When a user creates, moves, or resizes a bounding box, his finger might leave the picture frame.
// However, we do not want our bboxes to appear in random places, so we employ checks to verify that the coordinates stay within the frame.

// since coordinates are relative, we make sure that the x is not negative or outside of the image frame
let Safe_area_x = (given_x: number, image_width: number) => {
  console.log('TEST ');
  if (given_x < 0) {
    return 0;
  }
  if (given_x > image_width) {
    return image_width;
  }
  return given_x;
};

// since coordinates are relative, we make sure that the y is not negative or outside of the image frame
let Safe_area_y = (given_y: number, image_height: number) => {
  if (given_y < 0) {
    return 0;
  }
  if (given_y > image_height) {
    return image_height;
  }
  return given_y;
};

export {Safe_area_x, Safe_area_y};
