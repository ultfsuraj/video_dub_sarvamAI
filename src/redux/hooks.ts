import { AppDispatch, AppState } from '@/redux/store';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
