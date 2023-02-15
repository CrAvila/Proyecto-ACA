import { Modal, List, Divider, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { CSSProperties } from 'react';
import './LayerModal.scss';
import { quakeLocString, quakeTime } from 'utils/Unit';

export function LayerModal(): JSX.Element {
  const selected = useAppSelector((s) => s.ui.currentLayer);
  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch.ui.setLayer(undefined);
  };

  const styles: CSSProperties = {
    borderColor: selected?.color
  };

  return (
    <Modal
      closable
      open={Boolean(selected)}
      onCancel={onClose}
      footer={null}
      width="800px"
      title={selected?.name}
    >
      <Divider style={styles} />
      <div style={{ backgroundColor: selected?.color + '15' }} className="content-modal">
        <List style={{ opacity: 1, color: 'black' }}>
          {selected?.data.map((q) => {
            const onClick = (): void => {
              dispatch.ui.setQuake(q);
            };
            return (
              <List.Item key={q.id} onClick={onClick}>
                <List.Item.Meta
                  title={<Typography.Title level={4}>Magnitud {q.magnitude}</Typography.Title>}
                  description={
                    <Typography.Text>
                      {quakeLocString(q)} {q.location}
                    </Typography.Text>
                  }
                />
                {quakeTime(q)}
              </List.Item>
            );
          })}
        </List>
      </div>
    </Modal>
  );
}
