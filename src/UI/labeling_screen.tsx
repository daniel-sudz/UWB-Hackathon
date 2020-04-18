/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  NativeTouchEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {
  set_image_size,
  select_Image_Dimensions,
} from '../../redux/slice/labelingSlice';

import calculate_image_size from './calculate_image_size';
import Single_labeling_box from './labeling_box';
import Touch_move from '../helper/touch_move';
import Touch_start from '../helper/touch_start';
import Touch_end from '../helper/touch_end';

let Labeling_image: React.FC<{uri: string}> = ({uri}) => {
  const dispatch = useDispatch();
  const image_dimensions = useSelector(select_Image_Dimensions);

  useEffect(() => {
    Image.getSize(
      uri,
      (w, h) => {
        const {display_width, display_height} = calculate_image_size(w, h);
        dispatch(
          set_image_size({
            x: display_width,
            y: display_height,
          }),
        );
      },
      (e) => {
        throw e;
      },
    );
  }, [image_dimensions.x, image_dimensions.y, uri, dispatch]);

  return (
    <Image
      source={{uri: uri}}
      style={{
        resizeMode: 'contain',
        width: image_dimensions.x,
        height: image_dimensions.y,
      }}
    />
  );
};

let Labeling_screen: React.FC<{}> = ({}) => {
  let dispatch = useDispatch();
  let image_dimensions = useSelector(select_Image_Dimensions);

  let [initial_cords, set_initial_cords] = useState({x: 0, y: 0});

  return (
    <View style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe_view}>
        <View
          style={{
            borderWidth: 2,
          }}
          pointerEvents={'box-only'}
          onMoveShouldSetResponder={(e) => {
            set_initial_cords({
              x: e.nativeEvent.locationX,
              y: e.nativeEvent.locationY,
            });
            Touch_start(e.nativeEvent, dispatch);
            return true;
          }}
          onResponderMove={(e) => {
            Touch_move(e.nativeEvent, dispatch, {
              w: image_dimensions.x,
              h: image_dimensions.y,
            });
            return true;
          }}
          onResponderRelease={(e) => {
            Touch_end(
              e.nativeEvent,
              dispatch,
              {
                w: image_dimensions.x,
                h: image_dimensions.y,
              },
              initial_cords,
            );
            return true;
          }}
          key={0}>
          <Labeling_image uri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==" />
          <Single_labeling_box />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  label_rectangle: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'rgba(0, 256, 0, 0.1)',
  },

  body: {
    flex: 1,
  },
  safe_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_class: {
    margin: 2,
    flex: 0.333,
  },
  button_container: {
    flexDirection: 'row',
    margin: 4,
  },
  submit_button: {
    alignItems: 'center',
    width: '40%',
    color: 'white',
  },
});

export default Labeling_screen;
