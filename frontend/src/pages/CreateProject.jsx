/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router-dom";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThird from "../components/StepThird";
import End from "../components/End";

function CreateProject() {
  const { register, handleSubmit, formState } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  const onSubmit = (data) => navigate("End");
  return (
    <div className="containerform">
      <div className="centralcardform">
        <div className="leftsideprojet">
          <h1 className="titlepresentation">
            Creation de votre <span className="colortextchange"> Projet </span>
          </h1>
          <p className="textpresentation">Tout les champs sont obligatoires.</p>
        </div>
        <div className="rightside">
          <form className="formProject" onSubmit={handleSubmit(onSubmit)}>
            <div className="containerstep">
              <Routes>
                <Route
                  path="/"
                  element={
                    <StepOne register={register} formState={formState} />
                  }
                />
                <Route
                  path="StepTwo"
                  element={
                    <StepTwo register={register} formState={formState} />
                  }
                />
                <Route
                  path="StepThird"
                  element={
                    <StepThird register={register} formState={formState} />
                  }
                />
                <Route path="End" element={<End />} />
              </Routes>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
