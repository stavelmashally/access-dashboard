import Colors from './Colors';
import Icons from './Icons';
import Formats from './Formats';

export const icon = values => <Icons values={values} />;
export const color = values => <Colors values={values} />;
export const format = values => <Formats value={values} />;
