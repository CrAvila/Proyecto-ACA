import React, { useState } from 'react';
import './About.scss';
import { Card, Typography, Layout } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export function About(): JSX.Element {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Layout className="about-layout">
      <Content className="about-content">
        <Card title={<Title level={2}>About</Title>} bordered={false} className="about-card">
          <Paragraph>
            CAP is a web page that allows its users to filter from a vast history of earthquakes in
            the country El Salvador, made by students from the University: Universidad
            centroAmericana Jose Simeon Cañas also known as UCA in the faculty of engineering.
          </Paragraph>
        </Card>

        <Card
          title={<Title level={2}>The Team</Title>}
          bordered={false}
          className={`about-card flip-card ${flipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <Card.Grid className="flip-card-front">
            <Paragraph>
              As mentioned above the <b>LAST TEAM</b> is formed by 3 students from the engineering faculty,
              especifically from the system engineering career. They are:
              <ul>
                <li>Yury Alejandro Rivera Quintanilla 00081816@uca.edu.sv </li>
                <li>Carlos Roberto Ávila Hernández 00032420@uca.edu.sv </li>
                <li>Francisco Orlando Rodriguez Chica 00060618@uca.edu.sv </li>
              </ul>
            </Paragraph>
          </Card.Grid>
          <Card.Grid className="flip-card-back">
            <Paragraph>
              An the <b>new team</b> is formed by 5 students from the engineering faculty in the system
              engineering career. They are:
              <ul>
                <li>Carlos Roberto Ávila Hernández 00032420@uca.edu.sv </li>
                <li>Kevin Bryan Hernandez Lopez 00057720@uca.edu.sv </li>
                <li>Andres Emilio Puente Cruz 00287919@uca.edu.sv </li>
                <li>Fernando Jose Galdamez Mendoza 00120520@uca.edu.sv </li>
                <li>Jonathan Ariel Cabrera Galdamez 00003120@uca.edu.sv </li>
              </ul>
            </Paragraph>
          </Card.Grid>
        </Card>

        <Card title={<Title level={2}>Repository</Title>} bordered={false} className="about-card">
          <Paragraph>
            The project is divided into two repositories, one for the backend and another for the
            frontend.
            <ul>
              <li>
                <a href="https://github.com/ShulkMaster/cap">Backend Repository</a>
              </li>
              <li>
                <a href="https://github.com/ShulkMaster/cap-web">Frontend web Repository</a>
              </li>
            </ul>
            And the new repository is:
            <ul>
              <li>
                <a href="https://github.com/CrAvila/Proyecto-ACA">Project A.C.A Repository</a>
              </li>
            </ul>
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
}
