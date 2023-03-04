/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { annotate } from "rough-notation";
import Confetti from "react-confetti";
import { useForm } from "react-hook-form";
// import BurgerMenu from "../components/BurgerMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useWindowSize } from "react-use";


function Connection() {
  const { width, height } = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [displayConReg, setDisplayConReg] = useState(true);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const manageDisplay = () => {
    setDisplayConReg(!displayConReg);
  };

  const handleRegister = (data) => {
    axios
      .post(`http://localhost:5000/users/register`, data, {
        withCredentials: true,
      })
      .then(() => console.log(data), setPopup(!popup))
      .catch((error) => console.error(error));
  };

  const handleConnexion = (data) => {
    axios
      .post(`http://localhost:5000/users/login`, data, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        navigate("/home", { replace: true });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const e = document.querySelector(".colortextchange");
    const annotation = annotate(e, {
      type: "highlight",
      animationDuration: "1500",
    });
    annotation.show();
  }, []);

  return (
    <div className="homecontainer">
      {popup ? <Confetti width={width} height={height} /> : null}
      <div className="centralcard">
        <div className="leftside">
          <h1
            className="titlepresentation"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            Bienvenue sur <span className="colortextchange"> Unknow </span>
          </h1>
          {}
          <p
            className="textpresentation"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            La plateforme de management projet de{" "}
            <span className="colortextchange"> Apside </span>
          </p>

          <img
            data-aos="fade-right"
            data-aos-duration="1000"
            src={perso}
            alt="perso"
            className="imgperso"
          />
        </div>
        {displayConReg ? (
          <div
            className="rightside"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <img src={logo} alt="logo" className="logo" />

            <h1 className="title">Connexion</h1>

            <form
              className="formconnection"
              onSubmit={handleSubmit(handleConnexion)}
            >
              <input
                className="inputformlogin"
                placeholder="Email"
                autoComplete="off"
                {...register("email", { required: true })}
              />

              <input
                className="inputformlogin"
                placeholder="Password"
                type="password"
                autoComplete="off"
                {...register("password", { required: true })}
              />

              {errors.exampleRequired && <span>This field is required</span>}

              <button type="submit" className="submitbutton">
                Connexion
              </button>
            </form>

            <button
              type="button"
              className="register-button"
              onClick={manageDisplay}
            >
              <h2>S'enregistrer</h2>
            </button>
          </div>
        ) : (
          <div className="rightsideregister">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="title">S'enregistrer</h1>

            <form
              className="formregister"
              onSubmit={handleSubmit(handleRegister)}
            >
              <input
                className="inputformregister"
                placeholder="Email"
                autoComplete="off"
                {...register("email", { required: true })}
              />

              <input
                className="inputformregister"
                type="password"
                placeholder="Password"
                autoComplete="off"
                {...register("password", { required: true })}
              />
              <input
                className="inputformregister"
                placeholder="Firstname"
                autoComplete="off"
                {...register("firstname", { required: true })}
              />
              <input
                className="inputformregister"
                placeholder="Lastname"
                autoComplete="off"
                {...register("lastname", { required: true })}
              />
              <input
                className="inputformregister"
                placeholder="Status"
                autoComplete="off"
                {...register("status", { required: true })}
              />
              <input
                className="inputformregister"
                placeholder="Phone Number"
                autoComplete="off"
                {...register("phone_number", { required: true })}
              />
              <input
                className="inputformregister"
                placeholder="Github"
                autoComplete="off"
                {...register("github_address", { required: true })}
              />

              {errors.exampleRequired && <span>This field is required</span>}

              <button type="submit" className="submitbutton">
                S'enregistrer
              </button>
            </form>
            {popup ? (
              <div
                className="popup-container"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <h3>Enregistrement réussi !</h3>
                <h3>Vous pouvez vous connecter !</h3>
                <button
                  type="button"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  onClick={() => {
                    location.reload();
                    setPopup(!popup);
                    setDisplayConReg(!displayConReg);
                  }}
                >
                  <h4>Fermer</h4>
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Connection;
