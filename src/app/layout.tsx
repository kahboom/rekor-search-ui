"use client";

import "@patternfly/patternfly/patternfly.css";

import Script from "next/script";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				{children}

				<Script
					strategy="beforeInteractive"
					id={"patternfly-workaround"}
				>
					{/* Temporary workaround for @patternfly/react-topology using global */}
					{`window.global ||= window;`}
				</Script>
			</body>
		</html>
	);
}
