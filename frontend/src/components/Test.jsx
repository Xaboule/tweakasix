import axios from "axios";
import React, { useEffect, useState } from "react";

function Testus({ keyWordlist, setKeyWordlist, paramFilter }) {
  const [GlobalDescriptionList, setGlobalDescriptionList] = useState([]);
  const [GlobalKeyWordList, setGlobalKeyWordList] = useState([]);

  let interArr = []


  useEffect(() => {
    if (GlobalDescriptionList !== []) {
      axios
        .get(`http://localhost:5000/projectsDescription`)
        .then((res) => {
          setGlobalDescriptionList(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    GlobalDescriptionList.forEach((Description) => {
      Description.description
        .split(" ")
        .map((word) => {
          let output = word;
          if (word[word.length - 1] === "," || word[word.length - 1] === ".") {
            output = word
              .split("")
              .slice(0, word.length - 1)
              .join("");
          }
          interArr.push(output)
          return output.toLowerCase();
        })
        interArr.filter((word) => word.length > 5 && !GlobalKeyWordList.includes(word))
        .forEach((Word) => {
          setGlobalKeyWordList([...GlobalKeyWordList, Word]);
        });
    });
  }, [interArr]);
console.log(interArr)
  const deletekeyWordlist = (keyWord) => {
    const index = keyWordlist.indexOf(keyWord);
    setKeyWordlist([
      ...keyWordlist.slice(0, index),
      ...keyWordlist.slice(index + 1),
    ]);
  };

  return (
    <div className="containerresult">
      {paramFilter !== null ? (
        <div className="key-word-list">
          {GlobalKeyWordList.filter((keyWord) =>
            keyWord.toLowerCase().includes(paramFilter.toLowerCase())
          )
            .slice(0, 5)
            .map((word) => (
              <button
                className="key-word-item"
                type="button"
                onClick={() => setKeyWordlist([...keyWordlist, word])}
              >
                {word}
              </button>
            ))}
        </div>
      ) : null}

      <div className="key-word-filter-list">
        {keyWordlist !== ""
          ? keyWordlist.map((keyWord) => (
              <button
                type="button"
                className="key-word-filter-item"
                onClick={() => {
                  deletekeyWordlist(keyWord);
                }}
              >
                {`${keyWord}`}{" "}
   <img src="https://www.printworksmarket.com/thumb/2855/512x0/PW00437--small-things-rusty-pink.jpg" alt="Cross logo" />
              </button>
            ))
          : null}
      </div>
    </div>
  );
}

export default Testus;
