import {NativeTouchEvent} from 'react-native';
import React, {useEffect, Dispatch} from 'react';
import {useDispatch} from 'react-redux';
import {
  set_end_x,
  set_end_y,
  set_are_we_labeling,
} from '../../redux/slice/labelingSlice';

import {Safe_area_x, Safe_area_y} from './safe_area';

// When a user starts interaction with a bbox, we clear the end coordinates, save the initial coordinates, set labeling to active, and claim the touch handler by returning true

let touch_move = (
  e: NativeTouchEvent,
  dispatch: Dispatch<any>,
  dimensions: {w: number; h: number},
) => {
  dispatch(set_end_x(Safe_area_x(e.locationX, dimensions.w)));
  dispatch(set_end_y(Safe_area_y(e.locationY, dimensions.h)));
};

export default touch_move;
