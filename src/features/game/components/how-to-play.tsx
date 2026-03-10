import { WordTag } from "@/components/WordTag";

export function HowToPlay() {
  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return <div style={{ whiteSpace: "pre-line" }} className="*:p-2 *:rounded-2xl *:border-2 *:mb-2 leading-relaxed *:[&>h4]:mb-2">
    <div>
      <h4>
        What's matchmatch?
      </h4>
      <p>
        Try to sort all the <WordTag type="words" bgColor="primary" /> into <WordTag type="categories" bgColor="chart-5" />!
      </p>
      <p>
        In the game you will be presented with a <WordTag type="grid" bgColor="secondary" /> of <WordTag type="words" bgColor="primary" /> under a banner of empty <WordTag type="category" bgColor="chart-5" /> cards. Your goal is to sort all the <WordTag type="words" bgColor="primary" /> into their right <WordTag type="category" bgColor="chart-5" />- but you don't know what the <WordTag type="categories" bgColor="chart-5" /> are!
      </p>
    </div>
    <div>
      <h4>
        How to matchmatch
      </h4>
      <p>
        {isTouchDevice() ? 'Tap': 'Click'} a <WordTag type="word" bgColor="primary" /> to select it, and then {isTouchDevice() ? 'tap': 'click'} the <WordTag type="category" bgColor="chart-5" /> card you believe it belongs to. If they are a match, the  <WordTag type="word" bgColor="primary" /> card will disappear and you will get a point! If not, the  <WordTag type="word" bgColor="primary" /> card remains on the <WordTag type="grid" bgColor="secondary" /> and you will get an error point.
      </p>
      <p>You can also select a <WordTag type="category" bgColor="chart-5" /> card and then {isTouchDevice() ? 'tap': 'click'} on various <WordTag type="word" bgColor="primary" /> cards you want to match- the <WordTag type="category" bgColor="chart-5" /> card will remain selected even if you make an error.</p>
      <p>
        If a <WordTag type="word" bgColor="primary" /> won't go into an empty <WordTag type="category" bgColor="chart-5" />, that means you've already started on its <WordTag type="category" bgColor="chart-5" /> in another card!
      </p>
    </div>
    <div>
      <h4>
        Tailoring matchmatch
      </h4>
      {isTouchDevice() ? (
        <p>
          See the{" "}<WordTag type="badge" bgColor="sidebar-primary" /> on your{" "}
          <WordTag type="category" bgColor="chart-5" /> cards for the number of words currently in that{" "}
          <WordTag type="category" bgColor="chart-5" />. Tap the {" "}<WordTag type="badge" bgColor="sidebar-primary" /> to see the list of{" "}
          <WordTag type="words" bgColor="primary" /> in the <WordTag type="category" bgColor="chart-5" />.
        </p>
      ) : (
        <p>
          Hover over a <WordTag type="category" bgColor="chart-5" /> card to see the full list of{" "}
          <WordTag type="words" bgColor="primary" /> assigned to it.
        </p>
      )}
      <p>
        {isTouchDevice() ? 'Tap': 'Click'} the pen at the top of the page to enter <b>Editing Mode</b>, where you can customize the <WordTag type="category" bgColor="chart-5" /> cards' color, as well as give them customized temporary titles to help you along.
      </p>
      <p>
        Open the sidebar and toggle <b>Grid Mode</b> to optimize the amount of cards you see on your screen! In the sidebar you can also turn on <b>Dark Mode</b>.
      </p>
    </div>
  </div>;
}
