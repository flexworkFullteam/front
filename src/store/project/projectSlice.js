    import { createSlice } from '@reduxjs/toolkit';
    import projectData from '../../utils/project.json';

    export const projectSlice = createSlice({
       name: 'project',
       initialState: {
           projects: projectData, //[],
           allProjects: projectData, //[],
           activeEvent: null,
           isLoadingProjects: false,
        },
       reducers: {
            onLoadingProjects: (state) => {
                state.isLoadingProjects = true;
            },
            onSetActiveEvent: (state, {payload}) => {
                state.activeEvent = payload;
            },
            onClearActiveEvent: (state) => {
                state.activeEvent = null;
            },
            onGetAllProjects: (state, {payload}) => {
                state.projects = payload;
                state.allProjects = payload;
                state.isLoadingProjects = false;
                state.activeEvent = null;
            },
            onAddProject: (state, {payload}) => {
                state.allProjects.push(payload);
            },
            onUpdateProject: (state, {payload}) => {
                state.projects = state.projects.map(project => project._id === payload._id ? payload : project);
            },
            onDeleteProject: (state, {payload}) => {
                state.projects = state.projects.filter(project => project._id !== payload);
            },
            onFilterProjects: (state, {payload}) => {
                state.projects = state.allProjects.filter(project => project.name.toLowerCase().includes(payload.toLowerCase()));
            },

        }
    });


    // Action creators are generated for each case reducer function
    export const {
        onLoadingProjects,
        onSetActiveEvent,
        onClearActiveEvent,
        onGetAllProjects,
        onAddProject,
        onUpdateProject,
        onDeleteProject,
        onFilterProjects,
        
    } = projectSlice.actions;