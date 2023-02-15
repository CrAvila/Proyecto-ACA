import { Typography } from 'antd';
import { useEffect, useState } from 'react';

export function Clock(): JSX.Element {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Typography.Text className="clock-control">{time.toLocaleTimeString()}</Typography.Text>;
}
