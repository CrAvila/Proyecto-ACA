import { Button, Result } from 'antd';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  private reload(): void {
    window.location.href = '/';
    const tspan = setTimeout(() => {
      window.location.reload();
      window.clearTimeout(tspan);
    }, 500);
  }

  render(): ReactNode {
    console.log(this.state);
    if (this.state.hasError) {
      console.log('p[uta');
      return (
        <Result
          status="500"
          title="App error"
          subTitle="Ups... something when wrong"
          extra={
            <Button type="primary" onClick={this.reload}>
              Reload
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}
