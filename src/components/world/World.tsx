import Globe from 'react-globe.gl';
import { Quake } from 'types/api/responses';
import { useAppSelector } from 'hooks';
import * as Layer from 'utils/layer';
import React from 'react';
import * as THREE from 'three'

const { useEffect, useRef} = React;
import earth from 'assets/textures/8k_earth_daymap.jpg';

export function World(): JSX.Element {
  const globeEl = useRef();

  useEffect(() => {

    const globe = globeEl.current as unknown as any;

    const CLOUDS_IMG_URL = 'src/assets/textures/fair_clouds_4k.png'; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
  
    new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true})
      );
      globe.scene().add(clouds);
  
      (function rotateClouds() {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
  }, []);

  const layers = useAppSelector((s) => s.layers.quakeLayers);
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
  // Create the color scale


  return (
    <Globe
      ref={globeEl}
      animateIn={false}
      globeImageUrl={earth}
      pointsData={aggregated}
      pointLat={Layer.layerLat}
      pointLng={Layer.layerLng}
      pointAltitude={Layer.layerHeight}
      pointRadius={0.04}
      pointColor={(o: object): string => colorFunc(o, layersData)}
      pointLabel={(d: object): string => `
        <b>${(d as Quake).location}</b>
    `}
    />
  );
}
