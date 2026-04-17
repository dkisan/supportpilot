"use client";

import Link from "next/link";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={props.className}
        >
            <path d="M12 .5C5.7.5.7 5.6.7 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2 .8 2 1.6 2.7 4.1 1.9 5.1 1.5.1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.3 12C23.3 5.6 18.3.5 12 .5z" />
        </svg>
    );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={props.className}
        >
            <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9.1V9h3.4v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v5.8zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                <p className="text-gray-400 text-sm">
                    Built by{" "}
                    <span className="text-white font-medium">Debasish Kisan</span>
                </p>

                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/dkisan"
                        target="_blank"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                    >
                        <GitHubIcon className="w-4 h-4" />
                        dkisan
                    </Link>

                    <Link
                        href="https://in.linkedin.com/in/debasishkisan"
                        target="_blank"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                    >
                        <LinkedInIcon className="w-4 h-4" />
                        debasishkisan
                    </Link>
                </div>

            </div>
        </footer>
    );
}