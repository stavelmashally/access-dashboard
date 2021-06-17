import Color from './Color';
import Icons from './Icons';
import Format from './Format';
import Type from './Type';
import Dimensions from './Dimensions';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Section, Row, Grid, Item, Code, Column } from '../../Layout';
import _ from 'lodash';

const components = {
  color: { component: Color, Layout: Row },
  icon: { component: Icons, Layout: Grid },
  format: { component: Format, Layout: Row },
  dimensions: { component: Dimensions, Layout: Column },
  type: { component: Type, Layout: Column },
};

const Tree = ({ type, values, component }) => {
  const renderTree = () => {
    if (!_.isPlainObject(values)) {
      return React.createElement(component, { value: values });
    }

    return Object.entries(values).map(([key, value]) => {
      if (_.isPlainObject(value)) {
        return (
          <>
            <Typography variant='h6'>{key}</Typography>
            <Section>
              <Tree type={type} values={value} component={component} />
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
    });
  };

  return <>{renderTree()}</>;
};

export const getComponent = ({ type, values }) => {
  if (!_.has(components, type)) {
    return <div>Fallback</div>;
  }
  const { component, Layout } = components[type];
  return (
    <Layout>
      <Tree type={type} values={values} component={component} />
    </Layout>
  );
};
