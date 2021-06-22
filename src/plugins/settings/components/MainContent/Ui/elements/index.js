import Color from './Color';
import Icons from './Icons';
import Format from './Format';
import Type from './Type';
import Fallback from './Fallback';
import Dimensions from './Dimensions';
import { Grid, Row, Column } from 'plugins/settings/components/Layout';
import { hasIn } from 'lodash';

const components = {
  color: { Component: Color, Layout: Row },
  icon: { Component: Icons, Layout: Grid },
  format: { Component: Format, Layout: Row },
  dimensions: { Component: Dimensions, Layout: Column },
  type: { Component: Type, Layout: Column },
  fallback: { Component: Fallback, Layout: Row },
};

export const getComponent = type => {
  if (!hasIn(components, type)) return components['fallback'];

  return components[type];
};
