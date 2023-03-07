import React, { useReducer } from "react";
import { rootReducer, defaultRootState } from "./rootReducer";
import type { RootState, ReducerAction } from "./rootReducer"
export type StoreContextType = {
    state: RootState;
    dispatch: React.Dispatch<ReducerAction>;
} 

export const StoreContext = React.createContext<{state: RootState, dispatch: React.Dispatch<ReducerAction>} | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(rootReducer, defaultRootState);
    // Important(!): memoize array value. Else all context consumers update on *every* render
    const store = React.useMemo(() => {return {state, dispatch}}, [state]);
    return (
        <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
    );
};