import React from "react";
import { useEffect, useState } from "react";
import { Section } from "./styles";

const Typing = () => {
  const [typingInnerContent, setTypingInnerContent] = useState("");
  const [count, setCount] = useState(0);
  const [typingChangeFlag, setTypingChangeFlag] = useState(false);
  const typingContent = "배우고, 나누고, 성장하세요";

  useEffect(() => {
    let typingInterval;
    if (!typingChangeFlag) {
      typingInterval = setInterval(() => {
        setTypingInnerContent((prevInnerCotent) => {
          let nextInnerContent = prevInnerCotent
            ? prevInnerCotent + typingContent[count]
            : typingContent[0];
          setCount(count + 1);

          if (count === typingContent.length - 1) {
            setTypingChangeFlag(true);
          }

          return nextInnerContent;
        });
      }, 200);
    } else {
      const sleep = (delay) =>
        new Promise((resolve) => setTimeout(resolve, delay));

      async function test() {
        if (count === 15) {
          await sleep(5000);
          setCount(13);
        }
        typingInterval = setInterval(() => {
          setTypingInnerContent(() => {
            let nextInnerContent = typingContent.slice(0, count);
            setCount(count - 1);

            if (count === 0) {
              setTypingChangeFlag(false);
              setCount(0);
              setTypingInnerContent("");
            }

            return nextInnerContent;
          });
        }, 100);
      }

      test();
    }

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <Section className="typing__action">
      <div>
        <span>{typingInnerContent}</span>
      </div>
    </Section>
  );
};

export default Typing;