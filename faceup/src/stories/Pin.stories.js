import React from 'react';

import Pin from '../components/Pin';


export default {
  title: 'Example/Pin',
  component: Pin,
};

const Template = (args) => <Pin {...args} />;

export const Right = Template.bind({});
Right.args = {
  location: 'right',
};

export const Left = Template.bind({});
Left.args = {
  location: 'left',
};