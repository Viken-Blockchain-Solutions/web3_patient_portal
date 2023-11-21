"use client";
import Image from "next/image";
import ShareYourInfo from "./ShareYourInfo";
import StartContributing from "./StartContributing";
import BasicExplanation from "./BasicExplanation";

export default function About() {

  return (
    <>
      <BasicExplanation />
      <ShareYourInfo />
      <StartContributing />
    </>
  );
}


