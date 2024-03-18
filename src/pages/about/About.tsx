import React from 'react';
import { Card } from 'antd';
import './About.scss';

export function About(): JSX.Element {
  return (
    <>
      <Card title={<h1>About</h1>} bordered={false} className='ab'>
        <p>CAP is a web page that allows its users to filter from a vast history of earthquakes in the country El Salvador, made by students from the University:
          Universidad centroAmericana Jose Simeon Cañas also known as UCA in the faculty of engineering.
        </p>
      </Card>

      <Card title={<h1>The Team</h1>} bordered={false} className='ab'>
        <p>As mentioned above the team is formed by 3 students from the engineering faculty, especifically from the
          system engineering career. They are:
          <ul>
            <li>Yury Alejandro Rivera Quintanilla 00081816@uca.edu.sv  </li>
            <li>Carlos Roberto Ávila Hernández 00032420@uca.edu.sv   </li>
            <li>Francisco Orlando Rodriguez Chica  00060618@uca.edu.sv </li>
          </ul>
        </p>
      </Card>

      <Card title={<h1>Repository</h1>} bordered={false} className='ab'>
        <ul>
          <li><a href="https://github.com/ShulkMaster/cap">Backend Repository</a></li>
          <li><a href="https://github.com/ShulkMaster/cap-web">Frontend web Repository</a></li>
        </ul>
      </Card>
    </>
  )
}
