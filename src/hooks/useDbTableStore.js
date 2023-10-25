import { projectAPI } from "../api/projectAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setType,
  setExp_req,
  setNationality,
  setLanguage,
  setItSkills,
} from "../store/dbTable/dbTableSlice";

export const useDbTableStore = () => {
  const dispatch = useDispatch();
  const { field, type, exp_req, nationality, language, itSkills } = useSelector(
    (state) => state.dbTable
  );

  const getField = async () => {
    try {
      const { data } = await projectAPI.get("/projetfields");
      dispatch(setField(data.response.flat()));
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  const getType = async () => {
    try {
      const { data } = await projectAPI.get("/projettype");
      dispatch(setType(data.response.flat()));
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  const getExp_req = async () => {
    try {
      const { data } = await projectAPI.get("/experiencelevel");
      dispatch(setExp_req(data.response.flat()));
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  const getNationality = async () => {
    try {
      const { data } = await projectAPI.get("/nationality");
      dispatch(setNationality(data.response.flat()));
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  const getLanguage = async () => {
    try {
      const { data } = await projectAPI.get("/language");
      dispatch(setLanguage(data.response.flat()));
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  const getItSkills = async () => {
    try {
      const { data } = await projectAPI.get("/itskills");
      dispatch(setItSkills(data.response.flat()));
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  return {
    //propiedades
    field,
    type,
    exp_req,
    nationality,
    language,
    itSkills,

    //metodos
    getField,
    getType,
    getExp_req,
    getNationality,
    getLanguage,
    getItSkills,
  };
};
