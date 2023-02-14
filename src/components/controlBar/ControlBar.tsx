import { PlusOutlined, HeatMapOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch } from 'hooks';
import './ControlBar.scss';

export function ControlBar(): JSX.Element {
  const dispatch = useAppDispatch();

  const onNewLayer = (): void => {
    dispatch.ui.changeDrawerForm(true);
  };

  return (
    <div className="control-bar">
      <Button onClick={onNewLayer} icon={<PlusOutlined />}>
        Add Layer
      </Button>
      <Button onClick={onNewLayer} icon={<HeatMapOutlined />}>
        Edit Layers
      </Button>
    </div>
  );
}
