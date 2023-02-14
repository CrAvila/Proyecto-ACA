import { World, ControlBar, DrawerForm } from 'components';

export function Home(): JSX.Element {
  return (
    <div style={{ position: 'relative' }}>
      <ControlBar />
      <World />
      <DrawerForm />
    </div>
  );
}
