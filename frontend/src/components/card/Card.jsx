import React from "react";
import { Card, Col, Row } from "antd";
const CardData = ({ el }) => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title={el?.title} bordered={false}>
        {el?.desc}
      </Card>
    </Col>
    <Col span={8}>
      <Card title={el?.title} bordered={false}>
        {el?.desc}
      </Card>
    </Col>
    <Col span={8}>
      <Card title={el?.title} bordered={false}>
        {el?.desc}
      </Card>
    </Col>
  </Row>
);
export default CardData;
