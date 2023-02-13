import { Layout } from 'antd';
import logo from 'assets/react.svg';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'components';
import 'antd/dist/reset.css';
import './App.scss';
import styled from "styled-components"
import { Canvas } from '@react-three/fiber';
import { Suspense } from "react";
import { Earth } from 'components/earth/earth';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;


export function App(): JSX.Element {
  return (
    <CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
}
