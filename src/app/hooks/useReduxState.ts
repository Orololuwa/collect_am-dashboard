import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { store } from "data/store";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
