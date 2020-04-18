/**
 * @format
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../store/store';

// All the information needed to describe a single bounding box
interface single_bbox {
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
  current_image_size: {
    x: 0,
    y: 0,
  },
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
    },

    set_image_size: (state, action: PayloadAction<{x: number; y: number}>) => {
      state.current_image_size.x = action.payload.x;
      state.current_image_size.y = action.payload.y;
    },

    set_create_bbox: (state, action: PayloadAction<single_bbox>) => {
      state.all_bboxes.push(action.payload);
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

export default labelingSlice.reducer;
