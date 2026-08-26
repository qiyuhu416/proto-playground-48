import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/think")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Mental models, thinking frameworks, and written reflections on design and prototyping.",
      },
    ],
  }),
  component: ThinkComponent,
});

function ThinkComponent() {
  const [quadrantOpen, setQuadrantOpen] = useState(false);
  const [expandedReflections, setExpandedReflections] = useState<Set<number>>(new Set());
  const [reflectionsWithImages, setReflectionsWithImages] = useState<Array<{content: string; date: string; image?: string}>>([]);

  useEffect(() => {
    // Parse markdown to extract images
    const imageRegex = /!\[]\((\/articles\/reflection-\d+\.png)\)/g;
    const reflectionArray = [
      {
        content: "hi all yes v random but plz enjoy my triangle and designer and happy first Monday of the week.",
        date: "Aug 24, 2026",
        image: "/articles/reflection-02.png",
      },
      {
        content: "'Omakase' is such a creative service design concept that balances unpredictability & delightfulness. So what if we applied that to leadership presentations?",
        date: "Aug 19, 2026",
      },
      {
        content: "If you tap on the 3-dot button here in a post, you'll see an option called 'report AI slop'. Tech & humanity 是两个抱在一起向前滚的球",
        date: "Aug 5, 2026",
      },
      {
        content: "I've started intentionally drawing models to journal my work and life. This morning, while I was drawing, I thought of what Jess said: 'Be careful with this urge, because the real world is very likely to be messier.' She's right, not everything can be explained through models. It's interesting how I was taught to be comfortable with messiness throughout the HCI training, yet still find myself seeking that sense of control. It's such a fun, but messy learning experience. Thanks to Mia, Jess, and Skip, who all inspired this very 'INFJ' post.",
        date: "Jul 29, 2026",
        image: "/articles/reflection-03.png",
      },
      {
        content: "Feeling proud about this error page design",
        date: "Jul 29, 2026",
        image: "/articles/reflection-04.png",
      },
      {
        content: "Hi all, wanna hear folks' thoughts on 'how to find a good problem to answer' for new emerging AI concepts (like GenUI/harness/…). My painpoint is that there is so much to explore, but not all questions are worth the time researching. Some might be temporary issues that may not become issues as models get better; some might not even be 'design problems'. E.g. designers may not be able to explore the 'unpredictability side of GenUI' as the UI templates won't fully address tech limitations. Maybe to explore the use case? Scenario? When error tolerance is low?",
        date: "Jul 26, 2026",
      },
      {
        content: "One good thing about vibe coding is that it enables individualization (not even personalization) for making useless things for pure fun and 三分钟热度的快乐",
        date: "Jul 26, 2026",
        image: "/articles/reflection-05.png",
      },
      {
        content: "'Reading the room' is such an interesting concept. AI can't do it (yet). But that can be where the value comes from. E.g. the Uber driver's app playing 'plz use your seatbelt' when the human driver doesn't want to remind the passenger. E.g. a note-taking AI pointing out 'ppl spent most of the time discussing but never actually reached alignment.'",
        date: "Jul 26, 2026",
      },
      {
        content: "Keep up w the trend by being a research participant",
        date: "Jun 26, 2026",
      },
      {
        content: "'If we look at the evolution of HCI,' Skip Shelly said, 'it's always been about relationships.' Command lines → GUIs → human-AI symbiosis. The next step may be us learning from AI. E.G. isn't 'harness' a framework we should apply to ourselves? We may have spent more time training machines than looking inner self.",
        date: "May 26, 2026",
        image: "/articles/reflection-06.png",
      },
      {
        content: "'As AI capability goes up, HCI may go down, as there may be no need for H to do the I.' - 'Then where would humans go? Distilled into skill.md?' 'Maybe it's AI that teaches humans how to use it. HCI will become CHI. You see, CHI is so forward-looking even in its name.' (Windy day chat with Manqing Yu, May 4, 2026)",
        date: "May 26, 2026",
      },
      {
        content: "I used to (and still do) ask AI to help with self-reflection. Now I'm not sure that was truly 'self-reflection'. I might have been outsourcing a process that should actually take time and discomfort. Instant answers feel addictive, but do we really need that efficiency everywhere?",
        date: "Apr 26, 2026",
      },
      {
        content: "Today I tried paper prototyping, with our engineer role-playing the LLM. It was so much fun. And 'making work fun' is thanks to Mia Hu. She taught me to always treat colleagues as *real* humans and lent me this book called 'Today Was Fun' by Bree Groff. I appreciate the people I've met through this job. P.S. - Don't forget about paper prototyping in this vibe-coding era. P.P.S - Service design is getting important in designing AI experiences (not just products). P.P.P.S - Paper prototyping is great for service design",
        date: "Apr 26, 2026",
      },
      {
        content: "I used Uber's safety feature for the first time. Tbh I felt so pissed off when I saw it's named 'Safety Agent.' When I realized I couldn't distinguish between AI and a human, AGI felt scarier than that Uber driver 😅",
        date: "Mar 26, 2026",
        image: "/articles/reflection-08.png",
      },
      {
        content: "Note to myself: Either you are amplified by AI, or you become the agent of AI",
        date: "Mar 26, 2026",
      },
      {
        content: "SO many posts about vibe coding!!! What a vibe",
        date: "Mar 26, 2026",
      },
      {
        content: "(During college, an office hour) Qian told me: 'It's okay to be slow, as long as you are on the right track.' (For a long time) I asked 'What is the right track?' (Half a year into my first job) I thought: 'It's the right track as long as I think it is.' (Now) I think: 'It's just the right track if I am willing to take the risk of finding out it's not the right track— but still choose to do it.' The metrics to measure 'right' to me are no longer about what is 'right.' Exciting to see what I think next.",
        date: "Feb 26, 2026",
      },
      {
        content: "'User-centered design' + 'Vibe-coding/designing' + 'Generative UI' = users themselves design what they see?",
        date: "Feb 26, 2026",
      },
      {
        content: "'interfaces are still the same as when chatgpt first launched'… Someone also said that 'another good way to design AI products is to make users not even notice the AI'. Yeah, real innovation is never easy. It takes time, and sometimes a bit of luck?",
        date: "Jan 26, 2026",
      },
      {
        content: "Learned After Effects to make this animation. Now I truly respect everyone who masters it.",
        date: "Jan 26, 2026",
        image: "/articles/reflection-11.png",
      },
      {
        content: "Try this prompt and enjoy",
        date: "Jan 26, 2026",
        image: "/articles/reflection-12.png",
      },
      {
        content: "Rewatched 'The Little Prince' — Introducing my elephant, featuring another smaller elephant inside a snake",
        date: "Nov 26, 2025",
        image: "/articles/reflection-13.png",
      },
      {
        content: "Was thinking of doing an experiment — being completely honest in my resume",
        date: "Nov 26, 2025",
        image: "/articles/reflection-14.png",
      },
      {
        content: "Is human evaluation of GenAI outputs more about real QA or about having a DRI?",
        date: "Oct 26, 2025",
      },
      {
        content: "During today's vibe coding meetup, Brandon Leichty brought up that 'creativity is one of humans' most valuable assets.' Yet, we also admitted that sometimes we just ask ChatGPT for creative ideas -- and it actually does a pretty good job. -- which means creativity might be 'programmable,' as it might follow certain rules (and one rule could be the ability to connect seemingly unrelated things). Sure, humans might be more flexible, but I'd argue against underestimating AI -- such a black box.",
        date: "Oct 26, 2025",
      },
      {
        content: "UX research 🤔 Has the definition of a 'good research question' shifted? Yeah… 'users don't know what they want' — but maybe AI does? Oftentimes I feed AI gibberish, and it somehow understands my 'intend' like magic — or at least makes me feel understood. Maybe this black-box & black-box communication is good enough. Let AI handle that. Some things are okay to remain known-unknowns. Or maybe it's not always better to 'know' exactly what you want— sometimes just 'feeling' good is enough.",
        date: "Aug 26, 2025",
      },
      {
        content: "To my future self, and whoever happens to read this: One question has been in my head while working on a personalization project for AI design: we say we want to 'meet one's need,' and we also say 'meet your need before you know it yourself' ---- So... who defines what we need? Or do we ever truly know it ourselves? So through informal qualitative research (a.k.a. chats) with co-workers, I explored personalization by starting with 'what makes a person a person'. It seems that who we are is shaped by how we interact with others. If I ask, 'what type of person are you?' most people can answer — but often, we use phrases we've heard from others. People like to think we're in control, yet we're constantly, passively absorbing signals from the outside world, then reshaping ourselves to fit what we think we need or who we think we are. The interesting part is the gap between what we want and what actually happens. Maybe that's what uncontrollability is: interactions create uncontrollability, uncontrollability creates emotions, and those emotions are part of what makes us… us 👍. To Qiyu: I can't fully control whether my work will have a lasting impact, or where I'll work next, or where I'll live next. But I allow uncertainty --- so things can go 'out of control' in a controlled way. Life is like a game, and game is more fun when you play it seriously. May we all have fun with our games. 纵一苇之所如, All the best!!!!!!!!!",
        date: "Aug 26, 2025",
      },
      {
        content: "When we say 'AI,' how many of us think of a 'chatbot' first?",
        date: "Aug 26, 2025",
      },
      {
        content: "The newly launched ChatGPT agent makes me so curious about the future role of humans in HCI. GUIs were originally designed to help humans interact with computers. But humans seem to be interacting less with computers, as multi-agent collaboration increases —especially in tasks like browsing and searching in their demo. So… are we really training the models, or are the models training us—shaping how we work to simply check their outputs? GUI use case/human expectations/multitasking capacity... these may all be changing. 'The emergence of artificial intelligence may lead us to revalue intelligence itself.' — Yuwen Lu, again. And yet, it's still humans who are growing the AI ecosystem (and are learning MCP — thanks to my MLE friends haha)",
        date: "Aug 26, 2025",
      },
      {
        content: "Interesting. The concept of the 'weak robot' (from ICD-LAB in Japan). One example is a trash-picking bot that asks a human for help (in a well-designed way) when it spots trash, instead of picking it up itself. Some say it fulfills a basic human need: to protect and feel needed. In contrast, an agentic AI project I'm working on aims to have AI complete tasks independently, as much as possible. It's not just us—many emerging AI startups are pushing similar ideas (you see them all over SF, on buses, posters, and ad boards). Zooming out, doesn't the current industry feel like it's in the diverging stage of the double diamond? But I think we'll eventually reach a turning point and start to converge — Yes, AI can do (almost) ANYTHING, but do we really want it to do EVERYTHING? 'Everything can be research.' — Yuwen Lu, 2025, coffee chat @SF",
        date: "Aug 26, 2025",
      },
    ];
    setReflectionsWithImages(reflectionArray);
  }, []);

  const toggleReflection = (idx: number) => {
    const newSet = new Set(expandedReflections);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedReflections(newSet);
  };

  const isLongContent = (content: string) => {
    const lines = content.split('\n').length;
    return lines > 3 || content.length > 250;
  };

  return (
    <div className="min-h-screen bg-background text-neutral-900">

      {/* Frameworks section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h2 className="text-2xl font-medium mb-8 text-neutral-900">Frameworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Analysis-synthesis bridge */}
          <a
            href="https://www.dubberly.com/articles/interactions-the-analysis-synthesis-bridge-model.html"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow block group"
          >
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <circle cx="16" cy="12" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="12" r="3" fill="#1a1a1a"/>
                <circle cx="16" cy="38" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="38" r="3" fill="#1a1a1a"/>
                <line x1="19" y1="12" x2="61" y2="12" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
                <line x1="19" y1="38" x2="61" y2="38" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
                <line x1="16" y1="15" x2="16" y2="35" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
                <line x1="64" y1="15" x2="64" y2="35" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2 group-hover:underline">Analysis-synthesis bridge</h3>
            <p className="text-neutral-600 text-sm">The best model by Hugh Dubberly! It has been helping me intentionally practice "thinking outside the box" the mindset</p>
          </a>

          {/* Me × Others × Think × Do */}
          <button
            onClick={() => setQuadrantOpen(true)}
            className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow text-left group"
          >
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <line x1="40" y1="0" x2="40" y2="50" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="0" y1="25" x2="80" y2="25" stroke="#e5e5e5" strokeWidth="1"/>
                <circle cx="40" cy="8" r="3" fill="#1a1a1a"/>
                <circle cx="8" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="72" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="42" r="3" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2 group-hover:underline">Me · Others · Think · Do</h3>
            <p className="text-neutral-600 text-sm">2×2 is just a cool way to map out the situations and help me see my own "unknown-unkonwn"s</p>
          </button>

          {/* Double diamond */}
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <polygon points="4,25 22,8 40,25 22,42" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
                <polygon points="40,25 58,8 76,25 58,42" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
                <circle cx="4" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="76" cy="25" r="3" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2">Double diamond</h3>
            <p className="text-neutral-600 text-sm">The designer thinking day 1 model. Ya I hear sometimes it could be "too theoretical", but at least it let us know where we are making a leap of faith while we have to.</p>
          </div>

          {/* Service blueprint */}
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <line x1="4" y1="10" x2="76" y2="10" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="4" y1="25" x2="76" y2="25" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="4" y1="40" x2="76" y2="40" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="14" y1="10" x2="40" y2="10" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="40" y1="10" x2="64" y2="10" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="22" y1="25" x2="54" y2="25" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="14" y1="40" x2="40" y2="40" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="40" y1="40" x2="64" y2="40" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="40" y1="13" x2="22" y2="22" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2"/>
                <line x1="54" y1="28" x2="40" y2="37" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2"/>
                <circle cx="14" cy="10" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="10" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="10" r="3" fill="#1a1a1a"/>
                <circle cx="22" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="54" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="14" cy="40" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="40" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="40" r="3" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2">Service blueprint</h3>
            <p className="text-neutral-600 text-sm">What are all the stakeholders, what do they do, and how are their actions related to each other. Layer by layer, step by step. Great for service design.</p>
          </div>

        </div>
      </section>

      {/* Blog/Writing section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl font-medium mb-8 text-neutral-900">Reflections</h2>
        <div className="space-y-4">
          {[
            {
              content: "hi all yes v random but plz enjoy my triangle and designer and happy first Monday of the week.",
              date: "Aug 24, 2026",
            },
            {
              content: "'Omakase' is such a creative service design concept that balances unpredictability & delightfulness. So what if we applied that to leadership presentations?",
              date: "Aug 19, 2026",
            },
            {
              content: "If you tap on the 3-dot button here in a post, you'll see an option called 'report AI slop'. Tech & humanity 是两个抱在一起向前滚的球",
              date: "Aug 5, 2026",
            },
            {
              content: "I've started intentionally drawing models to journal my work and life. This morning, while I was drawing, I thought of what Jess said: 'Be careful with this urge, because the real world is very likely to be messier.' She's right, not everything can be explained through models. It's interesting how I was taught to be comfortable with messiness throughout the HCI training, yet still find myself seeking that sense of control. It's such a fun, but messy learning experience. Thanks to Mia, Jess, and Skip, who all inspired this very 'INFJ' post.",
              date: "Jul 29, 2026",
            },
            {
              content: "Feeling proud about this error page design",
              date: "Jul 29, 2026",
            },
            {
              content: "Hi all, wanna hear folks' thoughts on 'how to find a good problem to answer' for new emerging AI concepts (like GenUI/harness/…). My painpoint is that there is so much to explore, but not all questions are worth the time researching. Some might be temporary issues that may not become issues as models get better; some might not even be 'design problems'. E.g. designers may not be able to explore the 'unpredictability side of GenUI' as the UI templates won't fully address tech limitations. Maybe to explore the use case? Scenario? When error tolerance is low?",
              date: "Jul 26, 2026",
            },
            {
              content: "One good thing about vibe coding is that it enables individualization (not even personalization) for making useless things for pure fun and 三分钟热度的快乐",
              date: "Jul 26, 2026",
            },
            {
              content: "'Reading the room' is such an interesting concept. AI can't do it (yet). But that can be where the value comes from. E.g. the Uber driver's app playing 'plz use your seatbelt' when the human driver doesn't want to remind the passenger. E.g. a note-taking AI pointing out 'ppl spent most of the time discussing but never actually reached alignment.'",
              date: "Jul 26, 2026",
            },
            {
              content: "Keep up w the trend by being a research participant",
              date: "Jun 26, 2026",
            },
            {
              content: "'If we look at the evolution of HCI,' Skip Shelly said, 'it's always been about relationships.' Command lines → GUIs → human-AI symbiosis. The next step may be us learning from AI. E.G. isn't 'harness' a framework we should apply to ourselves? We may have spent more time training machines than looking inner self.",
              date: "May 26, 2026",
            },
            {
              content: "'As AI capability goes up, HCI may go down, as there may be no need for H to do the I.' - 'Then where would humans go? Distilled into skill.md?' 'Maybe it's AI that teaches humans how to use it. HCI will become CHI. You see, CHI is so forward-looking even in its name.' (Windy day chat with Manqing Yu, May 4, 2026)",
              date: "May 26, 2026",
            },
            {
              content: "I used to (and still do) ask AI to help with self-reflection. Now I'm not sure that was truly 'self-reflection'. I might have been outsourcing a process that should actually take time and discomfort. Instant answers feel addictive, but do we really need that efficiency everywhere?",
              date: "Apr 26, 2026",
            },
            {
              content: "Today I tried paper prototyping, with our engineer role-playing the LLM. It was so much fun. And 'making work fun' is thanks to Mia Hu. She taught me to always treat colleagues as *real* humans and lent me this book called 'Today Was Fun' by Bree Groff. I appreciate the people I've met through this job. P.S. - Don't forget about paper prototyping in this vibe-coding era. P.P.S - Service design is getting important in designing AI experiences (not just products). P.P.P.S - Paper prototyping is great for service design",
              date: "Apr 26, 2026",
            },
            {
              content: "I used Uber's safety feature for the first time. Tbh I felt so pissed off when I saw it's named 'Safety Agent.' When I realized I couldn't distinguish between AI and a human, AGI felt scarier than that Uber driver 😅",
              date: "Mar 26, 2026",
            },
            {
              content: "Note to myself: Either you are amplified by AI, or you become the agent of AI",
              date: "Mar 26, 2026",
            },
            {
              content: "SO many posts about vibe coding!!! What a vibe",
              date: "Mar 26, 2026",
            },
            {
              content: "(During college, an office hour) Qian told me: 'It's okay to be slow, as long as you are on the right track.' (For a long time) I asked 'What is the right track?' (Half a year into my first job) I thought: 'It's the right track as long as I think it is.' (Now) I think: 'It's just the right track if I am willing to take the risk of finding out it's not the right track— but still choose to do it.' The metrics to measure 'right' to me are no longer about what is 'right.' Exciting to see what I think next.",
              date: "Feb 26, 2026",
            },
            {
              content: "'User-centered design' + 'Vibe-coding/designing' + 'Generative UI' = users themselves design what they see?",
              date: "Feb 26, 2026",
            },
            {
              content: "'interfaces are still the same as when chatgpt first launched'… Someone also said that 'another good way to design AI products is to make users not even notice the AI'. Yeah, real innovation is never easy. It takes time, and sometimes a bit of luck?",
              date: "Jan 26, 2026",
            },
            {
              content: "Learned After Effects to make this animation. Now I truly respect everyone who masters it. If you can use After Effect, please connect— I'd love to learn from a real human. Thank you!",
              date: "Jan 26, 2026",
            },
            {
              content: "Rewatched 'The Little Prince' — Introducing my elephant, featuring another smaller elephant inside a snake",
              date: "Nov 26, 2025",
            },
            {
              content: "Was thinking of doing an experiment — being completely honest in my resume",
              date: "Nov 26, 2025",
            },
            {
              content: "Is human evaluation of GenAI outputs more about real QA or about having a DRI?",
              date: "Oct 26, 2025",
            },
            {
              content: "During today's vibe coding meetup, Brandon Leichty brought up that 'creativity is one of humans' most valuable assets.' Yet, we also admitted that sometimes we just ask ChatGPT for creative ideas -- and it actually does a pretty good job. -- which means creativity might be 'programmable,' as it might follow certain rules (and one rule could be the ability to connect seemingly unrelated things). Sure, humans might be more flexible, but I'd argue against underestimating AI -- such a black box.",
              date: "Oct 26, 2025",
            },
            {
              content: "UX research 🤔 Has the definition of a 'good research question' shifted? Yeah… 'users don't know what they want' — but maybe AI does? Oftentimes I feed AI gibberish, and it somehow understands my 'intend' like magic — or at least makes me feel understood. Maybe this black-box & black-box communication is good enough. Let AI handle that. Some things are okay to remain known-unknowns. Or maybe it's not always better to 'know' exactly what you want— sometimes just 'feeling' good is enough.",
              date: "Aug 26, 2025",
            },
            {
              content: "To my future self, and whoever happens to read this: One question has been in my head while working on a personalization project for AI design: we say we want to 'meet one's need,' and we also say 'meet your need before you know it yourself' ---- So... who defines what we need? Or do we ever truly know it ourselves? So through informal qualitative research (a.k.a. chats) with co-workers, I explored personalization by starting with 'what makes a person a person'. It seems that who we are is shaped by how we interact with others. If I ask, 'what type of person are you?' most people can answer — but often, we use phrases we've heard from others. People like to think we're in control, yet we're constantly, passively absorbing signals from the outside world, then reshaping ourselves to fit what we think we need or who we think we are. The interesting part is the gap between what we want and what actually happens. Maybe that's what uncontrollability is: interactions create uncontrollability, uncontrollability creates emotions, and those emotions are part of what makes us… us 👍. To Qiyu: I can't fully control whether my work will have a lasting impact, or where I'll work next, or where I'll live next. But I allow uncertainty --- so things can go 'out of control' in a controlled way. Life is like a game, and game is more fun when you play it seriously. May we all have fun with our games. 纵一苇之所如, All the best!!!!!!!!!",
              date: "Aug 26, 2025",
            },
            {
              content: "When we say 'AI,' how many of us think of a 'chatbot' first?",
              date: "Aug 26, 2025",
            },
            {
              content: "The newly launched ChatGPT agent makes me so curious about the future role of humans in HCI. GUIs were originally designed to help humans interact with computers. But humans seem to be interacting less with computers, as multi-agent collaboration increases —especially in tasks like browsing and searching in their demo. So… are we really training the models, or are the models training us—shaping how we work to simply check their outputs? GUI use case/human expectations/multitasking capacity... these may all be changing. 'The emergence of artificial intelligence may lead us to revalue intelligence itself.' — Yuwen Lu, again. And yet, it's still humans who are growing the AI ecosystem (and are learning MCP — thanks to my MLE friends haha)",
              date: "Aug 26, 2025",
            },
            {
              content: "Interesting. The concept of the 'weak robot' (from ICD-LAB in Japan). One example is a trash-picking bot that asks a human for help (in a well-designed way) when it spots trash, instead of picking it up itself. Some say it fulfills a basic human need: to protect and feel needed. In contrast, an agentic AI project I'm working on aims to have AI complete tasks independently, as much as possible. It's not just us—many emerging AI startups are pushing similar ideas (you see them all over SF, on buses, posters, and ad boards). Zooming out, doesn't the current industry feel like it's in the diverging stage of the double diamond? But I think we'll eventually reach a turning point and start to converge — Yes, AI can do (almost) ANYTHING, but do we really want it to do EVERYTHING? 'Everything can be research.' — Yuwen Lu, 2025, coffee chat @SF",
              date: "Aug 26, 2025",
            },
          ] as Array<{content: string; date: string; image?: string}>).concat(reflectionsWithImages).sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          }).map((reflection, idx) => {
            const isExpanded = expandedReflections.has(idx);
            const isLong = isLongContent(reflection.content);
            const displayContent = isExpanded ? reflection.content : reflection.content.substring(0, 250);

            return (
              <div
                key={idx}
                className={`rounded-lg border border-neutral-200 p-4 transition-all bg-white ${isLong && !isExpanded ? 'cursor-pointer hover:border-neutral-400' : ''}`}
                onClick={() => isLong && toggleReflection(idx)}
              >
                <div className="flex flex-col gap-3">
                  <div className="text-xs text-neutral-500 font-medium">{reflection.date}</div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {displayContent}
                    {isLong && !isExpanded && <span className="text-neutral-400">...</span>}
                  </p>
                  {reflection.image && (
                    <img
                      src={reflection.image}
                      alt="Reflection image"
                      className="w-full max-w-md rounded-lg mt-3 border border-neutral-200"
                    />
                  )}
                  {isLong && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReflection(idx);
                      }}
                      className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors self-start mt-1"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Me × Others × Think × Do modal */}
      {quadrantOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          onClick={() => setQuadrantOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuadrantOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors text-lg leading-none"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">Me · Others · Think · Do</h2>
            <p className="text-sm text-neutral-500 mb-2">A lens for mapping perspective and agency in any situation.</p>
            <p className="text-xs text-neutral-400 mb-8">This is also how I created the 4 tabs for this site: <span className="font-medium text-neutral-600">Work · Play · Think · Listen</span> — me doing, others doing, me reflecting, others reflecting.</p>

            <div className="grid grid-cols-2 gap-px bg-neutral-200 rounded-xl overflow-hidden">
              {/* Think / Me */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Me · Think</span>
                </div>
                <p className="text-sm text-neutral-700">My beliefs, assumptions, mental models, and internal narratives about the situation.</p>
              </div>
              {/* Think / Others */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Others · Think</span>
                </div>
                <p className="text-sm text-neutral-700">What others believe, perceive, or assume — often invisible until you look for it.</p>
              </div>
              {/* Do / Me */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Me · Do</span>
                </div>
                <p className="text-sm text-neutral-700">My actions, behaviors, and choices — what I actually control in the situation.</p>
              </div>
              {/* Do / Others */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Others · Do</span>
                </div>
                <p className="text-sm text-neutral-700">Others' observable behaviors — what they actually do versus what they say they think.</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-neutral-400">Use this to spot where your assumptions about others' thinking diverge from their actual behavior — that gap is often where design problems hide.</p>
          </div>
        </div>
      )}
    </div>
  );
}
