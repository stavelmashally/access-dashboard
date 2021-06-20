import Color from './Color';
import Icons from './Icons';
import Format from './Format';
import Type from './Type';
import Dimensions from './Dimensions';
import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import {
  Grid,
  Row,
  Column,
  Item,
  Code,
} from 'plugins/settings/components/Layout';
import styled from 'styled-components';
import _ from 'lodash';

const components = {
  color: { Component: Color, Layout: Row },
  icon: { Component: Icons, Layout: Grid },
  format: { Component: Format, Layout: Row },
  dimensions: { Component: Dimensions, Layout: Column },
  type: { Component: Type, Layout: Column },
};

const RecursiveTree = ({ data, component }) => {
  if (!_.isPlainObject(data)) {
    return React.createElement(component, { value: data });
  }

  const renderTree = nodes => {
    return Object.entries(nodes).map(([key, value]) => {
      // Each object begins a new section
      if (_.isPlainObject(value)) {
        return (
          <React.Fragment key={key}>
            <Typography variant='h6'>{key}</Typography>
            <Divider />
            <InnerSection>{renderTree(value)}</InnerSection>
          </React.Fragment>
        );
      }

      if (Array.isArray(value)) {
        return (
          <Item key={key}>
            <Typography variant='subtitle1'>{key}:</Typography>
            <Code>{value.join(', ')}</Code>
          </Item>
        );
      }

      return React.createElement(component, { text: key, value, key });
    });
  };

  return <>{renderTree(data)}</>;
};

export const renderContent = ({ type, data }) => {
  if (!_.has(components, type)) {
    return <div>The component {type} has not been created yet</div>;
  }

  const { Component, Layout } = components[type];

  return (
    <Layout>
      <RecursiveTree data={data} component={Component} />
    </Layout>
  );
};

export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
