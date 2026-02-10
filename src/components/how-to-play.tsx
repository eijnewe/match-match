// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "./ui/accordion";

const rules: string = `Try to sort all the words into categories!

First select a word and assign it to an empty category. When you find another word that fits, select it and then select the category: if it's the right category, you will get a point! If not, the word remains on the screen and you will score an "error" point.

You will get bonus points when you have completed a category, and it will move to the furthest right in the category bar.

If a word won't go into an empty category, that means you've already got its category in another card!

Select a category card for the full list of words assigned to it. There you can also customize the category's color and give it a temporary title to help you along.`;

export function HowToPlay() {
  return <div style={{ whiteSpace: "pre-line" }}>{rules}</div>;
}
