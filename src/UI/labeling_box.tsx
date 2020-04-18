/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {useSelector} from 'react-redux';
import {
  select_Current_Bbox_State,
  select_All_Bbox_state,
} from '../../redux/slice/labelingSlice';

// The text label that appears above a bbox
let create_a_text_label = (top: number, left: number, label: string) => {
  return (
    <Text
      key={top * 10000 + left * 1000 + 9}
      style={{
        position: 'absolute',
        top: top - 20,
        left: left,
      }}>
      {label}
    </Text>
  );
};

// At its core, a bbox is just a React Native View with a background color and border color, nothing more.
let create_labeling_box = (
  width: number,
  height: number,
  left: number,
  top: number,
  key_randomizer: number,
) => {
  return (
    <View
      pointerEvents="none"
      key={
        width * 10000 + height * 1000 + left * 100 + top * 10 + key_randomizer
      }
      style={[
        styles.label_rectangle,
        {
          width: width,
          height: height,
          left: left,
          top: top,
          borderColor: 'green',
        },
      ]}
    />
  );
};

// based on width, height, left, and top, we create the main box as well as four boxes in the corners so that a user would be able to sesize the box by dragging the corners
let create_box_with_corners = (
  width: number,
  height: number,
  left: number,
  top: number,
  scale_factor: number,
) => {
  let main_box = create_labeling_box(width, height, left, top, 1);
  let top_left_box = create_labeling_box(
    width * scale_factor,
    height * scale_factor,
    left,
    top,
    2,
  );
  let top_right_box = create_labeling_box(
    width * scale_factor,
    height * scale_factor,
    left + (1 - scale_factor) * width,
    top,
    3,
  );
  let bottom_left_box = create_labeling_box(
    width * scale_factor,
    height * scale_factor,
    left,
    top + (1 - scale_factor) * height,
    4,
  );
  let bottom_right_box = create_labeling_box(
    width * scale_factor,
    height * scale_factor,
    left + (1 - scale_factor) * width,
    top + (1 - scale_factor) * height,
    5,
  );
  let text_label = create_a_text_label(top, left, 'thelabel');
  return [
    main_box,
    top_left_box,
    top_right_box,
    bottom_left_box,
    bottom_right_box,
    text_label,
  ];
};

let Render_main_bboxes = () => {
  let current_bbox = useSelector(select_Current_Bbox_State);
  let all_boxes = useSelector(select_All_Bbox_state);

  // This is the bbox that is currectly in action
  let current_labeling_box = create_box_with_corners(
    Math.abs(current_bbox.final_x_cord - current_bbox.initial_x_cord),
    Math.abs(current_bbox.final_y_cord - current_bbox.initial_y_cord),
    Math.min(current_bbox.initial_x_cord, current_bbox.final_x_cord),
    Math.min(current_bbox.initial_y_cord, current_bbox.final_y_cord),
    1 / 3,
  );

  // These are all the other boxes that have been created
  let all_box_state_to_boxes = all_boxes.map((box) => {
    return create_box_with_corners(
      box.max_x - box.min_x,
      box.max_y - box.min_y,
      box.min_x,
      box.min_y,
      1 / 3,
    );
  });

  return [current_labeling_box, ...all_box_state_to_boxes];
};

export default Render_main_bboxes;

const styles = StyleSheet.create({
  label_rectangle: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'rgba(0, 256, 0, 0.1)',
  },
});
