import { useAppDispatch, useAppSelector } from 'hooks';
import { Col, Form, Input, Slider, Typography, FormRule, Button, DatePicker } from 'antd';
import { scaleMarks, createMarks } from 'utils/slider';
import { Units } from 'utils/Unit';
import { QuakeFilter } from 'types/api/request';
import { ColorPicker } from '../colorPicker/ColorPicker';
import { useLayoutEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import './Form.scss';

type QuakeFormValues = {
  layerName: string;
};

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

const text = {
  layerName: 'Layer name',
  layerColor: 'Layer color'
};

const layerNameRules: FormRule[] = [
  {
    required: true,
    min: 3
  }
];

export function QuakeForm(): JSX.Element {
  const state = useAppSelector((s) => s.ui.quakeForm);
  const quakeLayer = useAppSelector((s) => s.layers.quakeLayers);
  const { ui, layers } = useAppDispatch();
  const [form] = useForm();
  const { data, rangePercent } = state;
  const { depth, magnitude, intensity } = data;
  const newMaxDepth = Math.trunc(mapToExponential(rangePercent));
  const depthMarks = createMarks({ min: 0, max: newMaxDepth }, Units.km, newMaxDepth / 5);
  const magnitudeMarks = createMarks({ min: 1, max: 10 }, Units.none, 1);
  const intensityMarks = createMarks({ min: 1, max: 10 }, Units.none, 1);

  const onChange = <K extends keyof QuakeFilter>(key: K, value: QuakeFilter[K]): void => {
    ui.changeQuakeFormValue({ key, value });
  };
  const onSubmit = (data: QuakeFormValues): void => {
    layers.loadLayer(data.layerName);
  };

  const onClose = (): void => {
    ui.changeDrawerForm(false);
  };

  const newName = `Layer ${Object.entries(quakeLayer).length}`;
  useLayoutEffect(() => {
    form.setFieldValue('layerName', newName);
  }, [newName]);

  return (
    <Form
      initialValues={{ layerName: newName }}
      requiredMark={false}
      onFinish={onSubmit}
      form={form}
      layout="vertical"
    >
      <div className="form-head">
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </div>
      <Form.Item name="layerName" label={text.layerName} rules={layerNameRules}>
        <Input placeholder={text.layerName} type="text" maxLength={40} />
      </Form.Item>
      <Form.Item label={text.layerColor}>
        <ColorPicker color="#fafafa" onChange={ui.changeLayerColor} />
      </Form.Item>
      <Col span={24}>
        <Typography.Title level={4} type="secondary">
          Dates
        </Typography.Title>
      </Col>
      <Col span={22} offset={1}>
        <DatePicker.RangePicker
          allowClear
          showTime={false}
          allowEmpty={[true, true]}
          onChange={(c): void => {
            if (!c) {
              onChange('date', { min: undefined, max: undefined });
              return;
            }
            const st = c?.[0]?.startOf('day')?.toISOString();
            const nd = c?.[1]?.endOf('day')?.toISOString();
            onChange('date', { min: st, max: nd });
          }}
        />
      </Col>
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
          onAfterChange={ui.changeRadiusScale}
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
      <Col span={24}>
        <Typography.Title level={4} type="secondary">
          Intensity {intensity.min} - {intensity.max}
        </Typography.Title>
      </Col>
      <Col span={22} offset={1}>
        <Slider
          range
          min={1}
          max={10}
          marks={intensityMarks}
          defaultValue={[1, 10]}
          onAfterChange={(v: [number, number]): void =>
            onChange('intensity', { min: v[0], max: v[1] })
          }
        />
      </Col>
    </Form>
  );
}
