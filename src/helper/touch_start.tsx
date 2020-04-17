import { NativeTouchEvent } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import {select_Current_Bbox_State, set_int_x, set_int_y, set_end_x, set_end_y, set_are_we_labeling} from '../../redux/slice/labelingSlice'

// When a user starts interaction with a bbox, we clear the end coordinates, save the initial coordinates, set labeling to active, and claim the touch handler by returning true

let touch_start = (e: NativeTouchEvent) => {
    const current_bbox = useSelector(select_Current_Bbox_State);
    const dispatch = useDispatch();

    dispatch(set_int_x(e.locationX));
    dispatch(set_int_y(e.locationY));  
    dispatch(set_end_x(0));
    dispatch(set_end_y(0));
    dispatch(set_are_we_labeling(true));

    return true; 
}

export default touch_start