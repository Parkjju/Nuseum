import { useEffect } from 'react';
import { breakfastActions } from '../store/meal-slice/breakfast-slice';
import { dinnerActions } from '../store/meal-slice/dinner-slice';
import { lunchActions } from '../store/meal-slice/lunch-slice';
import { snackActions } from '../store/meal-slice/snack-slice';
import { supplementActions } from '../store/supplement-slice';
import { waterActions } from '../store/water-slice';

const useActions = (when) => {
    switch (when) {
        case 'breakfast':
            return breakfastActions;
        case 'lunch':
            return lunchActions;
        case 'dinner':
            return dinnerActions;
        case 'snack':
            return snackActions;
        case 'supplement':
            return supplementActions;
        case 'water':
            return waterActions;
        default:
            return null;
    }
};

export default useActions;
