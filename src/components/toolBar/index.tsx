import ToolPanel from './tool';
import './index.css';
import ColorPanel from './colorPanel';
const ToolBar = () => {
  return (
      <div className='toolbar'>
        <ToolPanel className={'tool-item'}></ToolPanel>
        <ColorPanel className={'toolbar-item'}></ColorPanel>
      </div>
    )
};

export default ToolBar;