import {NativeTouchEvent} from 'react-native';
import {
  set_are_we_labeling,
  set_create_bbox,
} from '../../redux/slice/labelingSlice';

import {Safe_area_x, Safe_area_y} from '../helper/safe_area';
import {Dispatch} from '@reduxjs/toolkit';

let useTouch_end = (
  e: NativeTouchEvent,
  dispatch: Dispatch<any>,
  dimensions: {w: number; h: number},
  initial_cords: {
    x: number;
    y: number;
  },
) => {
  let min_x = Safe_area_x(Math.min(e.locationX, initial_cords.x), dimensions.w);
  let max_x = Safe_area_x(Math.max(e.locationX, initial_cords.x), dimensions.w);
  let min_y = Safe_area_y(Math.min(e.locationY, initial_cords.y), dimensions.h);
  let max_y = Safe_area_y(Math.max(e.locationY, initial_cords.y), dimensions.h);

  dispatch(set_are_we_labeling(false));
  dispatch(
    set_create_bbox({
      min_x: min_x,
      max_x: max_x,
      min_y: min_y,
      max_y: max_y,
      bbox_label: 'null',
    }),
  );
};

export default useTouch_end;
