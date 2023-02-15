import { Button, List, Typography } from 'antd';
import { DeleteOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks';
import './LayerList.scss';

export type LayerListProps = {
  mode: 'overlay' | 'normal';
};

export function LayerList(props: LayerListProps): JSX.Element | null {
  const mode = props.mode;
  const layers = useAppSelector((s) => s.layers.quakeLayers);
  const dispatch = useAppDispatch().layers;
  const entries = Object.values(layers);

  if (entries.length < 1) return null;

  return (
    <List className={`layer-list-${mode}`}>
      {entries.map((values) => {
        const onClick = (): void => {
          dispatch.removeLayer(values.name);
        };
        const onVisibleToggle = (): void => {
          dispatch.toggleVisible(values.name);
        };
        const action = <Button icon={<DeleteOutlined />} onClick={onClick}></Button>;
        const Icon = values.visible ? <EyeFilled /> : <EyeInvisibleFilled />;
        const hideAction = <Button icon={Icon} onClick={onVisibleToggle}></Button>;
        return (
          <List.Item key={values.name} className="layer-list-item" actions={[action, hideAction]}>
            <Typography.Title level={5}>
              {values.name}
              <span style={{ background: values.color }} className="color-class" />{' '}
              {values.data.length} elements
            </Typography.Title>
          </List.Item>
        );
      })}
    </List>
  );
}
