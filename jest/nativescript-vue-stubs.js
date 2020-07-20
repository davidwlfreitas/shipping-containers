import { config } from '@vue/test-utils';

const NSElements = [
  'ActionBar',
  'ActionItem',
  'FormattedString',
  'GridLayout',
  'HtmlView',
  'NavigationButton',
  'Page',
  'StackLayout',
  'TabView',
  'TabViewItem',
  'TextField',
  'DockLayout',
  'FlexboxLayout',
  'Fab',
  'WebView',
  'RadDataForm',
  'ScrollView',
  'RGridLayout',
  'RadSideDrawer',
  'Navigator',
  'RadListView',
];

NSElements.forEach((element) => {
  config.stubs[element] = true;
});
