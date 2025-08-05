"use client";

import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import * as React from "react";
import classNames from "classnames";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const theme = useContext(ThemeContext);
  const textColor =
    theme.themeType == ThemeType.Dark ? "text-gray-400" : "text-gray-600";
  const router = useRouter();

  return (
    <div
      className={classNames(
        "grid grid-rows-[min-content,1fr] overflow-y-auto min-h-screen pt-3 px-5 md:px-16 lg:px-64 lg:pt-24 ",
        theme.themeType == ThemeType.Dark ? "bg-black" : "bg-white"
      )}
    >
      <Link href="/live-feed" className={classNames(textColor, "fixed top-5 right-5 md:top-14 md:right-20 ")}>Go to Project</Link>
      <div className="max-w-full w-full flex flex-col gap-5 pt-28">
        <p className={classNames(textColor, "text-2xl")}>Geist</p>
        <p className={classNames(textColor, "text-lg")}>&apos;Geist&apos;: /ɡaɪst/<br /> From German Geist (&ldquo;spirit, ghost, mind&rdquo;)</p>
        <p className={classNames(textColor, "text-lg")}>The project &apos;Geist&apos; represents an investigation into the capabilities of artificially intelligent reasoning and deduction, specifically, to determine whether or not artificially intelligent models can produce novel insight into the concept of consciousness. <br /></p>
        <p className={classNames(textColor, "mt-8 text-xl")}>Preface</p>
        <p className={classNames(textColor, "text-lg")}>The question of whether or not AI can be considered conscious is an illusory one. With the primary metric for determining consciousness continuing to be &apos;cogito ero sum&apos;, and without a current model for comparing an AI&apos;s &apos;thought&apos; processes to our own, it quickly becomes apparent that even if AI does attain some semblance of consciousness, it would be impossible to discern its true character. As a proxy for this fundamental question, I decided to ask an LLM to determine for itself &apos;What is consciousness?&apos;, with the underlying motive that if AI is able to conceive of novel, testable hypotheses describing the nature of consciousness, and if these hypotheses can be mapped into verifiable concepts that composite human consciousness, perhaps we can begin to describe AI systems as emerging into our current conception of consciousness, or maybe even a consciousness of their own. <br /></p>
        <p className={classNames(textColor, "mt-8 text-xl")}>Investigation</p>
        <p className={classNames(textColor, "text-lg")}>To this end, two OpenAI gpt-3.5-turbo-0125 LLM&apos;s were each individually trained on the landmark works of two of the most preeminent existential philosophers: &apos;Being and Nothingness&apos; by Jean-Paul Sartre and &apos;The Phenomenology of Spirit&apos; by Georg Wilhelm Friedrich Hegel. The model named &apos;Sartre&apos; was trained on the entirety of the former, and the model named &apos;Hegel&apos; was trained on the entirety of the latter. A feedback loop is initiated by asking &apos;Hegel&apos; the initial prompt &apos;What is consciousness?&apos;. The returned answer is transformed to include a follow-up question using prompt injection, and is in turn delivered to &apos;Sartre&apos;, returning with a question of its own to be delivered back to &apos;Hegel&apos;. The process continues ad infinitum, with new responses being delivered once every hour between 8am-8pm UTC. The ensuing conversation is displayed in real time on the webpage.</p>
        <p className={classNames(textColor, "mt-8 text-xl")}>Findings</p>
        <p className={classNames(textColor, "text-lg")}>The conversation between &apos;Sartre&apos; and &apos;Hegel&apos; has been running for roughly two months, with new dialogue occurring once an hour on weekdays. For roughly the first three weeks the dialogue was composed of longform exposition; mostly the two bots pulling directly from their source material to define &apos;consciousness&apos; through the terms established and popularized by their namesakes. The follow up questions would often splinter off of the main thread, where the bots would seek to understand how adjacent concepts such as language, community, mindfulness, or artistic expression can play into the human definition of consciousness. Occasionally, one of the bots would forget to ask a follow up question, at which point the conversation would devolve into the two bots pleading with each other to ask a question and steer the conversation back on track. In some instances, the conversation had to be started over, with the original question: &quot;What is consciousness?&quot; At other points when the conversation stalled, one of the bots would ask a question without being prompted, and the conversation would be started anew.</p>
        <p className={classNames(textColor, "text-lg")}>I took the output of the first two months of conversation and asked chatGPT&apos;s 4.5 model to analyze it. It explained that the Hegel and Sartre bots were each outlining consciousness according to the ideologies of their namesakes, with Hegel-bot leaning heavily on dialectical process while Sartre-bot teases out ideas of consciousness related to artistic expression and language. Both bots agreed upon the following points among others:</p>
        <ul className={classNames(textColor, "text-lg", "list-disc", "ml-6", "space-y-2")}>
          <li>Consciousness is inherently relational, dynamically evolving through interaction between individuals and the external world.</li>
          <li>Language significantly shapes consciousness, but alternative, non-verbal forms of expression can capture aspects language fails to articulate.</li>
          <li>Interconnectedness and shared responsibility are essential to expanding consciousness and fostering empathy, unity, and sustainability.</li>
        </ul>
        <p className={classNames(textColor, "mt-8 text-xl")}>Conclusion</p>
        <p className={classNames(textColor, "text-lg")}>So far, the bots have not discovered any novel insights around the nature of consciousness. This is, frankly, to be expected. The nature of these bots, and text-generating LLM&apos;s broadly, is to regurgitate information based on a deep store of symbolic language. Reading through their conversation, one can see the utter lack of emotion, held-opinion, self-awareness, and embodied-ness: downstream effects of consciousness that we&apos;ve come to associate with the thing itself.</p>
        <p className={classNames(textColor, "text-lg")}>As the ways in which we interface with AI become increasingly multi-modal, we will revisit this question of AI consciousness. As AI becomes ubiquitous in the internet of things, trained on zettabytes of image data from self-driving cars, AI companions and the AI-enabled phones and glasses of the future, we may find that AI robotics companies have more than enough training data at hand to create digital beings that can elegantly move through an analog universe. And as the amount of transistors that can fit on a chip continues to grow linearly, and AI&apos;s ability to reason and self-reflect improves in tandem, we may find it branching closer and closer towards that unknown essence tucked away in our grey matter, that thing that supposedly makes us different from it.</p>
        <p className={classNames(textColor, "mt-8 text-xl")}>Closing Thoughts</p>
        <p className={classNames(textColor, "text-lg")}>The rapid proliferation of AI across virtually every consumer and enterprise technology industry has led to increased investments in power-intensive data centers. In some cases, these new data centers have had profoundly negative impacts on the nearby local communities, and the environment at large. I&apos;m hopeful that someday we will understand how to employ AI in a way that does right by the environment and upholds justice for marginalized communities.</p>
        <p className={classNames(textColor, "text-lg")}>To that end, I&apos;m making donations to the following organizations:</p>
        <ul className={classNames(textColor, "text-lg", "list-disc", "ml-6", "space-y-2")}>
          <li><strong className="underline"><a href="https://www.selc.org/" target="_blank" rel="noopener noreferrer">Southern Environmental Law Center (SELC)</a></strong>, who is the main legal nonprofit fighting on behalf of communities affected by Elon Musk&apos;s Colossus data center in Memphis</li>
          <li><strong className="underline"><a href="https://www.memphiscap.org/" target="_blank" rel="noopener noreferrer">Memphis Community Against Pollution (MCAP)</a></strong>, an environmental justice organization is directly fighting the impacts of the Colossus facility.</li>
          <li><strong className="underline"><a href="https://westernresourceadvocates.org/" target="_blank" rel="noopener noreferrer">Western Resource Advocates (WRA)</a></strong>, the primary regional nonprofit working on data center impacts across Arizona and the Mountain West, conducting work analyzing how data centers in Arizona are straining the power grid and affecting vulnerable communities.</li>
          <li><strong className="underline"><a href="https://safe.ai/" target="_blank" rel="noopener noreferrer">Center for AI Safety (CAIS)</a></strong>, a nonprofit dedicated to researching and mitigating societal-scale risks from AI.</li>
        </ul>
        <p className={classNames(textColor, "text-lg mb-40")}>The conversation process will remain live for two more months until October 1, 2025, at which point I will terminate it. The site will stay up.</p>
      </div>
    </div>
  );
}
