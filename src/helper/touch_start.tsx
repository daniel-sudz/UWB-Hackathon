import {NativeTouchEvent} from 'react-native';
import React, {useEffect, Dispatch} from 'react';
import {useDispatch} from 'react-redux';
import {
  set_int_x,
  set_int_y,
  set_end_x,
  set_end_y,
  set_are_we_labeling,
} from '../../redux/slice/labelingSlice';

// When a user starts interaction with a bbox, we clear the end coordinates, save the initial coordinates, set labeling to active, and claim the touch handler by returning true

let touch_start = (e: NativeTouchEvent, dispatch: Dispatch<any>) => {
  console.log('start');
  dispatch(set_int_x(e.locationX));
  dispatch(set_int_y(e.locationY));
  dispatch(set_end_x(e.locationX));
  dispatch(set_end_y(e.locationY));
  dispatch(set_are_we_labeling(true));
};

export default touch_start;
