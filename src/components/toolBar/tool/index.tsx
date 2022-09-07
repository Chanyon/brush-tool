import React from 'react';
import './index.css';
import { CreateTwoTone } from '@mui/icons-material';
import { ToolType } from '../../../util/toolType';
import { ToolTypeContext } from '../../../context';

export interface ToolPanelProps {
  className?: string;
}

const selectedToolClass = "selected-tool";

const ToolPanel: React.FC<ToolPanelProps> = (props) => {
  const { className } = props;
  return (
    <div className={className ? `toolpanel ${className}` : 'toolpanel'}>
      <ToolTypeContext.Consumer>
        {
          ({type,setType}) => (
            <>
            <div className='top'>
              <span title='铅笔'>
                <CreateTwoTone className={type === ToolType.PEN ? `tool-item ${selectedToolClass}` : 'tool-item'} onClick={() => setType(ToolType.PEN)}></CreateTwoTone>
              </span>
            </div>
            </>
          )
        }
      </ToolTypeContext.Consumer>
      <div className='title'>{"工具"}</div>
    </div>
  )
};

export default ToolPanel;