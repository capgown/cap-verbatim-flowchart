import Head from "next/head";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUndoAlt } from "@fortawesome/free-solid-svg-icons";

const stepTypes = {
  QUESTION: "question",
  YES: "yes",
  NO: "no",
};

const stepIDs = {
  SAID_BY_MEMBER: "SAID_BY_MEMBER",
  ASKED_TO_VERBATIM: "ASKED_TO_VERBATIM",
  FUNNY_OUTSIDE: "FUNNY_OUTSIDE",
  HAVE_YOU_CHECKED: "HAVE_YOU_CHECKED",
  GIVE_UP: "GIVE_UP",
  GO_AHEAD: "GO_AHEAD",
  NO_PLACE: "NO_PLACE",
  SHAME_THEM: "SHAME_THEM",
  SIT_SOMEWHERE_ELSE: "SIT_SOMEWHERE_ELSE",
  TRY_NEXT_TIME: "TRY_NEXT_TIME",
  ADMIT_DEFEAT: "ADMIT_DEFEAT",
};

const steps = {
  SAID_BY_MEMBER: {
    text: "Was it said by a Cap member?",
    type: stepTypes.QUESTION,
    options: [
      { text: "Yes", nextStep: stepIDs.ASKED_TO_VERBATIM },
      { text: "No", nextStep: stepIDs.NO_PLACE },
    ],
  },
  ASKED_TO_VERBATIM: {
    text: "Did they ask you to verbatim it?",
    type: stepTypes.QUESTION,
    options: [
      { text: "Yes", nextStep: stepIDs.SHAME_THEM },
      {
        text: "No, this was my (a humble bystander's) idea.",
        nextStep: stepIDs.FUNNY_OUTSIDE,
      },
    ],
  },
  FUNNY_OUTSIDE: {
    text: "Will this be funny outside of the friend group (read: clique) it was undoubtedly said within?",
    type: stepTypes.QUESTION,
    options: [
      {
        text: 'Yes, it isn\'t an inside joke or "lol classic [insert name here]"',
        nextStep: stepIDs.HAVE_YOU_CHECKED,
      },
      { text: "No", nextStep: stepIDs.SIT_SOMEWHERE_ELSE },
    ],
  },
  HAVE_YOU_CHECKED: {
    text: "Are you sure? Have you checked with literally anyone else?",
    type: stepTypes.QUESTION,
    options: [
      { text: "I'm positive. I have perspective.", nextStep: stepIDs.GIVE_UP },
      { text: "No", nextStep: stepIDs.TRY_NEXT_TIME },
    ],
  },
  GIVE_UP: {
    text: 'Did this chart at any point make you think "ahh idk if it\'s worth it to keep going" or otherwise cause doubt?',
    type: stepTypes.QUESTION,
    options: [
      { text: "No, I'm confident.", nextStep: stepIDs.GO_AHEAD },
      { text: "Yes", nextStep: stepIDs.ADMIT_DEFEAT },
    ],
  },
  GO_AHEAD: {
    text: "Go ahead, but realize that by submitting this verbatim, you're subject to shame if by this point in the flow chart it's still bad.",
    type: stepTypes.YES,
    options: [],
  },
  NO_PLACE: {
    text: "They have no place in the verbatims. Don't verbatim.",
    type: stepTypes.NO,
    options: [],
  },
  SHAME_THEM: {
    id: "shame_them",
    text: "Shame them publicly and don't verbatim.",
    type: stepTypes.NO,
    options: [],
  },
  SIT_SOMEWHERE_ELSE: {
    text: "Don't verbatim, and sit somewhere else for a change.",
    type: stepTypes.NO,
    options: [],
  },
  TRY_NEXT_TIME: {
    text: "Try that next time. For now, don't verbatim.",
    type: stepTypes.NO,
    options: [],
  },
  ADMIT_DEFEAT: {
    text: "It's okay to admit defeat. Don't verbatim.",
    type: stepTypes.NO,
    options: [],
  },
};

export default function Home() {
  const [stepList, setStepList] = useState([stepIDs.SAID_BY_MEMBER]);

  const StepContent = ({ stepList, setStepList }) => {
    const currentStep = steps[stepList[0]];

    const BackButton = () => {
      if (stepList.length <= 1) return null;
      return (
        <button
          className="w-6 mt-4 transition-colors hover:text-red-100"
          onClick={() => {
            setStepList(stepList.slice(1));
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
          </div>
        </button>
      );
    };

    if (currentStep.type !== stepTypes.QUESTION) {
      return (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-4xl font-bold">{currentStep.text}</p>
          <div className="flex flex-row justify-between w-16">
            <BackButton />
            <button
              className="w-6 mt-4 transition-colors hover:text-red-100"
              onClick={() => {
                setStepList([stepIDs.SAID_BY_MEMBER]);
              }}
            >
              <div>
                <FontAwesomeIcon icon={faUndoAlt} fixedWidth />
              </div>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <p className="mb-4 text-lg font-bold">{currentStep.text}</p>

          <div className="flex flex-col items-center">
            {currentStep.options.map((option) => (
              <button
                className="w-3/4 p-3 m-3 transition-colors border-2 rounded-md sm:w-1/2 md:w-1/3 hover:bg-red-300"
                key={option.text}
                onClick={() => {
                  setStepList([option.nextStep, ...stepList]);
                }}
              >
                {option.text}
              </button>
            ))}

            <BackButton />
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen px-4 text-white w-100">
      <Head>
        <title>Cap Verbatim Flowchart</title>
        <meta name="description" content="For all those boring verbatims" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto text-center">
        <h1 className="mt-4 text-5xl font-bold md:mt-24 md:text-7xl">
          Cap & Gown
          <br />
          Verbatim Flowchart
        </h1>

        <p className="mt-4 mb-16 text-xl md:text-2xl">
          For all those verbatims that should&apos;ve{" "}
          <span className="italic">never</span> been sent
        </p>

        <StepContent stepList={stepList} setStepList={setStepList} />
      </main>

      <footer className="py-2 text-center">
        <p>Made with 🤍 by Jorge Zreik &apos;22.</p>
        <p className="text-sm italic">
          Based on the{" "}
          <a
            className="font-bold underline"
            href="/images/verbatim-flow-chart.pdf"
            download
          >
            original flowchart
          </a>{" "}
          by Emily Hedlund &apos;19, later redesigned by Kade McCorvy &apos;20.
        </p>
      </footer>
    </div>
  );
}
