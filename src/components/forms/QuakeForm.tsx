import { useAppDispatch, useAppSelector } from 'hooks';
import { Col, Row, Slider, Typography } from 'antd';
import { scaleMarks, createMarks } from 'utils/slider';
import { Units } from 'utils/Unit';
import { QuakeFilter } from 'types/api/request';

const earthMaxRadiusKm = 6_378;

function mapToExponential(percent: number): number {
  const fixed = percent / 100;
  const reduced = fixed * (earthMaxRadiusKm / 1000);
  const scaled = Math.exp(0.15 * reduced) - 1;
  return scaled * 1000 + 30;
}

function formatToKm(percent: number): string {
  const mapped = Math.trunc(mapToExponential(percent));
  return `${mapped} Km`;
}

export function QuakeForm(): JSX.Element {
  const state = useAppSelector((s) => s.ui.quakeForm);
  const dispatch = useAppDispatch().ui;

  const { data, rangePercent } = state;
  const { depth, date, sort, magnitude } = data;
  const newMaxDepth = Math.trunc(mapToExponential(rangePercent));
  const depthMarks = createMarks({ min: 0, max: newMaxDepth }, Units.km, newMaxDepth / 5);
  const magnitudeMarks = createMarks({ min: 1, max: 10 }, Units.none, 1);

  const onChange = <K extends keyof QuakeFilter>(key: K, value: QuakeFilter[K]): void => {
    dispatch.changeQuakeFormValue({ key, value });
  };

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Typography.Text type="secondary">
          Most Earth quakes occur at depths of 30-50 km, set this slider Most earthquakes occur at
          depths of less than 70 km.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Typography.Title level={4} type="secondary">
          Scale {formatToKm(rangePercent)}
        </Typography.Title>
      </Col>
      <Col span={22} offset={1}>
        <Slider
          min={0}
          max={100}
          defaultValue={rangePercent}
          marks={scaleMarks}
          onAfterChange={dispatch.changeRadiusScale}
        />
      </Col>
      <Col span={24}>
        <Typography.Title level={4} type="secondary">
          Depth {depth.min} - {depth.max}
        </Typography.Title>
      </Col>
      <Col span={22} offset={1}>
        <Slider
          range
          min={0}
          max={newMaxDepth}
          marks={depthMarks}
          defaultValue={[depth.min, depth.max]}
          onAfterChange={(v: [number, number]): void => onChange('depth', { min: v[0], max: v[1] })}
        />
      </Col>
      <Col span={24}>
        <Typography.Title level={4} type="secondary">
          Magnitude {magnitude.min} - {magnitude.max}
        </Typography.Title>
      </Col>
      <Col span={22} offset={1}>
        <Slider
          range
          min={1}
          max={10}
          marks={magnitudeMarks}
          defaultValue={[1, 5]}
          onAfterChange={(v: [number, number]): void =>
            onChange('magnitude', { min: v[0], max: v[1] })
          }
        />
      </Col>
    </Row>
  );
}
