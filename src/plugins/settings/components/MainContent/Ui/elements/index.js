import Color from './Color';
import Icons from './Icons';
import Format from './Format';
import Type from './Type';
import Dimensions from './Dimensions';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Section, Row, Grid, Item, Code, Column } from '../../../Layout';
import _ from 'lodash';

const components = {
  color: { Component: Color, Layout: Row },
  icon: { Component: Icons, Layout: Grid },
  format: { Component: Format, Layout: Row },
  dimensions: { Component: Dimensions, Layout: Column },
  type: { Component: Type, Layout: Column },
};

const Tree = ({ values, component }) => {
  if (!_.isPlainObject(values)) {
    return React.createElement(component, { value: values });
  }

  return (
    <>
      {Object.entries(values).map(([key, value]) => {
        if (_.isPlainObject(value)) {
          return (
            <>
              <Typography variant='h6'>{key}</Typography>
              <Section>
                <Tree values={value} component={component} />
              </Section>
            </>
          );
        }

        if (_.isArray(value)) {
          return (
            <Item>
              <Typography variant='subtitle1'>{key}:</Typography>
              <Code>{value.join(', ')}</Code>
            </Item>
          );
        }

        return React.createElement(component, { text: key, value });
      })}
    </>
  );
};

export const renderContent = ({ type, values }) => {
  if (!_.has(components, type)) {
    return <div>Fallback</div>;
  }
  const { Component, Layout } = components[type];
  return (
    <Layout>
      <Tree values={values} component={Component} />
    </Layout>
  );
};
