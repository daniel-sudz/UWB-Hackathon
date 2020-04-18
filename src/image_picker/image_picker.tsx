/* eslint-disable react-native/no-inline-styles */
import ImagePicker, {Image} from 'react-native-image-crop-picker';

import React from 'react';
import {View} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';

import {useSelector, useDispatch} from 'react-redux';

import {
  set_avaliable_images,
  select_Image_Dimensions,
  select_All_Bbox_state,
  select_Image_to_Label,
  export_data,
  set_export_data,
  set_pop_images,
  select_current_label,
  set_current_label,
  clear_current_labeling_page,
} from '../../redux/slice/labelingSlice';

let Image_Picker_Component = () => {
  let dispatch = useDispatch();
  let image_dimensions = useSelector(select_Image_Dimensions);
  let all_bbox_state = useSelector(select_All_Bbox_state);
  let current_image_base_64 = useSelector(select_Image_to_Label);

  let handle_next_image = () => {
    if (current_image_base_64) {
      let width = image_dimensions.x;
      let height = image_dimensions.y;

      let json_to_set: export_data = {
        foo: {
          data: [],
          base64: current_image_base_64,
        },
      };

      all_bbox_state.forEach((bbox) => {
        json_to_set['foo'].data.push({
          label: bbox.bbox_label,
          min_x: bbox.min_x / width,
          max_x: bbox.max_x / width,
          min_y: bbox.min_y / height,
          may_x: bbox.max_y / height,
        });
      });

      dispatch(set_export_data(json_to_set));
      dispatch(set_pop_images());
      dispatch(clear_current_labeling_page());
    }
  };

  let pick_image = async () => {
    try {
      let selected_images = await ImagePicker.openPicker({
        multiple: true,
        forceJpg: true,
        compressImageQuality: 0.5,
        includeBase64: true,
        maxFiles: 100,
        compressImageMaxWidth: 600,
        compressImageMaxHeight: 600,
      });

      // use picked more than one image
      if (!Array.isArray(selected_images)) {
        selected_images = [selected_images];
      }
      //user picked only one image
      (selected_images as Image[]).forEach((image) => {
        dispatch(
          set_avaliable_images(`data:${image.mime};base64,${image.data}`),
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  let Sample_button = (
    text: string,
    onPress: Function,
    primary: boolean,
    danger: boolean,
    succees: boolean,
    light: boolean,
  ) => {
    let current_label = useSelector(select_current_label);
    if (text === current_label) {
      light = false;
      succees = true;
    }
    return (
      <View
        style={{
          margin: 10,
        }}>
        <Button
          onPress={() => {
            onPress();
          }}
          primary={primary}
          light={light}
          danger={danger}
          success={succees}>
          <Text>{text}</Text>
        </Button>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {Sample_button(
          'Select Images to Label',
          pick_image,
          true,
          false,
          false,
          false,
        )}
        {Sample_button(
          'Next Image',
          handle_next_image,
          true,
          false,
          true,
          false,
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        {Sample_button(
          'Apple',
          () => {
            dispatch(set_current_label('Apple'));
          },
          false,
          false,
          false,
          true,
        )}
        {Sample_button(
          'Orange',
          () => {
            dispatch(set_current_label('Orange'));
          },
          false,
          false,
          false,
          true,
        )}
        {Sample_button(
          'Pencil',
          () => {
            dispatch(set_current_label('Pencil'));
          },
          false,
          false,
          false,
          true,
        )}
        {Sample_button(
          'Fruit',
          () => {
            dispatch(set_current_label('Fruit'));
          },
          false,
          false,
          false,
          true,
        )}
      </View>
    </>
  );
};

export default Image_Picker_Component;
