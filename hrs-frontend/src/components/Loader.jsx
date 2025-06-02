import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
<ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e58129', '#e58129', '#e58129', '#e58129', '#e58129']}
  /></div>)
}

export default Loader