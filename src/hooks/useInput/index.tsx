'use client'

import { useState } from "react";

export default function useInput({ type }: { type: string }) {
    const [value, setValue] = useState("");
    const input = (...props: any[]) => <input value={value} onChange={e => setValue(e.target.value)} type={type} {...props} />;

    return [value, input];
}