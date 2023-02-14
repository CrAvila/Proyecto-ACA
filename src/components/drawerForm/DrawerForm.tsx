import { Drawer } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { QuakeForm } from '../forms/QuakeForm';

export function DrawerForm(): JSX.Element {
  const open = useAppSelector((s) => s.ui.layerForm.open);
  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch.ui.changeDrawerForm(false);
  };

  return (
    <Drawer
      title="Create a new layer"
      closable={false}
      maskClosable={true}
      bodyStyle={{ paddingBottom: 80 }}
      onClose={onClose}
      placement="right"
      open={open}
    >
      <QuakeForm />
    </Drawer>
  );
}
