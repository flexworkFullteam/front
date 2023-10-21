import { createSlice } from "@reduxjs/toolkit";
import projectData from "../../utils/project.json";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [], //[], projectData
    allProjects: [], //[], projectData
    activeEvent: null,
    isLoadingProjects: false,
  },
  reducers: {
    onLoadingProjects: (state) => {
      state.isLoadingProjects = true;
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onClearActiveEvent: (state) => {
      state.activeEvent = null;
    },
    onGetAllProjects: (state, { payload }) => {
      state.projects = payload;
      state.allProjects = payload;
      state.isLoadingProjects = false;
      state.activeEvent = null;
    },
    onAddProject: (state, { payload }) => {
      state.allProjects.push(payload);
    },
    onUpdateProject: (state, { payload }) => {
      state.projects = state.projects.map((project) =>
        project._id === payload._id ? payload : project
      );
    },
    onDeleteProject: (state, { payload }) => {
      state.projects = state.projects.filter(
        (project) => project._id !== payload
      );
    },
    onFilterProjectsByField: (state, { payload }) => {
      state.projects = state.projects.filter((project) =>
        project.field.includes(payload.toLowerCase())
      );
    },
    onFilterProjectsByExp: (state, { payload }) => {
      state.projects = state.projects.filter((project) =>
        project.exp_req.includes(payload.toLowerCase())
      );
    },
    onFilterProjectsByType: (state, { payload }) => {
      state.projects = state.projects.filter((project) =>
        project.project_type.includes(payload.toLowerCase())
      );
    },
    onFilterProjectsByTerm: (state, { payload }) => {
      state.projects = state.projects.filter((project) =>
        project.title.includes(payload)
      );
    },
    onOrderProjectsByLapse: (state, { payload }) => {
      if (payload === "asc") {
        state.projects = state.projects.sort((a, b) => a.lapse - b.lapse);
      } else if (payload === "desc") {
        state.projects = state.projects.sort((a, b) => b.lapse - a.lapse);
      } else {
        state.projects = state.projects;
      }
    },
    onOrderProjectsBySalary: (state, { payload }) => {
      if (payload === "asc") {
        state.projects = state.projects.sort((a, b) => a.salary - b.salary);
      } else if (payload === "desc") {
        state.projects = state.projects.sort((a, b) => b.salary - a.salary);
      } else {
        state.projects = state.projects;
      }
    },
    onDeleteFilters: (state) => {
      state.projects = state.allProjects;
    },
  },
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
  onOrderProjectsByLapse,
  onOrderProjectsBySalary,
  onDeleteFilters,
  onFilterProjectsByField,
  onFilterProjectsByExp,
  onFilterProjectsByType,
  onFilterProjectsByTerm,
} = projectSlice.actions;
