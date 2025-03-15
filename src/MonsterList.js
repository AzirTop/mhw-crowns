import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

const initialMonsters = [
  ["Chatacabra", false, false, false, false],
  ["Quematrice", false, false, false, false],
  ["Lala Barina", false, false, false, false],
  ["Congalala", false, false, false, false],
  ["Balahara", false, false, false, false],
  ["Doshaguma", false, false, false, false],
  ["Uth Duna", false, false, false, false],
  ["Rompopolo", false, false, false, false],
  ["Rey Dau", false, false, false, false],
  ["Nerscylla", false, false, false, false],
  ["Hirabami", false, false, false, false],
  ["Ajarakan", false, false, false, false],
  ["Nu Udra", false, false, false, false],
  ["Guardian Doshaguma", false, false, false, false],
  ["Guardian Rathalos", false, false, false, false],
  ["Guardian Ebony Odogaron", false, false, false, false],
  ["Xu Wu", false, false, false, false],
  ["Yian Kut-Ku", false, false, false, false],
  ["Gypceros", false, false, false, false],
  ["Rathian", false, false, false, false],
  ["Guardian Fulgur Anjanath", false, false, false, false],
  ["Rathalos", false, false, false, false],
  ["Gravios", false, false, false, false],
  ["Blangonga", false, false, false, false],
  ["Gore Magala", false, false, false, false],
  ["Arkveld", false, false, false, false]
];

const MonsterList = () => {
  const [monsters, setMonsters] = useState(() => {
    const storedMonsters = Cookies.get("monsters");
    if (storedMonsters) {
      const parsedMonsters = JSON.parse(storedMonsters);
      return initialMonsters.map(monster => {
        const storedMonster = parsedMonsters.find(m => m[0] === monster[0]);
        return storedMonster ? [monster[0], ...storedMonster.slice(1)] : monster;
      });
    }
    return initialMonsters;
  });

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    Cookies.set("monsters", JSON.stringify(monsters), { expires: 7 });

    if (monsters.every(monster => monster[1] && monster[2])) {
      setShowAnimation(true);
    }
  }, [monsters]);

  const toggleMonsterState = (index, actionIndex) => {
    const newMonsters = monsters.map((monster, i) => 
      i === index ? [...monster.slice(0, actionIndex), !monster[actionIndex], ...monster.slice(actionIndex + 1)] : monster
    );
    setMonsters(newMonsters);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap justify-start gap-2 p-2 w-full">
        {monsters.map((monster, index) => (
          <div key={index} className="bg-gray-800 text-white p-4 rounded-xl shadow-lg text-center w-48">
            <div className="flex justify-center">
              <img 
                src={`/images/${monster[0].replace(/ /g, "_")}.jpg`} 
                alt={monster[0]} 
                title={monster[0]} 
                className="aspect-square h-24 object-cover rounded-lg mb-2"
              />
            </div>
            <div className="flex justify-center gap-2 mb-1">
              {[1, 2].map(actionIndex => (
                <button
                  key={actionIndex}
                  className="px-2 py-1 rounded-lg relative"
                  onClick={() => toggleMonsterState(index, actionIndex)}
                >
                  <img 
                    src={`./icons/crown${actionIndex}.jpg`} 
                    alt={`crown ${actionIndex}`} 
                    className={`w-5 h-5 ${monster[actionIndex] ? "" : "grayscale opacity-50 line-through"}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {[3, 4].map(actionIndex => (
                <button
                  key={actionIndex}
                  className="px-2 py-1 rounded-lg relative"
                  onClick={() => toggleMonsterState(index, actionIndex)}
                >
                  <img 
                    src={`./icons/crown${actionIndex}.jpg`} 
                    alt={`crown ${actionIndex}`} 
                    className={`w-5 h-5 ${monster[actionIndex] ? "" : "grayscale opacity-50 line-through"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterList;
