const { REACT_APP_API_KEY, REACT_APP_LAMBDA_KEY, REACT_APP_PROXY_PORT } = process.env;
 
export const getOrigin = () => {
 return process.env.NODE_ENV === 'development'
 ? `http://localhost:${REACT_APP_PROXY_PORT}`
 : `${window.location.origin}`
}
 
export const getApiKey = () => {
 
 if (process.env.NODE_ENV === 'development') {
 return REACT_APP_LAMBDA_KEY
 }
 
 return REACT_APP_API_KEY;
 
}