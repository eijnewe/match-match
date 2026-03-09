import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function CustomTextArea() {
    const [customDifficulty, setCustomDifficulty] = useState<number>(4);
    return (
        <div className="w-full flex justify-center items-center *:mt-1 *:mb-1">
            <input
                type="number"
                placeholder="4"
                value={customDifficulty}
                className="border-input bg-input/20 dark:bg-input/30 w-13 mr-1 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 resize-none rounded-md border px-2 py-2 text-md transition-colors focus-visible:ring-2 aria-invalid:ring-2 md:text-xs/relaxed placeholder:text-muted-foreground flex field-sizing-content h-9 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                min={4}
                max={30}
                onChange={(e) => setCustomDifficulty(Number(e.target.value))}
                name="Custom Input"
            />
            <Button
                size="lg"
                className={'h-9 cursor-pointer grow'}
                nativeButton={false}
                render={
                    <Link to="/game/$difficulty"
                        params={{ difficulty: customDifficulty }}>
                        Start Custom Game
                    </Link>
                } />
        </div>

    )
}