import { ComponentExample } from "@/components/component-example";
import { Articles } from "./features/game/api/getArticles";

export function App() {
    return <>
        <Articles category={'Edible nuts and seeds'}/>
        <ComponentExample />;
    </>
}

export default App;