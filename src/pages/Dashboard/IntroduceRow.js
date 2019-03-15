import React, { memo, Fragment } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const Circle = ({fill}) => <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><ellipse ry="12" rx="12" cy="12" cx="12" fill={fill}/></svg>

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        avatar={<Circle fill={'#FEC352'}/>}
        title={<FormattedMessage id="app.analysis.coal" defaultMessage="Coal" />}
        action={<Fragment>45455<Trend flag="up">50%</Trend> </Fragment>}
        contentHeight={76}
      >
        <MiniArea line data={visitData} color={'#FEC35222'} borderWidth={1} borderColor={'#FEC352'}  />

      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        avatar={<Circle fill={'#556FDA'}/>}
        title={<FormattedMessage id="app.analysis.crude" defaultMessage="Crude Oil" />}
        action={<Fragment>45455<Trend flag="up">50%</Trend> </Fragment>}

        contentHeight={76}
      >
        <MiniArea line data={visitData} color={'#556FDA22'} borderWidth={1} borderColor={'#556FDA'}  />

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        avatar={<Circle fill={'#19BDA9'}/>}
        title={<FormattedMessage id="app.analysis.natgas" defaultMessage="Natural Gas" />}
        action={<Fragment>45455<Trend flag="up">50%</Trend> </Fragment>}

        contentHeight={76}
      >
        <MiniArea line data={visitData} color={'#19BDA922'} borderWidth={1} borderColor={'#19BDA9'}  />

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        avatar={<Circle fill={'#1E85C1'}/>}
        title={<FormattedMessage id="app.analysis.nuclear" borderWidth={1} defaultMessage="Nuclear" />}
        action={<Fragment>45455<Trend flag="up">50%</Trend> </Fragment>}

        contentHeight={76}
      >
        <MiniArea line  data={visitData} color={'#1E85C122'} borderColor={'#1E85C1'}/>

      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
