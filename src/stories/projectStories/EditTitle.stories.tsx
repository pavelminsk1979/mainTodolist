import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditTitle} from "../../EditTitle";

export default {
    title: 'Project/EditTitle',
    component:EditTitle ,
} as ComponentMeta<typeof EditTitle>;


const Template: ComponentStory<typeof EditTitle> = (args) => <EditTitle {...args} />;

export const EditTitleStory = Template.bind({});


EditTitleStory.args = {
    title:'String',
    callback : action('new Title')
};

