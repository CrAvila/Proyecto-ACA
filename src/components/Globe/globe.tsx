
import Globe from 'react-globe.gl';
import React from 'react'
import colorbrewer from 'colorbrewer'

const { useState, useEffect } = React;


export function World(props: any){
  const [equakes, setEquakes] = useState<any[]>([]);

  useEffect(() => {
    // load data
    fetch('//earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson').then(res => res.json())
      .then(({ features }) => setEquakes(features));
  }, []);

  const A = 0;
    const B = 100;

    // Create the color scale

    // Define a function that takes a number and returns the corresponding hex color
    const getColor = colorbrewer.Reds;
    console.log(getColor);
    

    // Example usage:


  return (
  <Globe
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

    hexBinPointsData={equakes}
    hexBinPointLat={(d:any) => d.geometry.coordinates[1]}
    hexBinPointLng={(d:any) => d.geometry.coordinates[0]}
    hexBinPointWeight={(d:any) => d.properties.mag}
    hexAltitude={({ sumWeight }) => sumWeight * 0.0025}
    hexTopColor={(d:any) => getColor[3][0]}
    hexSideColor={(d:any) => getColor[4][0]}
      hexLabel={(d:any) => `
        <b>${d.points.length}</b> earthquakes in the past month:<ul><li>
          ${d.points.slice().sort((a: { properties: { mag: number; }; }, b: { properties: { mag: number; }; }) => b.properties.mag - a.properties.mag).map((d: { properties: { title: any; }; }) => d.properties.title).join('</li><li>')}
        </li></ul>
    `}
  />)
  ;
};