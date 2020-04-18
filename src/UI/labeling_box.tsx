/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {
  set_image_size,
  select_Image_Dimensions,
  select_Current_Bbox_State,
} from '../../redux/slice/labelingSlice';

let Single_labeling_box = () => {
  let current_bbox = useSelector(select_Current_Bbox_State);

  return (
    <React.Fragment key={9 * 1000 + 1}>
      <View
        pointerEvents="none"
        key={9 * 1000 + 2}
        style={[
          styles.label_rectangle,
          {
            width: Math.abs(
              current_bbox.final_x_cord - current_bbox.initial_x_cord,
            ),
            height: Math.abs(
              current_bbox.final_y_cord - current_bbox.initial_y_cord,
            ),
            left: Math.min(
              current_bbox.initial_x_cord,
              current_bbox.final_x_cord,
            ),
            top: Math.min(
              current_bbox.initial_y_cord,
              current_bbox.final_y_cord,
            ),
            borderColor: 'green',
          },
        ]}
      />
    </React.Fragment>
  );
};

export default Single_labeling_box;

const styles = StyleSheet.create({
  label_rectangle: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'rgba(0, 256, 0, 0.1)',
  },
});

/*
       <Text
        style={{
          position: 'absolute',
          top: bbox[2] - 20,
          left: bbox[0],
        }}>
        {' '}
        {bbox[6]}
      </Text>
      <View
        pointerEvents="none"
        key={9 * 1000 + 3}
        style={[
          styles.label_rectangle,
          {
            width: width / 3,
            height: height / 3,
            left: bbox[0],
            top: bbox[2],
            borderColor: 'green',
          },
        ]}
      />
      <View
        pointerEvents="none"
        key={9 * 1000 + 4}
        style={[
          styles.label_rectangle,
          {
            width: width / 3,
            height: height / 3,
            left: bbox[0] + (2 / 3) * width,
            top: bbox[2],
            borderColor: 'green',
          },
        ]}
      />

      <View
        pointerEvents="none"
        key={9 * 1000 + 5}
        style={[
          styles.label_rectangle,
          {
            width: width / 3,
            height: height / 3,
            left: bbox[0],
            top: bbox[2] + (2 / 3) * height,
            borderColor: 'green',
          },
        ]}
      />
      <View
        pointerEvents="none"
        key={9 * 1000 + 6}
        style={[
          styles.label_rectangle,
          {
            width: width / 3,
            height: height / 3,
            left: bbox[0] + (2 / 3) * width,
            top: bbox[2] + (2 / 3) * height,
            borderColor: 'green',
          },
        ]}
        */
