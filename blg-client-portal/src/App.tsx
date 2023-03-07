import React, { useContext, useEffect } from 'react';
import Banner from './components/banner/Banner';
import Layout from './components/folders/Layout'
import './styles/styles.scss';
import { StoreContextType } from "./store/StoreProvider"
import { StoreContext } from './store/StoreProvider';
import useFileUpload from './file_upload/useFileUpload';
import initialize from './uitil/initialize';
import type { ExtractedForm } from "./store/extractedFormReducer"
import { Backdrop, CircularProgress } from "@mui/material"
import ErrorModal from './components/error_modal/ErrorModal';
import Alerts from './components/alerts/Alerts';

function App({ extractedForm }: {
  extractedForm: ExtractedForm
}) {
  const { dispatch, state } = useContext(StoreContext) as StoreContextType
  const showGlobalLoader = state.appConfig.pageLoaderOpen
  const errorMessage = state.appConfig.unrecoverableErrorMessage
  useFileUpload()
  useEffect(() => {
    initialize(dispatch, extractedForm)
  }, [])

  return (
    <div className="App">
      {showGlobalLoader && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={() => null}>
          <CircularProgress color="inherit" />
        </Backdrop>}
      <ErrorModal open={!!errorMessage} message={errorMessage} />
      <div className="side-banner"></div>
      <Banner />
      <Layout />
      <Alerts/>
    </div>
  );
}

export default App;
