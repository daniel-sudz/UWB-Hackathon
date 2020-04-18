import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

let calculate_image_size = (image_width: number, image_height: number) => {
  // aspect ratio of the image
  let image_aspect = image_height / image_width;

  // We dont want our image to take up either the full height of full width
  let maxWidth = width * 0.98;
  let maxHeight = height * 0.575;

  // The actual display width of the image
  let display_width: number,
    display_height = 0;

  // If the image take up the max width and the resulting height
  // is greater than our allowed threshold, we set the image height to the max height.

  if (maxWidth * image_aspect > maxHeight) {
    display_width = maxHeight * (1 / image_aspect);
    display_height = maxHeight;
  }

  // Else, setting width to max width will not cause a height overflow so we can safely do so
  else {
    display_width = maxWidth;
    display_height = maxWidth * image_aspect;
  }

  return {
    display_width: display_width,
    display_height: display_height,
  };
};

export default calculate_image_size;
