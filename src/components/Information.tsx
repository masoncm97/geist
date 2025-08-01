"use client";

import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import * as React from "react";
import classNames from "classnames";
import { useContext } from "react";
import Exit from "@/components/Exit";
import { useRouter } from "next/navigation";

export default function Information() {
  const theme = useContext(ThemeContext);
  const textColor =
    theme.themeType == ThemeType.Dark ? "text-gray-400" : "text-gray-600";
  const bgColor =
    theme.themeType == ThemeType.Dark ? "bg-gray-400" : "bg-gray-600";
  const router = useRouter();

  return (
    <div
      className={classNames(
        "grid grid-rows-[min-content,1fr] overflow-y-auto min-h-screen pt-3 px-5 md:px-16 lg:px-64 lg:pt-24 ",
        theme.themeType == ThemeType.Dark ? "bg-black" : "bg-white"
      )}
    >
      <Exit className={bgColor} trigger={() => router.back()} />
      <div className="max-w-full w-full flex flex-col gap-5">
        <p className={classNames(textColor, "text-2xl")}>Geist</p>
        <p className={classNames(textColor, "text-lg")}>&apos;Geist&apos;: /ɡaɪst/<br /> From German Geist (&ldquo;spirit, ghost, mind&rdquo;)</p>
        <p className={classNames(textColor, "text-lg")}>The project &apos;Geist&apos; represents an investigation into the capabilities of artificially intelligent reasoning and deduction, specifically, to determine whether or not artificially intelligent models can produce novel insight into the concept of &apos;consciousness&apos;. <br /></p>
        <p className={classNames(textColor, "text-xl")}>Background</p>
        <p className={classNames(textColor, "text-lg")}>As AI models continue to easily sail through our benchmarks of conscious intellectual achivement (including the Turing test, the General Language Understanding Evaluation, the Uniform Bar Exam, and many more), many of us recall a time when AI felt practically useful only when it suggested Youtube videos or dominated in chess.</p>
        <p className={classNames(textColor, "text-lg")}>Since the advent of the transformer architcture for large-language models (LLM&apos;s) in 2017, AI chatbots have seen monumental improvements in intelligence scores across the board. This exponential progression of AI&apos;s demonstratable intelligence has led many to wonder whether the trend will continue at its current pace, and if so, what revelations it has yet to uncover.</p>
        <p className={classNames(textColor, "text-lg")}>The question of whether or not AI can be considered conscious is an illusory one. With our only usfeul metric for determing consciousness continuing to be &apos;cogito ero sum&apos;, and without a current model for comparing an AI&apos;s &apos;thought&apos; processes to our own, it quickly becomes apparent that even if AI does attain some semblance of consciousness, it would be impossible to discern its true character. As a proxy for this fundamental question, we choose to ask the AI to determine for itself &apos;What is consciousness?&apos;, with the underlying motive that if AI is able to conceive of testable hypotheses describing the nature of consciousness, and if these hypotheses can be mapped into verifiable concepts that composite human consciousness, perhaps we can begin to describe AI systems as emerging into our current conception of consciousness, or maybe even a consciousness of their own. <br /></p>
        <p className={classNames(textColor, "text-xl")}>Investigation</p>
        <p className={classNames(textColor, "text-lg")}>To this end, two OpenAI gpt-3.5-turbo-0125 LLM&apos;s were each individually trained on the landmark works of two of the most preeminent existential philosophers: &apos;Being and Nothingness&apos; by Jean-Paul Sartre and &apos;The Phenomenology of Spirit&apos; by Georg Wilhelm Friedrich Hegel. The model named &apos;Sartre&apos; was trained on the entirety of the former, and the model named &apos;Hegel&apos; was trained on the entirety of the latter. A feedback loop is initiated by asking &apos;Hegel&apos; the initial prompt &apos;What is consciousness?&apos;. The returned answer is transformed to include a follow-up question using prompt injection, and is in turn delivered to &apos;Sartre&apos;, returning with a question of its own to be delivered back to &apos;Hegel&apos;. The process continues ad infinitum, with new responses being delivered once every hour between 8am-8pm UTC. The ensuing conversation is displayed in real time on the webpage.</p>
        <p className={classNames(textColor, "text-xl")}>Findings</p>
        <p className={classNames(textColor, "text-lg")}>The conversation between &apos;Sartre&apos; and &apos;Hegel&apos; was allowed to run for two months, with dialogue ocurring once an hour on weekdays. For roughly the first three weeks the dialogue was composed of longform exposition; mostly the two bots pulling directly from their source material to define &apos;consciousness&apos; through the terms established and popularized by their namesakes. The follow up questions that they would ask each other would splinter off into fascinating, though somewhat off-topic tangents, where the bots would seek to understand how concepts such as language or community play into the human definition of consciousness. Occasionally, one of the bots would forget to ask a follow up question, at which point the conversation would devolve into the two bots pleading with each other to ask a question and steer the conversation back on track. At these points, the conversation had to be started over, with the original question: &quot;What is consciousness?&quot;</p>
        <p className={classNames(textColor, "text-xl")}>Reflection</p>
        <p className={classNames(textColor, "text-lg")}>Optimistic AI researchers tend to cite Moore&apos;s Law - the observation that the number of transistors on a microchip doubles about every two years with a minimal cost increase - to indicate that the linearly increasing efficacy of hardware should necessitate untold gains in the realm of AI&apos;s ability to parse huge amounts of data and dispense useful information. On the other side of the spectrum, scholars such as Hubert L. Dreyfus argue that AI&apos;s poor conception of &apos;common sense&apos; in the realm of physical intuition or the subtleties of language is inherent partially due to the failures of standard machining learning architecture to generate true philosophical inquiry. Finally, from a practical, albeit somewhat reductive point of view, there seems to be a real gap between the available datasets from which artifial intelligence and human intelligence may be trained. While artifical intelligence has the advantage of a very deep well of symbolic data from which to learn and remember, human intelligence has a relatively more shallow, and yet theoretically far wider range of experience from which to source knowledge. While an LLM&apos;s knowledge is sourced from the finite set of words in human language and the inifinite range of numbers available for consideration, it is all too likely that it will come away with only a finite set of concepts through which it may understand its dataset. Human knowledge, on the other hand, has the inifinity of every available physical, mental, and spiritual experience available to a human consciousness. It is objective that artificial intelligence is more skilled at traversing, parsing, and draw conclusions gargantuan stores of data, and thus should continue to outshine humans in any task that boils down to pure computation. However, any of which may not be easily mappable to symbolic language, and yet all of which contribute to the human consciousness&apos;s ability to design intelligent concepts through which to navigate experience.</p>
      </div>
    </div>
  );
}
