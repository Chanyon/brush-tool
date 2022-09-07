import ToolPanel from './tool';
import './index.css';
const ToolBar = () => {
  return (
      <div className='toolbar'>
        <ToolPanel className={'tool-item'}></ToolPanel>
      </div>
    )
};

export default ToolBar;