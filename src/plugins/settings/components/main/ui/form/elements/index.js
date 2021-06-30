import Color from './Color';
import Icons from './Icons';
import EditableItem from './EditableItem';
import Format from './Format';
import Fallback from './Fallback';
import { Grid, Row, Column } from 'plugins/settings/components/shared/Layout';

const components = {
  color: { Component: Color, Layout: Row },
  icon: { Component: Icons, Layout: Grid },
  format: { Component: Format, Layout: Row },
  dimensions: { Component: EditableItem, Layout: Column },
  type: { Component: EditableItem, Layout: Column },
  general: { Component: EditableItem, Layout: Column },
  fallback: { Component: Fallback, Layout: Row },
};

export const getComponent = type => {
  if (components[type] !== undefined) return components[type];

  return components['fallback'];
};
