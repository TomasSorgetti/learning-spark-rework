"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { subjects } from "@/data/subjects";

export default function ResoursesDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSubject, setActiveSubject] = useState({
    id: 1,
    name: "Mathematics",
    list: [
      {
        id: 1,
        name: "Math AA",
      },
      {
        id: 2,
        name: "Math AB",
      },
      {
        id: 3,
        name: "Math AC",
      },
      {
        id: 4,
        name: "Math AD",
      },
    ],
  });
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setShowMenu(false);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useClickOutside(dropdownRef, closeDropdown);

  const changeActiveSubject = (subject) => {
    if (subject.comingSoon) return;

    setActiveSubject(subject);
  };

  return (
    <div ref={dropdownRef} className="">
      <button onClick={toggleMenu}>Resourses</button>
      <div
        className={`absolute top-16 right-0 ${
          showMenu ? "block" : "hidden"
        } bg-white rounded-[8px] shadow-md p-6 z-10 flex items-start gap-24 w-[1280px]`}
      >
        <ul className="flex flex-col gap-4 overflow-y-scroll overflow-x-hidden w-[240px] h-[300px]">
          {subjects?.map((subject) => (
            <li key={subject.id}>
              <button
                onClick={() => changeActiveSubject(subject)}
                className={`${subject?.comingSoon ? "opacity-50" : ""}`}
              >
                {subject.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-8 ">
          {activeSubject?.list?.map((subject) => (
            <div key={subject.id} className="flex flex-col gap-4 w-[200px]">
              <a href="" className="font-bold">
                {subject.name}
              </a>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="">QuestionBank</a>
                </li>
                <li>
                  <a href="">Past Pappers</a>
                </li>
                <li>
                  <a href="">Practice Exams</a>
                </li>
                <li>
                  <a href="">Key Concepts</a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
