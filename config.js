module.exports = {
  platform: 'gitlab',
  endpoint: 'https://epos-ci.brgm.fr/api/v4/',
  token: 'glpat-KqB75viEzM8Jo4L7_ukV',
  repositories: ['epos/epos-backoffice-gui'],
  requireConfig: 'required',
  onboarding: true,
  onboardingConfig: {
    extends: ['config:recommended'],
  },
  enabledManagers: ['npm'],
};
