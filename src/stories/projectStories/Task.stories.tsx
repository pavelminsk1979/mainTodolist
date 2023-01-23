import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../../Task";
import {TaskStatuses} from "../../api/api";

export default {
    title: 'Project/Task',
    component:Task ,
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStory = Template.bind({});


TaskStory.args = {
    task:{id:'1', title:'Mного дел',status:TaskStatuses.Complete, todoListId:'todolist2',description:'',startDate:'',deadline:'',
        addedDate:'',order:0, priority:1},
    deleteTask: action ('deleteTask'),
        changeTitleTask: action ('DobleClick'),
    changeChekboxTask: action ('onClick'),
};

