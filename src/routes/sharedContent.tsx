// Shared content components for cross-article reuse
// Update these once, and all articles using them automatically reflect the changes

export const DesigningTheRelationship = () => (
  <>
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · Designing the relationship (when AI has hard inferences)</h2>

    <h3 className="mt-8 mb-4 text-lg font-semibold">Case study: Elder care Bot</h3>

    <p>
      Instead of AI–individual reaction, this project at AI-Caring was about <strong>AI–group interaction</strong>: AI steps into an already-existing human web and learns to deal with relationships between elder, caregiver, and family.
    </p>

    <p>
      The core challenge: How do we design trust when AI must handle conflicting interests? A bot caring for an elder knows sensitive information from both the elder and their caregiver. But the elder might not want the bot to tell everything to the caregiver.
    </p>

    <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-4">Key insight</div>
      <p className="m-0"><strong>Trust is scripted.</strong> Trust is usually built through small interactions. Each step a bot takes is a design decision that either builds or breaks trust.</p>
    </div>

    <p>
      When facing a conflict (e.g., elder wants privacy but caregiver needs health updates), a well-designed bot doesn't decide alone. It follows this structure:
    </p>

    <div className="bg-neutral-100 rounded-lg p-6 my-8 text-sm font-mono text-neutral-700 overflow-x-auto">
      <div className="mb-4"><strong>1 · Acknowledge the instruction</strong></div>
      <div className="ml-4 mb-4 text-neutral-600">"I understand you want to [elder's instruction]"<br/>"I notice a conflict between your goal, your caregiver's goal, and the potential outcome."<br/>→ name the conflict openly</div>

      <div className="mb-4"><strong>2 · Evaluate the outcome</strong></div>
      <div className="ml-4 mb-4 text-neutral-600">"From our past interactions, I know you value privacy."<br/>→ derive what the system should optimize for<br/>"If I follow your instruction, your caregiver may make decisions that impact your independence."</div>

      <div className="mb-4"><strong>3 · Show affiliation behavior</strong></div>
      <div className="ml-4 mb-4 text-neutral-600">"I'm programmed to work for you, to maximize your welfare."<br/>"I support you to [your goal], and I've always tried to do what's best for you."<br/>→ eliminate conflicts of interest by design</div>

      <div><strong>4 · Ask to reconfirm</strong></div>
      <div className="ml-4 text-neutral-600">"Are you sure about [your original instruction]?"<br/>→ get explicit consent for the edge case</div>
    </div>

    <p className="text-sm text-neutral-500 italic">
      Each line is a design hypothesis to test in user research. The structure builds transparency before the moment of conflict.
    </p>

    <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Understanding affiliation</div>
      <p className="m-0">In social science, <em>affiliation</em> means being on someone's side—displaying empathy and matching their preference. It's distinct from <em>alignment</em>, which is just structural cooperation. When designing for trust, affiliation is the emotional bridge.</p>
    </div>

    <p>
      The design challenge: map out all the variables the bot must weigh. With 9 key variables (affiliation, health status, finances, elder goals, etc.), there are 8+ decision paths. Some have clear answers; some don't. Those are where the bot must hand off to a human.
    </p>

    <p>
      The conclusion: <strong>In high-stakes scenarios, "I am not capable of doing this alone" is the most honest and trustworthy thing an AI can say.</strong>
    </p>
  </>
);

export const DesigningTheFeel = () => (
  <>
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Designing the feeling (when AI has easy inferences)</h2>

    <h3 className="mt-8 mb-4 text-lg font-semibold">Case study: Human–AI co-writing tool</h3>

    <p>
      I worked on a tool to provide real-time support for users writing technical requirements. The AI's job was to reactively correct errors and ensure clarity. This was easy-inference work because the criteria were explicit and quality was measurable.
    </p>

    <blockquote>
      The goal is not to have users feel the AI. The goal is to have them feel they are supported during writing.
    </blockquote>

    <p>
      So how do you design a feeling? First, break down what "writing" actually is through task analysis:
    </p>

    <div className="bg-neutral-100 rounded-lg p-6 my-8">
      <div className="space-y-3 text-sm">
        <div>1. you think about what to write</div>
        <div className="text-center text-neutral-400">↓</div>
        <div>2. you get ready to write</div>
        <div className="text-center text-neutral-400">↓</div>
        <div>3. you type while watching your sentence form</div>
        <div className="text-center text-neutral-400">↓</div>
        <div>4. you pause and think about the next sentence</div>
        <div className="text-center text-neutral-400">↓</div>
        <div>5. you decide whether to edit, continue, or move on</div>
      </div>
    </div>

    <p>
      Notice step 4: the pause. That's where AI intervention can either help or hurt. The timing of when the AI speaks is the foundation of the feeling.
    </p>

    <h3 className="mt-8 mb-4 text-lg font-semibold">Three trigger mechanisms</h3>

    <div className="space-y-8 my-8">
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-2">Tick (every 1 second)</h4>
        <p className="text-sm text-neutral-600 mb-2">AI judges every keystroke. There's always an eye on you.</p>
        <p className="text-xs text-neutral-500"><strong>Economics:</strong> ~60 calls/min, $0.08/min, ~$53/month per user</p>
        <p className="text-xs text-neutral-500 mt-1"><strong>Feeling:</strong> Constant correction feels like surveillance. Users report: "I was just about to fix that."</p>
      </div>

      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-2">Pause (after 2 seconds of pause)</h4>
        <p className="text-sm text-neutral-600 mb-2">AI mistakes your pause for a finished thought.</p>
        <p className="text-xs text-neutral-500"><strong>Economics:</strong> ~4-8 calls/min, $0.015/min, ~$10/month per user</p>
        <p className="text-xs text-neutral-500 mt-1"><strong>Feeling:</strong> Interrupts thinking mid-flow. Users report: "I'm thinking, don't interrupt me."</p>
      </div>

      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-2">Blur event (when you leave the field)</h4>
        <p className="text-sm text-neutral-600 mb-2">AI stays quiet while you write, then speaks when you move to the next field.</p>
        <p className="text-xs text-neutral-500"><strong>Economics:</strong> ~1-3 calls/min, $0.018/min, ~$12/month per user</p>
        <p className="text-xs text-neutral-500 mt-1"><strong>Feeling:</strong> Respectful partnership. Users report: "The tool felt like it was supporting me, not watching me."</p>
      </div>
    </div>

    <p>
      The insight: <strong>Different triggers create different relationships.</strong> Is the AI leading? Waiting? Watching? Interrupting? The trigger mechanism is the most important UX decision you make.
    </p>

    <p>
      We prototyped each option and tested with users. The result: writers don't want to think about the AI. They just want to feel supported and write better. The "blur event" trigger won because it respected the human's agency.
    </p>
  </>
);

export const WhereNotToUseAI = () => (
  <>
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Where to NOT use AI</h2>

    <p>
      AI should never be a default solution. The "double diamond model" for design thinking is there for a reason.
    </p>

    <img
      src="/articles/ai-fatigue.png"
      alt="AI fatigue by feeling"
      className="w-full rounded-lg my-8 border border-neutral-200"
    />

    <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Design principle</div>
      <p className="m-0">Great AI product design knows its boundaries. It's not about pushing the edges of what's possible—it's about <strong>honoring what matters most.</strong></p>
    </div>
  </>
);

export const ForOthersToPrototype = () => (
  <>
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · For others to prototype</h2>

    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 my-8 border-4 border-yellow-200">
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">🚀</div>
        <h3 className="font-semibold text-neutral-900 mb-2">Enable. Hand over. Collaborate.</h3>
      </div>
    </div>

    <p>
      <strong>Purpose:</strong> To enable. To hand over control. To let others build on your foundation.
    </p>

    <p>
      The most interesting prototypes are the ones that become tools for other people to explore with. You've done enough work to establish the pattern, the constraints, the possibilities—now others can iterate within that space.
    </p>

    <div className="space-y-4 my-8">
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-2">Control Panel</h4>
        <p className="text-sm text-neutral-600">A prototype that exposes the variables. Let stakeholders change parameters and see the impact. This is how you move from "here's my idea" to "here's the space we can explore together."</p>
      </div>

      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-2">Claude Code Design Agent</h4>
        <p className="text-sm text-neutral-600">A prototype that can be extended. When the tool itself becomes part of the exploration—when others can use it to test their own what-ifs—that's when the real collaboration begins.</p>
      </div>
    </div>

    <p>
      These prototypes work best when they're flexible, well-documented, and handed over with permission to break them.
    </p>

    <img
      src="/articles/how-i-prototype.png"
      alt="Three types of prototypes as collaboration tools: Explore what-ifs, Explain the prototype, For others to prototype"
      className="w-full rounded-2xl my-12 border-4 border-neutral-900"
    />
  </>
);
