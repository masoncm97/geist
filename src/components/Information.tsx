import { NavbarContext } from "@/providers/NavbarProvider";
import * as React from "react";
import Exit from "./Exit";

export default function Information() {
  const { setInfoVisible } = React.useContext(NavbarContext);
  return (
    <div className="w-screen h-screen backdrop-blur-lg absolute z-[100] grid grid-rows-[min-content,1fr]">
      <Exit trigger={() => setInfoVisible((prev) => !prev)}></Exit>
      <div className="flex flex-col p-5 gap-5">
        <p className="text-gray-600 text-2xl">Geist</p>
        <p className="text-gray-600 text-lg">
          &apos;Geist&apos;: /ɡaɪst/
          <br /> From German Geist (&apos;spirit, ghost, mind&apos;s)
        </p>
        <p className="text-gray-600 text-lg">
          The project &apos;Geist&apos; represents an investigation into the
          capabilities of artificially intelligent reasoning and deduction. The
          oft-posited question of determining the degree of conscious life
          enjoyed by AI models is disregarded. With our only usfeul metric for
          determing consciousness continuing to be &apos;cogito ero sum&apos;,
          and without a current model for comparing an AI&apos;s
          &apos;thought&apos; processes to our own, it quickly becomes apparent
          that even if AI does attain some semblance of consciousness, it would
          be impossible to discern its true character. Thus, rather than trying
          to prove &apos;consciousness&apos;, this investigation seeks to
          undestand whether artificial intelligence can produce novel insight
          into the concept of &apos;consciousness&apos;. <br />
        </p>
        <p className="text-gray-600 text-xl">Background</p>
        <p className="text-gray-600 text-lg">
          As AI models continue to easily sail through our benchmarks of
          conscious intellectual achivement (including the Turing test, the
          General Language Understanding Evaluation, the Uniform Bar Exam, and
          many more), many of us recall a time when the technology was so
          infantile that its only real use-cases were suggesting music on
          Spotify and dominating in chess.
        </p>
        <p className="text-gray-600 text-lg">
          Since the advent of the transformer architcture for large-language
          models (LLM) in 2017, AI chatbots have seen monumental improvements in
          intelligence scores across the board. This exponential progression of
          AI&apos;s demonstratable intelligence has led many to wonder whether
          the trend will continue at its current pace, and if so, what
          revelations has it yet to uncover.
        </p>
        <p className="text-gray-600 text-xl">Investigation</p>
        <p className="text-gray-600 text-lg">
          To this end, two OpenAI gpt-3.5-turbo-0125 LLM&apos;s
        </p>
        <p className="text-gray-600 text-xl">Reflection</p>
        <p className="text-gray-600 text-lg">
          Optimistic AI researchers tend to cite Moore&apos;s Law - the
          observation that the number of transistors on a microchip doubles
          about every two years with a minimal cost increase - to indicate that
          the linearly increasing efficacy of hardware should necessitate untold
          gains in the realm of AI&apos;s ability to parse huge amounts of data
          and dispense useful information. On the other side of the spectrum,
          scholars such as Hubert L. Dreyfus argue that AI&apos;s poor
          conception of &apos;common sense&apos; in the realm of physical
          intuition or the subtleties of language is inherent partially due to
          the failures of standard machining learning architecture to generate
          true philosophical inquiry. Finally, from a practical, albeit somewhat
          reductive point of view, there seems to be a real gap between the
          available datasets from which artifial intelligence and human
          intelligence may be trained. While artifical intelligence has the
          advantage of a very deep well of symbolic data from which to learn and
          remember, human intelligence has a relatively more shallow, and yet
          theoretically far wider range of experience from which to source
          knowledge. While an LLM&apos;s knowledge is sourced from the finite
          set of words in human language and the inifinite range of numbers
          available for consideration, it is all too likely that it will only
          come away with only a finite set of concepts through which it may
          understand its dataset. Human knowledge, on the other hand, has the
          inifinity of every available physical, mental, and spiritual
          experience available to a human consciousness; any of which may not be
          easily mappable to symbolic language, and yet all of which contribute
          to the human consciousness&apos;s ability to design intelligent
          concepts through which to navigate experience.
        </p>
      </div>
    </div>
  );
}
