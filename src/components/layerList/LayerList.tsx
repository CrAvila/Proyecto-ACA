import { Button, List, Typography } from 'antd';
import { DeleteOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks';
import './LayerList.scss';
import { MouseEvent } from 'react';

export type LayerListProps = {
  mode: 'overlay' | 'normal';
};

export function LayerList(props: LayerListProps): JSX.Element | null {
  const mode = props.mode;
  const layers = useAppSelector((s) => s.layers.quakeLayers);
  const dispatch = useAppDispatch();
  const entries = Object.values(layers);

  if (entries.length < 1) return null;

  return (
    <List className={`layer-list-${mode}`}>
      {entries.map((values) => {
        const onClick = (evt: MouseEvent): void => {
          dispatch.layers.removeLayer(values.name);
        };
        const onVisibleToggle = (evt: MouseEvent): void => {
          dispatch.layers.toggleVisible(values.name);
        };

        const onOpenLayer = (): void => {
          dispatch.ui.setLayer(values);
        };

        const action = <Button icon={<DeleteOutlined />} onClick={onClick}></Button>;
        const Icon = values.visible ? <EyeFilled /> : <EyeInvisibleFilled />;
        const hideAction = <Button icon={Icon} onClick={onVisibleToggle}></Button>;
        return (
          <List.Item key={values.name} className="layer-list-item" actions={[hideAction, action]}>
            <Typography.Title level={5} onClick={onOpenLayer}>
              <span style={{ background: values.color }} className="color-class" />
              {values.name} [{values.data.length} elements]
            </Typography.Title>
          </List.Item>
        );
      })}
    </List>
  );
}
