import Colors from './Colors';
import Icons from './Icons';

const getColors = values => {
  return <Colors values={values} />;
};

const getIcons = values => {
  return <Icons values={values} />;
};

export const color = getColors;
export const icon = getIcons;
