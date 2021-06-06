// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mode: {
    offline: false,
    mockUrl: 'http://localhost:5588/mocking_g/generate',
    hasLoginBypass: false,
    hideRightPanel: true,
    skeleton: false,
    sso: process.env.NODE_ENV !== 'development',
  },
  dynamicTypes: {
    active: true,
    entities: [
      'email',
      'binainsight',
      'binanews',
      'file',
      'case',
      'kickentity',
    ],
  },
  fontFamily: {
    'he-IL': 'Seoge UI, sans-serif',
    default: 'Roboto, sans-serif',
  },
};
