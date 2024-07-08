import React, { useState } from 'react';
import { Card, Typography, Layout, List } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import './About.scss';


const { Title, Paragraph } = Typography;
const { Content } = Layout;

export function About(): JSX.Element {
  const lastTeam = [
    'Yury Alejandro Rivera Quintanilla (00081816@uca.edu.sv)',
    'Carlos Roberto Ávila Hernández (00032420@uca.edu.sv)',
    'Francisco Orlando Rodriguez Chica (00060618@uca.edu.sv)',
  ];

  const newTeam = [
    'Carlos Roberto Ávila Hernández (00032420@uca.edu.sv)',
    'Kevin Bryan Hernandez Lopez (00057720@uca.edu.sv)',
    'Andres Emilio Puente Cruz (00287919@uca.edu.sv)',
    'Fernando Jose Galdamez Mendoza (00120520@uca.edu.sv)',
    'Jonathan Ariel Cabrera Galdamez (00003120@uca.edu.sv)',
  ];

  const repositories = [
    { name: 'Backend Repository', url: 'https://github.com/ShulkMaster/cap' },
    { name: 'Frontend Web Repository', url: 'https://github.com/ShulkMaster/cap-web' },
    { name: 'Proyecto ACA', url: 'https://github.com/CrAvila/Proyecto-ACA'},
  ];

  const resources = [
    { name: 'USGS Copyright and credits', url: 'https://www.usgs.gov/information-policies-and-instructions/copyrights-and-credits#:~:text=Important%20information%20related%20to%20copyrights,in%20the%20U.S.%20Public%20Domain' },
  ];

/* 
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  }; */

  return (
    <Layout className="about-layout">
      <Content className="about-content">
        <Card title={<Title level={2}>Resources</Title>} bordered={false} className="about-card">
          <Paragraph>
            Data and information created or produced by the USGS 
            is considered to be in the US public domain.
          </Paragraph>
          <List
            dataSource={resources}
            renderItem={(item) => (
              <List.Item>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </List.Item>
            )}
          />
        </Card>
        
        <Card title={<Title level={2}>Last Team</Title>} bordered={false} className="about-card">
          <List
            dataSource={lastTeam}
            renderItem={(item) => (
              <List.Item>
                <Paragraph>{item}</Paragraph>
              </List.Item>
            )}
          />
        </Card>

        <Card title={<Title level={2}>New Team</Title>} bordered={false} className="about-card">
          <List
            dataSource={newTeam}
            renderItem={(item) => (
              <List.Item>
                <Paragraph>{item}</Paragraph>
              </List.Item>
            )}
          />
        </Card>

        <Card title={<Title level={2}>Repository</Title>} bordered={false} className="about-card">
          <List
            dataSource={repositories}
            renderItem={(item) => (
              <List.Item>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <GithubOutlined style={{ marginRight: 8 }} />
                  {item.name}
                </a>
              </List.Item>
            )}
          />
        </Card>

        <Card title={<Title level={2}>About</Title>} bordered={false} className="about-card">
          <Paragraph>
            CAP is a web page that allows its users to filter from a vast history of earthquakes in
            the country El Salvador, made by students from the University: Universidad
            centroAmericana Jose Simeon Cañas also known as UCA in the faculty of engineering.
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
}
