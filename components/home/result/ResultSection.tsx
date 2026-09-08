import Header from "./Header";
import WarningBox from "./WarningBox";
import Summary from "./Summary";
import AiVsYou from "./AiVsYou";
import Earnings from "./Earnings";
import BidAdvice from "./BidAdvice";
import OverallScore from "./OverallScore";
import Strengths from "./Strengths";
import RedFlags from "./RedFlags";
import Feedback from "./Feedback";

import { scoreTier, TIER_STYLES } from "@/lib/utils";
import { AnalysisResult } from "./types";
import { useEffect, useRef } from "react";
import Animate from "@/components/common/Animate";

interface Props {
  result: AnalysisResult;
}

export default function ResultSection({ result }: Props) {
  const tier = scoreTier(result.overallScore);
  const tierStyle = TIER_STYLES[tier];
  const resultSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (result && resultSectionRef.current) {
      const y =
        resultSectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        50;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [result]);

  return (
    <Animate y={20}>
      <div
        className="mt-16 space-y-12"
        id="result-section"
        ref={resultSectionRef}
      >
        <Header decision={result.decision} overallScore={result.overallScore} />

        {result.redFlags.length > 0 && (
          <WarningBox
            decision={result.decision}
            redFlags={result.redFlags}
            tierStyle={tierStyle}
          />
        )}

        <Summary summary={result.summary} />

        <AiVsYou
          aiCanDo={result.aiCanDo}
          humanShouldDo={result.humanShouldDo}
        />

        <Earnings
          estimatedHours={result.estimatedHours}
          aiHours={result.aiHours}
          hourlyRate={result.hourlyRate}
          jobValue={result.jobValue}
          hoursNote={result.hoursNote}
        />

        {result.subscores?.length ? (
          <OverallScore subscores={result.subscores} />
        ) : null}

        {result.strengths.length > 0 && (
          <Strengths strengths={result.strengths} />
        )}

        {result.redFlags.length > 0 && <RedFlags redFlags={result.redFlags} />}

        {result.bidAdvice && <BidAdvice bidAdvice={result.bidAdvice} />}

        <Feedback />
      </div>
    </Animate>
  );
}
