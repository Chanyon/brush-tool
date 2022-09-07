import { createContext, useContext } from 'react';
import { useState } from 'react'
import './App.css'
import Canvas from './components/canvas';
import ToolBar from './components/toolBar';
import { ToolTypeContext } from './context';
import { ToolType } from './util/toolType';

function App() {
  const [toolType,setToolType] = useState<ToolType>(ToolType.PEN);

  return (
    <ToolTypeContext.Provider value={{type:toolType,setType:setToolType}}>
    <div className="App">
        <ToolBar></ToolBar>
        <Canvas toolType={toolType}></Canvas>
      </div>
    </ToolTypeContext.Provider>
  )
}



export default App
