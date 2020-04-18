/**
 * @format
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../store/store';

// All the information needed to describe a single bounding box
export interface single_bbox {
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
  bbox_label: string;
}

// Information for the buttons found at the bottom of the labeling screen
// Key is the value of the button ie. dog/cat/etc.
interface labeling_button {
  [key: string]: {
    selected: boolean;
  };
}

export interface export_data {
  [key: string]: {
    base64: string;
    data: {
      min_x: number;
      max_x: number;
      min_y: number;
      may_x: number;
      label: string;
    }[];
  };
}

interface labelingState {
  // Information that we process to describe a current action such as creating a bbbox, resizing a boox, or moving a bbox
  current_action: {
    initial_x_cord: number;
    initial_y_cord: number;
    final_x_cord: number;
    final_y_cord: number;
    are_we_currently_labeling: boolean;
  };
  current_image_size: {
    x: number;
    y: number;
  };
  current_label: string;
  export_data: export_data;
  avaliable_images: string[];
  all_bboxes: single_bbox[];
  buttons: labeling_button;
  value: number;
}

const initialState: labelingState = {
  current_action: {
    initial_x_cord: 0,
    initial_y_cord: 0,
    final_x_cord: 0,
    final_y_cord: 0,
    are_we_currently_labeling: false,
  },
  current_label: 'default',
  current_image_size: {
    x: 0,
    y: 0,
  },
  export_data: {},
  avaliable_images: [],
  all_bboxes: [],
  buttons: {},
  value: 0,
};

export const labelingSlice = createSlice({
  name: 'labeling',
  initialState,
  reducers: {
    clear_current_labeling_page: (state) => {
      state.current_action = initialState.current_action;
      state.all_bboxes = initialState.all_bboxes;
    },

    set_image_size: (state, action: PayloadAction<{x: number; y: number}>) => {
      state.current_image_size.x = action.payload.x;
      state.current_image_size.y = action.payload.y;
    },

    set_create_bbox: (state, action: PayloadAction<single_bbox>) => {
      state.all_bboxes.push(action.payload);
    },

    set_export_data: (state, action: PayloadAction<export_data>) => {
      let key = Object.keys(action.payload);
      state.export_data[key[0]] = action.payload[key[0]];
    },

    set_current_label: (state, action: PayloadAction<string>) => {
      state.current_label = action.payload;
    },
    //

    set_pop_images: (state) => {
      state.avaliable_images.pop();
    },

    //import base64 images
    set_avaliable_images: (state, action: PayloadAction<string>) => {
      state.avaliable_images.push(action.payload);
    },
    // Current labeling action
    set_int_x: (state, action: PayloadAction<number>) => {
      state.current_action.initial_x_cord = action.payload;
    },
    set_int_y: (state, action: PayloadAction<number>) => {
      state.current_action.initial_y_cord = action.payload;
    },
    set_end_x: (state, action: PayloadAction<number>) => {
      state.current_action.final_x_cord = action.payload;
    },
    set_end_y: (state, action: PayloadAction<number>) => {
      state.current_action.final_y_cord = action.payload;
    },
    set_are_we_labeling: (state, action: PayloadAction<boolean>) => {
      state.current_action.are_we_currently_labeling = action.payload;
    },
  },
});

export const {
  set_image_size,
  set_int_x,
  set_int_y,
  set_end_x,
  set_end_y,
  set_are_we_labeling,
  set_create_bbox,
  set_avaliable_images,
  set_export_data,
  set_current_label,
  set_pop_images,
  clear_current_labeling_page,
} = labelingSlice.actions;

/*
export const incrementAsync = (amount: number): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
*/

export const selectCount = (state: RootState) => state.labeling.value;
export const select_Image_Dimensions = (state: RootState) => ({
  x: state.labeling.current_image_size.x,
  y: state.labeling.current_image_size.y,
});
export const select_Current_Bbox_State = (state: RootState) =>
  state.labeling.current_action;

export const select_All_Bbox_state = (state: RootState) =>
  state.labeling.all_bboxes;

export const select_current_label = (state: RootState) =>
  state.labeling.current_label;

export const select_Image_to_Label = (state: RootState) => {
  if (
    state.labeling.avaliable_images &&
    state.labeling.avaliable_images.length
  ) {
    return state.labeling.avaliable_images.slice(-1)[0];
  } else {
    return null;
  }
};

export default labelingSlice.reducer;
