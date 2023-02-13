import { useAppDispatch, useAppSelector } from 'hooks';
import { Button, Col, Form, InputNumber, Row, Slider, Typography } from 'antd';
import { QuakeFormState } from 'types/state';

const earthMaxRadiusKm = 6_378;

function mapToExponential(percent: number): number {
  const fixed = percent / 100;
  const reduced = fixed * (earthMaxRadiusKm / 1000);
  console.log({ reduced });
  const scaled = Math.exp(0.15 * reduced) - 1;
  console.log({ scaled });
  return scaled * 1000 + 30;
}

function formatToKm(percent: number): string {
  const mapped = Math.trunc(mapToExponential(percent));
  return `${mapped} Km`;
}

const marks: Record<number, string> = {
  0: '30 Km',
  20: '205 Km',
  50: '674 Km',
  75: '1000 Km',
  100: '1600'
};

export function QuakeForm(): JSX.Element {
  const state = useAppSelector((s) => s.ui.quakeForm);
  const dispatch = useAppDispatch().ui;
  const [form] = Form.useForm<QuakeFormState>();

  const { data, rangePercent } = state;
  const newMaxDepth = Math.trunc(mapToExponential(rangePercent));
  const onchange = <T extends keyof QuakeFormState>(key: T, value: QuakeFormState[T]): void => {
    dispatch.changeQuakeFormValue({
      key,
      value
    });
  };

  const submit = (values: QuakeFormState): void => {
    console.log(values);
  };

  return (
    <Form layout="vertical" requiredMark={false} initialValues={data} form={form} onFinish={submit}>
      <Typography.Text type="secondary">
        Most Earth quakes occur at depths of 30-50 km, set this slider Most earthquakes occur at
        depths of less than 70 km.
      </Typography.Text>
      <Typography.Title level={4} type="secondary">
        Scale {formatToKm(rangePercent)}
      </Typography.Title>
      <Row gutter={16}>
        <Col span={20} offset={1}>
          <Slider
            min={0}
            max={100}
            tooltip={{ open: false }}
            defaultValue={rangePercent}
            marks={marks}
            onAfterChange={dispatch.changeRadiusScale}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Minimum depth" name="depthMin">
            <InputNumber min={1} max={newMaxDepth} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Maximum depth" name="deptMax">
            <InputNumber min={1} max={newMaxDepth} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Minimum magnitude" name="magnitudeMin">
            <InputNumber min={1} max={10} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Maximum magnitude" name="magnitudeMax">
            <InputNumber min={1} max={10} step={0.1} />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}
