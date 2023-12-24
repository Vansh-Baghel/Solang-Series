import { useEffect } from "react";

export default function changePartFunction({
  modulenumber,
  modulepart,
  totalParts,
  orderedLessions,
  allDocuments,
  idasfilename,
  setPrevText,
  setNextText,
}) {
  // Extracting the module number (module-1), and returning its last index.
  const totalLessonsInCurPart = orderedLessions.length;

  let prevPg;
  let nextPg;
  let curModuleNumber;
  let prevPgText;
  let nextPgText;
  let prevLessionOrPartText;
  let nextLessionOrPartText;
  let prevPartChar;

  prevLessionOrPartText = "Part";
  nextLessionOrPartText = "Part";

  const modulepartChar = modulepart?.split("-")[2];

  const curPartNum = modulepartChar.charCodeAt(0) - "a".charCodeAt(0);

  const curPartToChar = String.fromCharCode(97 + curPartNum);
  const prevPartToChar = String.fromCharCode(97 + curPartNum - 1);
  const nextPartToChar = String.fromCharCode(97 + curPartNum + 1);

  const getCurLessonNum = () => {
    // We are getting curLessonNum from its file name.
    const curLesson = orderedLessions.filter((lesson) => {
      return lesson.thisFileName === idasfilename;
    });

    return parseInt(curLesson[0].orderNumber);
  };

  const getCurModuleNum = () => {
    return parseInt(modulenumber?.split("-")[1], 10);
  };

  const getPrevJoinedModuleAndPart = (curModuleNumber, prevPartToChar) => {
    return `${curModuleNumber}${prevPartToChar}`;
  };

  const getNextJoinedModuleAndPart = (curModuleNumber, nextPartToChar) => {
    return `${curModuleNumber}${nextPartToChar}`;
  };

  curModuleNumber = getCurModuleNum();

  const curLessonNum = getCurLessonNum();

  prevPgText = getPrevJoinedModuleAndPart(curModuleNumber, prevPartToChar);
  nextPgText = getPrevJoinedModuleAndPart(curModuleNumber, nextPartToChar);

  // prevPg = `/CourseContent/${modulenumber}/${modulenumber}-${prevPartToChar}`;

  const all = allDocuments.map((lession) => {
    console.log(lession._raw.sourceFileName);
  });

  console.log(all);

  const curLessonIndex = allDocuments.findIndex((lession) => {
    return lession._raw.sourceFileName.replace(/\.mdx$/, "") === idasfilename;
  });

  // console.log(
  //   allDocuments[curLessonIndex]._raw.sourceFileName,
  //   "cur lesson name as per index "
  // );

  prevPg = `/CourseContent/${modulenumber}/${modulenumber}-${prevPartToChar}/`;
  nextPg = `/CourseContent/${modulenumber}/${modulenumber}-${nextPartToChar}`;

  const prevLessonName = allDocuments[
    curLessonIndex - 1
  ]._raw.sourceFileName.replace(/\.mdx$/, "");
  const nextLessonName = allDocuments[
    curLessonIndex + 1
  ]._raw.sourceFileName.replace(/\.mdx$/, "");

  // means 1st lesson
  if (curLessonNum === 0) {
    if (curPartNum === 0) {
      prevPg = null;
      nextPg = `/CourseContent/${modulenumber}/${modulenumber}-${curPartToChar}/${nextLessonName}`;
    }
  } else if (curLessonNum === totalLessonsInCurPart - 1) {
    if (curPartNum === totalParts - 1) {
      prevPg = `/CourseContent/${modulenumber}/${modulenumber}-${curPartToChar}/${prevLessonName}`;
      nextPg = null;
    }
  } else {
    prevLessionOrPartText = "Lesson";
    nextLessionOrPartText = "Lesson";
    prevPg = `/CourseContent/${modulenumber}/${modulenumber}-${curPartToChar}/${prevLessonName}`;
    nextPg = `/CourseContent/${modulenumber}/${modulenumber}-${curPartToChar}/${nextLessonName}`;
  }

  console.log(prevPartChar, " previous part char");

  console.log(modulepart, " Module part");

  console.log(totalParts, " total parts");
  console.log(totalLessonsInCurPart, " total lessons");

  console.log(curModuleNumber, " cur module num");
  console.log(curPartNum, " cur part num");
  console.log(curLessonNum, " cur lesson num");

  console.log(modulenumber, " module number");
  console.log(modulepart, " module part");

  console.log(prevPartToChar, " Previous part to char");
  console.log(nextPartToChar, " Next part to char");

  console.log(prevPgText);
  console.log(nextPgText);

  console.log(prevPg);
  console.log(nextPg);

  return [prevPg, nextPg, prevPgText, nextPgText, prevLessionOrPartText, nextLessionOrPartText];
}
