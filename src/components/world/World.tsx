import Globe, { GlobeMethods } from 'react-globe.gl';
import { Quake } from 'types/api/responses';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as Layer from 'utils/layer';
import { useRef } from 'react';
import * as THREE from 'three';
import earth from 'assets/textures/8k_earth_daymap.jpg';
import clouds from 'assets/textures/fair_clouds_4k.png';

const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
const CLOUDS_ALT = 0.004;
export function World(): JSX.Element {
  const globeEl = useRef<GlobeMethods>();
  const layers = useAppSelector((s) => s.layers.quakeLayers);
  const dispatch = useAppDispatch();
  const aggregated: Quake[] = [];
  const layerStops: number[] = [];
  for (const layer of Object.values(layers)) {
    if (!layer.visible) {
      continue;
    }
    const index = aggregated.push(...layer.data);
    layerStops.push(index);
  }

  const layersData = Object.values(layers).filter((l) => l.visible);
  const colorFunc = Layer.getLayerColorFunc(aggregated, layerStops);

  const onGlobeReady = (): void => {
    const globe = globeEl.current;
    if (!globe) {
      return;
    }

    new THREE.TextureLoader().load(clouds, cloudsTexture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
  };

  return (
    <Globe
      ref={globeEl}
      animateIn={true}
      onGlobeReady={onGlobeReady}
      globeImageUrl={earth}
      pointsData={aggregated}
      pointLat={Layer.layerLat}
      onPointClick={(b: object): void => {
        dispatch.ui.setQuake(b as Quake);
      }}
      pointLng={Layer.layerLng}
      pointAltitude={Layer.layerHeight}
      pointRadius={0.04}
      pointColor={(o: object): string => colorFunc(o, layersData)}
      pointLabel={(d: object): string => `
        <b>${(d as Quake).properties.place}</b>
    `}
    />
  );
}
